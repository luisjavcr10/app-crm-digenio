// lib/session.ts
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;

if (!secretKey && process.env.NODE_ENV !== "development") {
  throw new Error("[session]: please set a valid SESSION_SECRET");
}

const encodedKey = new TextEncoder().encode(secretKey);

export const COOKIE_NAME = "__session__";

type SessionPayload = {
  userId: string;
};

export async function encrypt(
  payload: SessionPayload,
  expirationTime: number | string | Date = "7d"
) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expirationTime)
    .sign(encodedKey);
}

export async function decrypt(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (e) {
    console.error("JWT verification failed", e);
    return null;
  }
}
