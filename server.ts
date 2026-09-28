import express from "express";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import path from "path";
import { GoogleGenAI, GenerateVideosOperation } from "@google/genai";

dotenv.config();

const app = express();
const port = 3000;
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    model: "veo-3.1-fast-generate-preview",
  });
});

// 1. Start video generation: POST /api/generate-video
app.post("/api/generate-video", async (req, res) => {
  try {
    const { prompt, aspectRatio = "16:9", resolution = "720p" } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({
        error: "GEMINI_API_KEY is not configured on the server.",
      });
    }

    const defaultPrompt =
      "Cinematic futuristic motion graphics tour of Mohammadreza Salehi backend developer portfolio, showcasing glowing distributed Python FastAPI nodes, RabbitMQ message queues, PostgreSQL databases, high-speed cybernetic data stream, elegant emerald green and cyan neon lighting on dark sleek background, ultra high definition 3D animation.";

    const selectedPrompt = prompt && typeof prompt === "string" && prompt.trim() ? prompt.trim() : defaultPrompt;
    const selectedAspectRatio = aspectRatio === "9:16" ? "9:16" : "16:9";
    const selectedResolution = resolution === "1080p" ? "1080p" : "720p";

    console.log(`[Veo Video] Initiating generation: model=veo-3.1-fast-generate-preview, ratio=${selectedAspectRatio}`);

    const operation = await ai.models.generateVideos({
      model: "veo-3.1-fast-generate-preview",
      prompt: selectedPrompt,
      config: {
        numberOfVideos: 1,
        resolution: selectedResolution,
        aspectRatio: selectedAspectRatio,
      },
    });

    console.log(`[Veo Video] Operation created: ${operation.name}`);
    res.json({ operationName: operation.name });
  } catch (error: any) {
    console.error("[Veo Video] Error starting generation:", error);
    const message = error.message || "Failed to start video generation";
    const status = error.status || 500;
    res.status(status).json({
      error: message,
      details: error.toString(),
    });
  }
});

// 2. Poll video status: POST /api/video-status
app.post("/api/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required" });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    res.json({
      done: !!updated.done,
      error: updated.error || null,
    });
  } catch (error: any) {
    console.error("[Veo Video] Error checking status:", error);
    res.status(500).json({
      error: error.message || "Failed to check video status",
    });
  }
});

// 3. Download/Stream video: POST /api/video-download
app.post("/api/video-download", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "operationName is required" });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;
    if (!uri) {
      return res.status(404).json({
        error: "Video URI not found or generation not finished yet.",
      });
    }

    console.log(`[Veo Video] Downloading video from Google Storage for operation: ${operationName}`);
    const videoRes = await fetch(uri, {
      headers: {
        "x-goog-api-key": process.env.GEMINI_API_KEY || "",
      },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({
        error: `Failed to download video stream: ${videoRes.statusText}`,
      });
    }

    const arrayBuffer = await videoRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", buffer.length);
    res.setHeader("Content-Disposition", 'inline; filename="portfolio-motion-tour.mp4"');
    res.send(buffer);
  } catch (error: any) {
    console.error("[Veo Video] Error downloading video:", error);
    res.status(500).json({
      error: error.message || "Failed to download video",
    });
  }
});

// Vite Middleware for dev / Static file serving for production
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${port} (${isProd ? "production" : "development"})`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
