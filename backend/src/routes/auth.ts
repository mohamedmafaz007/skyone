import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../utils/db.js";

const router = Router();

/**
 * POST /api/auth/login
 * Validates admin credentials and issues a JWT token.
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isMatch = bcrypt.compareSync(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const secret = process.env.JWT_SECRET || "default_jwt_secret_key_change_me";
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      secret,
      { expiresIn: "7d" } // Admin session valid for 7 days
    );

    return res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Auth login endpoint error:", error);
    return res.status(500).json({ error: "An error occurred during authentication." });
  }
});

export default router;
