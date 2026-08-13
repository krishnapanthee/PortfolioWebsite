import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "krishna_portfolio_jwt_secret_key_2026_secure";
export const TOKEN_COOKIE_NAME = "kp_admin_token";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getAdminFromRequest(request) {
  let token = null;

  // 1. Try from Cookie
  const cookieHeader = request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((c) => {
        const [key, ...v] = c.split("=");
        return [key, v.join("=")];
      })
    );
    token = cookies[TOKEN_COOKIE_NAME];
  }

  // 2. Fallback to Authorization Header
  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) return null;

  return verifyToken(token);
}
