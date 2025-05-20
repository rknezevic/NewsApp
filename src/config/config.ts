import dotenv from 'dotenv';

dotenv.config();

const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const config = {
  mongoUri: getEnvVariable('MONGO_URI'),
  port: getEnvVariable('PORT'),
  jwtSecret: getEnvVariable('JWT_SECRET'),
  apiKey: getEnvVariable('API_KEY'),
  apiUrl: getEnvVariable('API_URL'),
};

