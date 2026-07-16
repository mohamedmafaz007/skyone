import { Router } from "express";
import { authenticateAdmin } from "../middleware/auth.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const router = Router();

/**
 * POST /api/upload
 * Accepts a file upload via multi-part form data and uploads it to Cloudinary (Admin only).
 * Expects a form field named "file".
 */
router.post("/", authenticateAdmin, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }

  const uploadedFile = req.files.file;
  if (!uploadedFile) {
    return res.status(400).json({ error: 'Please upload file under the "file" form field.' });
  }

  // In case multiple files were uploaded, select the first one
  const targetFile = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

  try {
    const folder = targetFile.mimetype.startsWith("image/") ? "skynow/images" : "skynow/documents";
    const secureUrl = await uploadToCloudinary(targetFile.data, folder);
    
    return res.json({
      url: secureUrl,
      mimetype: targetFile.mimetype,
      name: targetFile.name,
      size: targetFile.size,
    });
  } catch (error) {
    console.error("Upload route handler error:", error);
    return res.status(500).json({ error: "Failed to upload file to Cloudinary." });
  }
});

export default router;
