#!/usr/bin/env node

import * as readline from 'readline';
import { Writable } from 'stream';

const API_BASE = 'https://api.nanit.com';
const MAX_MFA_ATTEMPTS = 3;

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

async function postLogin(body: Record<string, unknown>): Promise<Response> {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), 15000);
  try {
    return await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'nanit-api-version': '1',
      },
      body: JSON.stringify(body),
      signal: abortController.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
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
  const loginResponse = await postLogin({ email, password });

  if (loginResponse.ok) {
    // No MFA required
    const data = await loginResponse.json() as any;
    return printResult(email, data.refresh_token);
  }

  if (loginResponse.status === 429) {
    console.error('\n❌ Too many requests. Please wait a few minutes and try again.');
    return 1;
  }

  if (loginResponse.status !== 482) {
    const error = await loginResponse.text();
    console.error(`\n❌ Login failed (${loginResponse.status}): ${error}`);
    return 1;
  }

  // MFA required — the SMS has been sent. Reuse the same mfa_token for retries
  // so a mistyped code doesn't trigger another SMS.
  const mfaData = await loginResponse.json() as any;
  const suffix = mfaData.phone_suffix || '??';
  console.log(`\n📱 MFA code sent to your phone ending in ${suffix}`);

  for (let attempt = 1; attempt <= MAX_MFA_ATTEMPTS; attempt++) {
    const mfaCode = (await ask('Enter MFA code: ')).replace(/\s+/g, '');
    if (!mfaCode) {
      console.log('No code entered.');
      continue;
    }

    console.log('Verifying...');
    const mfaResponse = await postLogin({
      email,
      password,
      mfa_token: mfaData.mfa_token,
      mfa_code: mfaCode,
    });

    if (mfaResponse.ok) {
      const data = await mfaResponse.json() as any;
      return printResult(email, data.refresh_token);
    }

    const error = await mfaResponse.text();
    console.error(`❌ MFA verification failed (${mfaResponse.status}): ${error}`);
    if (mfaResponse.status === 429) {
      console.error('Too many requests. Please wait a few minutes and try again.');
      return 1;
    }
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
