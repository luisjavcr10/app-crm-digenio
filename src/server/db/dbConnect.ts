import mongoose from 'mongoose';
import { MONGODB_URI } from '@/lib/config';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Objeto de caché local al módulo
const cached = {
  conn: null as typeof mongoose | null,
  promise: null as Promise<typeof mongoose> | null
};

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;