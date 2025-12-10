import express from "express";
import path from "path";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

// Serve static files from client/public
const publicDir = path.join(process.cwd(), "client", "public");
app.use(express.static(publicDir));

// Catch-all route to serve index.html for any route
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

const port = parseInt(process.env.PORT || "5000", 10);
httpServer.listen(
  {
    port,
    host: "0.0.0.0",
    reusePort: true,
  },
  () => {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    console.log(`${formattedTime} [express] serving static site on port ${port}`);
  },
);
