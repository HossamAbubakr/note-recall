import bcrypt from "bcrypt";

export async function hash(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
