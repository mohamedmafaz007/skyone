import { Router } from "express";
import prisma from "../utils/db.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

/**
 * GET /api/packages
 * Returns a list of all packages, including their nested itineraries.
 */
router.get("/", async (req, res) => {
  try {
    const packages = await prisma.package.findMany({
      include: {
        itineraries: {
          orderBy: { day: "asc" },
        },
        destination: true,
      },
    });
    return res.json(packages);
  } catch (error) {
    console.error("GET packages error:", error);
    return res.status(500).json({ error: "Failed to fetch packages." });
  }
});

/**
 * GET /api/packages/:id
 * Returns a single package by ID with itineraries.
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pkg = await prisma.package.findUnique({
      where: { id },
      include: {
        itineraries: {
          orderBy: { day: "asc" },
        },
        destination: true,
      },
    });

    if (!pkg) {
      return res.status(404).json({ error: "Package not found." });
    }

    return res.json(pkg);
  } catch (error) {
    console.error(`GET package ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to fetch package details." });
  }
});

/**
 * POST /api/packages
 * Creates a new package and its daily itineraries (Admin only).
 */
router.post("/", authenticateAdmin, async (req, res) => {
  const {
    name,
    price,
    duration,
    overview,
    highlights,
    inclusions,
    exclusions,
    transportation,
    visaInfo,
    bestTime,
    hotels,
    destinationId,
    itinerary, // Array of { day, title, desc }
  } = req.body;

  if (!name || !price || !duration) {
    return res.status(400).json({ error: "Name, price, and duration are required fields." });
  }

  try {
    const createdPkg = await prisma.$transaction(async (tx) => {
      // 1. Create Package
      const pkg = await tx.package.create({
        data: {
          name,
          price,
          duration,
          overview: overview || "",
          highlights: highlights || [],
          inclusions: inclusions || [],
          exclusions: exclusions || [],
          transportation: transportation || "",
          visaInfo: visaInfo || "",
          bestTime: bestTime || "",
          hotels: hotels || [],
          destinationId: destinationId || null,
        },
      });

      // 2. Create DayItineraries if provided
      if (itinerary && Array.isArray(itinerary)) {
        for (const item of itinerary) {
          await tx.dayItinerary.create({
            data: {
              day: item.day,
              title: item.title,
              desc: item.desc,
              packageId: pkg.id,
            },
          });
        }
      }

      return tx.package.findUnique({
        where: { id: pkg.id },
        include: { itineraries: { orderBy: { day: "asc" } } },
      });
    });

    return res.status(201).json(createdPkg);
  } catch (error) {
    console.error("POST package error:", error);
    return res.status(500).json({ error: "Failed to create package." });
  }
});

/**
 * PUT /api/packages/:id
 * Updates an existing package and synchronizes its itineraries (Admin only).
 */
router.put("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const {
    name,
    price,
    duration,
    overview,
    highlights,
    inclusions,
    exclusions,
    transportation,
    visaInfo,
    bestTime,
    hotels,
    destinationId,
    itinerary, // Full new array of itineraries
  } = req.body;

  try {
    const pkg = await prisma.package.findUnique({ where: { id } });
    if (!pkg) {
      return res.status(404).json({ error: "Package not found." });
    }

    const updatedPkg = await prisma.$transaction(async (tx) => {
      // 1. Update Package details
      const updated = await tx.package.update({
        where: { id },
        data: {
          name: name !== undefined ? name : pkg.name,
          price: price !== undefined ? price : pkg.price,
          duration: duration !== undefined ? duration : pkg.duration,
          overview: overview !== undefined ? overview : pkg.overview,
          highlights: highlights !== undefined ? highlights : pkg.highlights,
          inclusions: inclusions !== undefined ? inclusions : pkg.inclusions,
          exclusions: exclusions !== undefined ? exclusions : pkg.exclusions,
          transportation: transportation !== undefined ? transportation : pkg.transportation,
          visaInfo: visaInfo !== undefined ? visaInfo : pkg.visaInfo,
          bestTime: bestTime !== undefined ? bestTime : pkg.bestTime,
          hotels: hotels !== undefined ? hotels : pkg.hotels,
          destinationId: destinationId !== undefined ? destinationId : pkg.destinationId,
        },
      });

      // 2. Synchronize DayItineraries if itinerary is passed
      if (itinerary && Array.isArray(itinerary)) {
        // Delete all old day itineraries
        await tx.dayItinerary.deleteMany({ where: { packageId: id } });
        
        // Re-create from scratch to ensure sync & correct sorting
        for (const item of itinerary) {
          await tx.dayItinerary.create({
            data: {
              day: item.day,
              title: item.title,
              desc: item.desc,
              packageId: id,
            },
          });
        }
      }

      return tx.package.findUnique({
        where: { id },
        include: { itineraries: { orderBy: { day: "asc" } } },
      });
    });

    return res.json(updatedPkg);
  } catch (error) {
    console.error(`PUT package ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to update package." });
  }
});

/**
 * DELETE /api/packages/:id
 * Deletes a package (Admin only).
 */
router.delete("/:id", authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const pkg = await prisma.package.findUnique({ where: { id } });
    if (!pkg) {
      return res.status(404).json({ error: "Package not found." });
    }

    await prisma.package.delete({ where: { id } });
    return res.json({ message: "Package deleted successfully." });
  } catch (error) {
    console.error(`DELETE package ID ${id} error:`, error);
    return res.status(500).json({ error: "Failed to delete package." });
  }
});

export default router;
