// lib/session.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

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

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7d
  const session = await encrypt({ userId }, "7d")
  const _cookies = await cookies()

  _cookies.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: true,//process.env.NODE_ENV === "production"
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  const _cookies = await cookies()
  _cookies.delete(COOKIE_NAME)
}

export async function isSessionValid(
  cookieValue: string | undefined | null,
): Promise<boolean> {
  if (!cookieValue) {
    return false
  }

  const session = await decrypt(cookieValue)

  return Boolean(session)
}
