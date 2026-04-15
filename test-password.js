// File: test-password.js
import bcrypt from 'bcrypt';

const password = '123456'; // Plain text password
const hash = '$2b$10$BDunkWDsxetL1f8i06gW/eL/K4jWgpP1Ig0A95tWtfN0Q2Myo85yW'; // Copy from generate-hash.js

const result = await bcrypt.compare(password, hash);

console.log('Password verification:', result); // Should output: true