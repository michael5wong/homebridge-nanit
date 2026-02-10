#!/usr/bin/env node

import * as readline from 'readline';

const API_BASE = 'https://api.nanit.com';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    if (hidden) {
      // Hide input for passwords
      process.stdout.write(question);
      const stdin = process.stdin;
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      
      let password = '';
      const onData = (char: string) => {
        char = char.toString();
        
        if (char === '\n' || char === '\r' || char === '\u0004') {
          // Enter or Ctrl+D
          stdin.setRawMode(false);
          stdin.pause();
          stdin.removeListener('data', onData);
          process.stdout.write('\n');
          resolve(password);
        } else if (char === '\u0003') {
          // Ctrl+C
          process.exit(1);
        } else if (char === '\u007f' || char === '\b') {
          // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
        } else {
          // Regular character
          password += char;
          process.stdout.write('*');
        }
      };
      
      stdin.on('data', onData);
    } else {
      rl.question(question, (answer) => resolve(answer.trim()));
    }
  });
}

async function main() {
  console.log('\n🍼 Nanit Homebridge Auth Helper\n');
  console.log('This will log in to your Nanit account and generate a refresh token');
  console.log('for your Homebridge config.\n');

  const email = await ask('Nanit email: ');
  const password = await ask('Nanit password: ', true);

  console.log('\nLogging in...');

  const abortController1 = new AbortController();
  const timeoutId1 = setTimeout(() => abortController1.abort(), 15000);
  
  const loginResponse = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'nanit-api-version': '1',
    },
    body: JSON.stringify({ email, password }),
    signal: abortController1.signal,
  }).finally(() => clearTimeout(timeoutId1));

  if (loginResponse.ok) {
    // No MFA required
    const data = await loginResponse.json() as any;
    printResult(data.refresh_token);
    rl.close();
    return;
  }

  if (loginResponse.status === 482) {
    // MFA required
    const mfaData = await loginResponse.json() as any;
    const suffix = mfaData.phone_suffix || '??';
    console.log(`\n📱 MFA code sent to your phone ending in ${suffix}`);

    const mfaCode = await ask('Enter MFA code: ');

    console.log('Verifying...');

    const abortController2 = new AbortController();
    const timeoutId2 = setTimeout(() => abortController2.abort(), 15000);
    
    const mfaResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'nanit-api-version': '1',
      },
      body: JSON.stringify({
        email,
        password,
        mfa_token: mfaData.mfa_token,
        mfa_code: mfaCode,
      }),
      signal: abortController2.signal,
    }).finally(() => clearTimeout(timeoutId2));

    if (mfaResponse.ok) {
      const data = await mfaResponse.json() as any;
      printResult(data.refresh_token);
    } else {
      const error = await mfaResponse.text();
      console.error(`\n❌ MFA verification failed: ${error}`);
    }
  } else if (loginResponse.status === 429) {
    console.error('\n❌ Too many requests. Please wait a few minutes and try again.');
  } else {
    const error = await loginResponse.text();
    console.error(`\n❌ Login failed (${loginResponse.status}): ${error}`);
  }

  rl.close();
}

function printResult(refreshToken: string) {
  console.log('\n✅ Authentication successful!\n');
  console.log('Add this to your Homebridge Nanit config:\n');
  console.log(`    "refreshToken": "${refreshToken}"\n`);
  console.log('Your full platform config should look like:\n');
  console.log('    {');
  console.log('        "platform": "NanitCamera",');
  console.log('        "email": "your@email.com",');
  console.log('        "password": "your-password",');
  console.log(`        "refreshToken": "${refreshToken}"`);
  console.log('    }\n');
  console.log('The plugin will automatically refresh the token on each restart.');
}

main().catch((error) => {
  console.error('Error:', error.message);
  rl.close();
  process.exit(1);
});
