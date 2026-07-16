// Environment variables are loaded via --env-file=.env in the npm script (Node 20+ native)
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Route imports
import authRouter from "./routes/auth.js";
import destinationsRouter from "./routes/destinations.js";
import packagesRouter from "./routes/packages.js";
import contentRouter from "./routes/content.js";
import messagesRouter from "./routes/messages.js";
import uploadRouter from "./routes/upload.js";
import aiRouter from "./routes/ai.js";
import pdfRouter from "./routes/pdf.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend integration
app.use(cors({
  origin: "*", // Adjust to specific frontend domain in production
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Setup JSON parsing with increased body limits for larger base64 file payloads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Express-fileupload middleware to capture multipart files
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max file size
  useTempFiles: false, // Keep in buffer for Cloudinary streaming
}));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date() });
});

// Mount modular API routers
app.use("/api/auth", authRouter);
app.use("/api/destinations", destinationsRouter);
app.use("/api/packages", packagesRouter);
app.use("/api/content", contentRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/ai", aiRouter);
app.use("/api/pdf", pdfRouter);

// Serve frontend assets statically in production environments
const frontendDistPath = path.resolve(__dirname, "../../../dist");
const frontendOutputPath = path.resolve(__dirname, "../../../.output/public");

let staticPath = "";
if (fs.existsSync(frontendDistPath)) {
  staticPath = frontendDistPath;
} else if (fs.existsSync(frontendOutputPath)) {
  staticPath = frontendOutputPath;
}

if (staticPath && fs.existsSync(path.join(staticPath, "index.html"))) {
  console.log(`Serving static client files from: ${staticPath}`);
  app.use(express.static(staticPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  console.log("Static client files directory (with index.html) not found. Serving API status root.");
  app.get("/", (req, res) => {
    res.json({
      message: "SkyNow Premier Travel API is active and running.",
      health: "/api/health",
      status: "healthy"
    });
  });
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({ error: "An unexpected error occurred on the server." });
});

// Bind server port
app.listen(PORT, () => {
  console.log(`SkyNow Premier Travel backend running on http://localhost:${PORT}`);
});
