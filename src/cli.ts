#!/usr/bin/env node

import * as readline from 'readline';
import { Writable } from 'stream';
import { login } from './nanitApi';

const MAX_MFA_ATTEMPTS = 3;
const RATE_LIMITED = 'Too many requests. Please wait a few minutes and try again.';

// A single readline interface owns stdin for the whole session. Hidden input
// (password) is done by muting what readline echoes, rather than attaching a
// second raw-mode listener to stdin — mixing the two left stdin paused, which
// made the process exit before the MFA code could be entered.
let muted = false;
const output = new Writable({
  write(chunk, encoding, callback) {
    if (!muted) {
      process.stdout.write(chunk, encoding);
    }
    callback();
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output,
  terminal: !!process.stdin.isTTY,
});

rl.on('SIGINT', () => {
  process.stdout.write('\n');
  process.exit(130);
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

function askHidden(question: string): Promise<string> {
  return new Promise((resolve) => {
    process.stdout.write(question);
    muted = true;
    rl.question('', (answer) => {
      muted = false;
      process.stdout.write('\n');
      resolve(answer);
    });
  });
}

async function main(): Promise<number> {
  console.log('\n🍼 Nanit Homebridge Auth Helper\n');
  console.log('This will log in to your Nanit account and generate a refresh token');
  console.log('for your Homebridge config.\n');

  const email = await ask('Nanit email: ');
  const password = await askHidden('Nanit password: ');

  if (!email || !password) {
    console.error('\n❌ Email and password are required.');
    return 1;
  }

  console.log('\nLogging in...');
  const result = await login({ email, password });
  switch (result.kind) {
    case 'ok':
      return printResult(email, result.refreshToken);
    case 'rate_limited':
      console.error(`\n❌ ${RATE_LIMITED}`);
      return 1;
    case 'failed':
      console.error(`\n❌ Login failed: ${result.error.message}`);
      return 1;
  }

  // MFA required: the SMS has been sent. Reuse the same mfa_token for retries
  // so a mistyped code doesn't trigger another SMS.
  console.log(`\n📱 MFA code sent to your phone ending in ${result.phoneSuffix ?? '??'}`);

  for (let attempt = 1; attempt <= MAX_MFA_ATTEMPTS; attempt++) {
    const mfaCode = (await ask('Enter MFA code: ')).replace(/\s+/g, '');
    if (!mfaCode) {
      console.log('No code entered.');
      continue;
    }

    console.log('Verifying...');
    const verification = await login({ email, password, mfa_token: result.mfaToken, mfa_code: mfaCode });
    if (verification.kind === 'ok') {
      return printResult(email, verification.refreshToken);
    }
    if (verification.kind === 'rate_limited') {
      console.error(`❌ ${RATE_LIMITED}`);
      return 1;
    }

    console.error(`❌ MFA verification failed${verification.kind === 'failed' ? `: ${verification.error.message}` : ''}`);
    if (attempt < MAX_MFA_ATTEMPTS) {
      console.log(`Try again (${MAX_MFA_ATTEMPTS - attempt} attempt(s) left).`);
    }
  }

  console.error('\n❌ MFA verification failed. Run nanit-auth again to request a new code.');
  return 1;
}

function printResult(email: string, refreshToken: string | undefined): number {
  if (!refreshToken) {
    console.error('\n❌ Login succeeded but no refresh token was returned.');
    return 1;
  }

  console.log('\n✅ Authentication successful!\n');
  console.log('Add this to your Homebridge Nanit config:\n');
  console.log(`    "refreshToken": "${refreshToken}"\n`);
  console.log('Your full platform config should look like:\n');
  console.log('    {');
  console.log('        "platform": "NanitCamera",');
  console.log(`        "email": "${email}",`);
  console.log(`        "refreshToken": "${refreshToken}"`);
  console.log('    }\n');
  console.log('The plugin stores rotated tokens itself, so you only need to do this once');
  console.log('(or again if the token is ever revoked).');
  return 0;
}

main()
  .then((code) => {
    rl.close();
    process.exit(code);
  })
  .catch((error) => {
    console.error('Error:', error instanceof Error ? error.message : error);
    rl.close();
    process.exit(1);
  });
