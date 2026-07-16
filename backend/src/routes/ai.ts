import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import { parseDocx, parsePdf } from "../utils/parser.js";
import { parseItineraryDocument, generateLuxuryProposalHtml } from "../utils/gemini.js";

const router = Router();

/**
 * POST /api/ai/parse-package-document
 * Parses a travel package document (PDF or DOCX) or raw text and outputs structured JSON (Admin only).
 */
router.post("/parse-package-document", authenticateAdmin, async (req, res) => {
  let rawText = "";

  // 1. Check if a document is uploaded
  if (req.files && req.files.file) {
    const uploadedFile = req.files.file;
    const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

    try {
      if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        rawText = await parseDocx(file.data);
      } else if (file.mimetype === "application/pdf") {
        rawText = await parsePdf(file.data);
      } else {
        return res.status(400).json({ error: "Unsupported file type. Please upload a PDF (.pdf) or Word document (.docx)." });
      }
    } catch (parseError) {
      console.error("Document text extraction failure:", parseError);
      return res.status(500).json({ error: "Failed to extract text from document: " + (parseError as Error).message });
    }
  } 
  // 2.5 Check if base64 PDF is sent in request body
  else if (req.body.base64Pdf) {
    try {
      const buffer = Buffer.from(req.body.base64Pdf, "base64");
      rawText = await parsePdf(buffer);
    } catch (parseError) {
      console.error("Base64 PDF text extraction failure:", parseError);
      return res.status(500).json({ error: "Failed to extract text from base64 PDF: " + (parseError as Error).message });
    }
  }
  // 3. Otherwise check if raw text is sent in request body
  else if (req.body.text) {
    rawText = req.body.text;
  } 
  // 4. Fail if none of these is present
  else {
    return res.status(400).json({ error: "No document file was uploaded and no raw text was provided." });
  }

  if (!rawText.trim()) {
    return res.status(400).json({ error: "The provided document or text is empty." });
  }

  try {
    const structuredPackage = await parseItineraryDocument(rawText);
    return res.json(structuredPackage);
  } catch (aiError) {
    console.error("Gemini document parsing failure:", aiError);
    return res.status(500).json({ error: "Gemini AI failed to parse the document: " + (aiError as Error).message });
  }
});

/**
 * POST /api/ai/generate-luxury-proposal
 * Generates an exquisite luxury travel proposal in HTML format based on package details and traveler preferences (Admin only).
 */
router.post("/generate-luxury-proposal", authenticateAdmin, async (req, res) => {
  const { packageDetails, travellerName, specialRequests } = req.body;

  if (!packageDetails || !travellerName) {
    return res.status(400).json({ error: "Package details and traveller name are required to generate a proposal." });
  }

  try {
    const htmlProposal = await generateLuxuryProposalHtml(packageDetails, travellerName, specialRequests || "");
    return res.json({ html: htmlProposal });
  } catch (aiError) {
    console.error("Gemini luxury proposal generation failure:", aiError);
    return res.status(500).json({ error: "Gemini AI failed to generate luxury proposal: " + (aiError as Error).message });
  }
});

export default router;
