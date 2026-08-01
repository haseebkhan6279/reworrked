/**
 * One-off: reset admin password from .env (handles $ in passwords).
 * Run: node scripts/reset-admin.js
 */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

function loadEnv() {
  const raw = fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8');
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.startsWith('#')) continue;
    const i = line.indexOf('=');
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function main() {
  const env = loadEnv();
  const email = String(env.ADMIN_EMAIL || '').toLowerCase();
  const password = String(env.ADMIN_PASSWORD || '');
  if (!email || !password) throw new Error('ADMIN_EMAIL/PASSWORD missing');

  await mongoose.connect(env.MONGODB_URI, { family: 4 });
  const passwordHash = await bcrypt.hash(password, 10);
  await mongoose.connection.collection('users').updateOne(
    { email },
    { $set: { email, passwordHash, role: 'admin' } },
    { upsert: true },
  );
  console.log('Admin password reset for', email);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
