import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { JWT_SECRET } from '@/server/lib/config';

export async function createContext({ req }: { req: NextRequest }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      user = await User.findById(decoded.id);
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  return { req, user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;