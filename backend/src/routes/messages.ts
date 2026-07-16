import { Router } from "express";
import prisma from "../utils/db.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/messages
 * Submits a new contact/enquiry form message (Public).
 */
router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required fields." });
  }

  try {
    const newMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("POST message submission error:", error);
    return res.status(500).json({ error: "Failed to submit message. Please try again." });
  }
});

/**
 * GET /api/messages
 * Returns all submitted contact messages (Admin only).
 */
router.get("/", authenticateAdmin, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { timestamp: "desc" },
    });
    return res.json(messages);
  } catch (error) {
    console.error("GET messages error:", error);
    return res.status(500).json({ error: "Failed to retrieve messages." });
  }
});

/**
 * PATCH /api/messages/:id/read
 * Marks a message as read or unread (Admin only).
 */
router.patch("/:id/read", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const { read } = req.body; // Expect boolean

  try {
    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: {
        read: read !== undefined ? !!read : true,
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(`PATCH message ID ${id} read error:`, error);
    return res.status(500).json({ error: "Failed to update message status." });
  }
});

/**
 * DELETE /api/messages/:id
 * Deletes a contact message (Admin only).
 */
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      return res.status(404).json({ error: "Message not found." });
    }

    await prisma.contactMessage.delete({ where: { id } });
    return res.json({ message: "Message deleted successfully." });
  } catch (error) {
    console.error(`DELETE message ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to delete message." });
  }
});

export default router;
