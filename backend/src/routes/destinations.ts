import { Router } from "express";
import prisma from "../utils/db.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/destinations
 * Returns a list of all travel destinations.
 */
router.get("/", async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany({
      orderBy: { name: "asc" },
      include: {
        packages: {
          include: {
            itineraries: {
              orderBy: { day: "asc" },
            },
          },
        },
      },
    });
    return res.json(destinations);
  } catch (error) {
    console.error("GET destinations error:", error);
    return res.status(500).json({ error: "Failed to fetch destinations." });
  }
});

/**
 * GET /api/destinations/:id
 * Returns a single destination with its nested packages.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await prisma.destination.findUnique({
      where: { id },
      include: {
        packages: {
          include: {
            itineraries: {
              orderBy: { day: "asc" },
            },
          },
        },
      },
    });

    if (!destination) {
      return res.status(404).json({ error: "Destination not found." });
    }

    return res.json(destination);
  } catch (error) {
    console.error(`GET destination ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to fetch destination details." });
  }
});

/**
 * POST /api/destinations
 * Creates a new travel destination (Admin only).
 */
router.post("/", authenticateAdmin, async (req, res) => {
  const {
    name,
    country,
    tag,
    image,
    blurb,
    duration,
    price,
    rating,
    overview,
    highlights,
    inclusions,
    exclusions,
    hotels,
    transportation,
    visaInfo,
    bestTime,
    faqs,
    images,
  } = req.body;

  if (!name || !country || !tag || !image) {
    return res.status(400).json({ error: "Name, country, tag, and cover image are required fields." });
  }

  try {
    const existing = await prisma.destination.findUnique({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: "A destination with this name already exists." });
    }

    const destination = await prisma.destination.create({
      data: {
        name,
        country,
        tag,
        image,
        blurb: blurb || "",
        duration: duration || "6N / 7D",
        price: price || "On Request",
        rating: rating ? parseFloat(rating) : 4.8,
        overview: overview || "",
        highlights: highlights || [],
        inclusions: inclusions || [],
        exclusions: exclusions || [],
        hotels: hotels || [],
        transportation: transportation || "",
        visaInfo: visaInfo || "",
        bestTime: bestTime || "",
        faqs: faqs || [],
        images: images || [],
      },
    });

    return res.status(201).json(destination);
  } catch (error) {
    console.error("POST destination error:", error);
    return res.status(500).json({ error: "Failed to create destination." });
  }
});

/**
 * PUT /api/destinations/:id
 * Updates an existing travel destination (Admin only).
 */
router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const destination = await prisma.destination.findUnique({ where: { id } });
    if (!destination) {
      return res.status(404).json({ error: "Destination not found." });
    }

    // Convert types if passed as strings
    if (data.rating !== undefined) {
      data.rating = parseFloat(data.rating);
    }

    const updated = await prisma.destination.update({
      where: { id },
      data: {
        name: data.name,
        country: data.country,
        tag: data.tag,
        image: data.image,
        blurb: data.blurb,
        duration: data.duration,
        price: data.price,
        rating: data.rating,
        overview: data.overview,
        highlights: data.highlights,
        inclusions: data.inclusions,
        exclusions: data.exclusions,
        hotels: data.hotels,
        transportation: data.transportation,
        visaInfo: data.visaInfo,
        bestTime: data.bestTime,
        faqs: data.faqs,
        images: data.images,
      },
    });

    return res.json(updated);
  } catch (error) {
    console.error(`PUT destination ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to update destination." });
  }
});

/**
 * DELETE /api/destinations/:id
 * Deletes a travel destination (Admin only).
 */
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await prisma.destination.findUnique({ where: { id } });
    if (!destination) {
      return res.status(404).json({ error: "Destination not found." });
    }

    await prisma.destination.delete({ where: { id } });
    return res.json({ message: "Destination deleted successfully." });
  } catch (error) {
    console.error(`DELETE destination ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to delete destination." });
  }
});

export default router;
