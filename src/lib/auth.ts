import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE_NAME = "admin_session";
const SESSION_VALUE = "admin";

function sign(value: string) {
  const secret = process.env.SESSION_SECRET ?? "dev-secret-change-me";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function createSession() {
  const signature = sign(SESSION_VALUE);
  const store = await cookies();
  store.set(COOKIE_NAME, `${SESSION_VALUE}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 días
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAuthenticated() {
  const store = await cookies();
  const raw = store.get(COOKIE_NAME)?.value;
  if (!raw) return false;

  const [value, signature] = raw.split(".");
  if (!value || !signature) return false;

  return value === SESSION_VALUE && sign(value) === signature;
}

export function checkCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) return false;

  return username === expectedUsername && password === expectedPassword;
}
