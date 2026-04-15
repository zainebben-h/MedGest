import bcrypt from 'bcrypt';

const password = '123456';
const saltRounds = 10;
const hash = await bcrypt.hash(password, saltRounds);

console.log('Correct bcrypt hash for "123456":');
console.log(hash);
console.log('\nCopy this hash into your SQL INSERT statement:');