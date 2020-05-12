import * as bcrypt from 'bcryptjs';

export async function generateHashPassword(password) {
  return await bcrypt.hash(password, 8);
}

export async function comparePasswords(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}