import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  adminId?: string;
}

/**
 * Middleware to verify JSON Web Tokens (JWT) for admin routes
 */
export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized access. No session token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET || "default_jwt_secret_key_change_me";
    const decoded = jwt.verify(token, secret) as { id: string };
    
    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error);
    return res.status(401).json({ error: "Session expired or invalid token. Please log in again." });
  }
};
