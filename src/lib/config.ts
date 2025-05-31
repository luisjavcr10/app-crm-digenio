export const JWT_SECRET = process.env.JWT_SECRET || 'secret-key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
export const MONGODB_URI = process.env.MONGODB_URI as string;