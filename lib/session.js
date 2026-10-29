import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is missing from .env.local");
  }

  return secret;
}

function signPayload(payload) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

function createToken(user) {
  const payload = Buffer.from(
    JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
    }),
  ).toString("base64url");

  const signature = signPayload(payload);

  return `${payload}.${signature}`;
}

function verifyToken(token) {
  if (!token) {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [payload, signature] = parts;

  const expectedSignature = signPayload(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    actualBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(actualBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const user = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));

    if (
      !user.id ||
      !user.role ||
      typeof user.exp !== "number" ||
      user.exp <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  } catch {
    return null;
  }
}

export async function createSession(user) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, createToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  return verifyToken(token);
}

export async function clearSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}
