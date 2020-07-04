import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 8000;
export const HOST = process.env.HOST || '0.0.0.0';
export const POSTGRES_URL = process.env.POSTGRES_URL || 'postgresql://postgres:postgres@localhost:5432/ynotes';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
