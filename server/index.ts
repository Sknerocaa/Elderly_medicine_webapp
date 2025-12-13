import express from "express";
import path from "path";
import { createServer } from "http";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const httpServer = createServer(app);

// Determine public directory
let publicDir: string;

if (process.env.NODE_ENV === "production") {
  // In production, serve from dist/public
  publicDir = path.resolve(__dirname, "public");
  if (!fs.existsSync(publicDir)) {
    console.warn(`Warning: ${publicDir} does not exist`);
    publicDir = path.resolve(__dirname, "..", "dist", "public");
  }
} else {
  // In development, serve from client/public
  publicDir = path.resolve(__dirname, "..", "client", "public");
}

console.log(`Serving static files from: ${publicDir}`);

if (!fs.existsSync(publicDir)) {
  console.error(`ERROR: Static files directory does not exist: ${publicDir}`);
  process.exit(1);
}

app.use(express.static(publicDir, { maxAge: "1h" }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Catch-all route to serve index.html for any route (SPA fallback)
app.use((req, res) => {
  const indexPath = path.join(publicDir, "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

const port = parseInt(process.env.PORT || "3000", 10);
httpServer.listen(
  {
    port,
    host: "0.0.0.0",
  },
  () => {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    console.log(`${formattedTime} [express] listening on port ${port}`);
  },
);

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully");
  httpServer.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});
