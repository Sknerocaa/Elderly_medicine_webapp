import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema, insertMedicineOrderSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create appointment
  app.post("/api/appointments", async (req, res) => {
    try {
      const validatedData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(validatedData);
      res.json(appointment);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: fromError(error).toString() });
      } else {
        res.status(500).json({ error: "Failed to create appointment" });
      }
    }
  });

  // Get all appointments
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await storage.getAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch appointments" });
    }
  });

  // Create medicine order
  app.post("/api/medicine-orders", async (req, res) => {
    try {
      const validatedData = insertMedicineOrderSchema.parse(req.body);
      const order = await storage.createMedicineOrder(validatedData);
      res.json(order);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: fromError(error).toString() });
      } else {
        res.status(500).json({ error: "Failed to create order" });
      }
    }
  });

  // Get all medicine orders
  app.get("/api/medicine-orders", async (req, res) => {
    try {
      const orders = await storage.getMedicineOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  return httpServer;
}
