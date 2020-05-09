import * as bcrypt from 'bcryptjs';

export async function generateHashPassword(password) {
  return await bcrypt.hash(password, 8);
}