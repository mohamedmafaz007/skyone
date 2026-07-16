import { Router } from "express";
import prisma from "../utils/db.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/content
 * Returns all dynamic page layouts as a combined key-value store.
 */
router.get("/", async (req, res) => {
  try {
    const records = await prisma.pageContent.findMany();
    const store: Record<string, any> = {};
    records.forEach((rec) => {
      store[rec.key] = rec.content;
    });
    return res.json(store);
  } catch (error) {
    console.error("GET all page content error:", error);
    return res.status(500).json({ error: "Failed to load page layouts." });
  }
});

/**
 * GET /api/content/:key
 * Returns a specific page content layout (e.g., 'home', 'about').
 */
router.get("/:key", async (req, res) => {
  const { key } = req.params;
  try {
    const record = await prisma.pageContent.findUnique({
      where: { key },
    });

    if (!record) {
      return res.status(404).json({ error: `Page content for key '${key}' not found.` });
    }

    return res.json(record.content);
  } catch (error) {
    console.error(`GET page content key ${key} error:`, error);
    return res.status(500).json({ error: "Failed to fetch page layout." });
  }
});

/**
 * POST /api/content/:key
 * Creates or updates page content layout JSON (Admin only).
 */
router.post("/:key", authenticateAdmin, async (req, res) => {
  const { key } = req.params;
  const content = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content payload cannot be empty." });
  }

  try {
    const upserted = await prisma.pageContent.upsert({
      where: { key },
      update: { content },
      create: { key, content },
    });

    return res.json(upserted.content);
  } catch (error) {
    console.error(`POST page content key ${key} error:`, error);
    return res.status(500).json({ error: "Failed to save page layout." });
  }
});

export default router;
