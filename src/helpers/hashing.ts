import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const createHash = async (value: any): Promise<string> => {
  return bcrypt.hash(value, saltOrRounds);
};

export const compareHash = async (
  value: any,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(value, hash);
};
