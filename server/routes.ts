import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to log contact downloads for analytics (if needed)
  app.post('/api/contact/download', (req, res) => {
    const { deviceType } = req.body;
    console.log(`Contact downloaded on ${deviceType} device`);
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
