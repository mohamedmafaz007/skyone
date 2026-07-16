import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import { generatePdfFromHtml, generateStandardItineraryPdf } from "../utils/pdfGenerator.js";

const router = Router();

/**
 * POST /api/pdf/generate-proposal-pdf
 * Takes an HTML string and compiles it into a high-end PDF using Puppeteer (Admin only).
 */
router.post("/generate-proposal-pdf", authenticateAdmin, async (req, res) => {
  const { html, filename } = req.body;

  if (!html) {
    return res.status(400).json({ error: "HTML content is required to build a proposal PDF." });
  }

  try {
    const pdfBuffer = await generatePdfFromHtml(html);
    
    const safeFilename = (filename || "luxury-travel-proposal").replace(/[^a-z0-9_-]/gi, "_") + ".pdf";
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);
    return res.send(pdfBuffer);
  } catch (error) {
    console.error("Proposal PDF compilation route error:", error);
    return res.status(500).json({ error: "Failed to generate luxury PDF: " + (error as Error).message });
  }
});

/**
 * POST /api/pdf/generate-itinerary-pdf
 * Takes a package's structured data and returns a standard generated PDF from PDFKit (Public).
 */
router.post("/generate-itinerary-pdf", async (req, res) => {
  const packageDetails = req.body;

  if (!packageDetails || !packageDetails.name) {
    return res.status(400).json({ error: "Package details are required to generate an itinerary PDF." });
  }

  try {
    const pdfBuffer = await generateStandardItineraryPdf(packageDetails);
    
    const safeFilename = (packageDetails.name || "travel-itinerary").replace(/[^a-z0-9_-]/gi, "_") + ".pdf";
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);
    return res.send(pdfBuffer);
  } catch (error) {
    console.error("Standard itinerary PDF compile route error:", error);
    return res.status(500).json({ error: "Failed to generate standard PDF: " + (error as Error).message });
  }
});

export default router;
