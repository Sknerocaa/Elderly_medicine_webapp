import { 
  type User, 
  type InsertUser,
  type Appointment,
  type InsertAppointment,
  type MedicineOrder,
  type InsertMedicineOrder,
  users,
  appointments,
  medicineOrders
} from "@shared/schema";
import { db } from "../db/index";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointments(): Promise<Appointment[]>;
  
  createMedicineOrder(order: InsertMedicineOrder): Promise<MedicineOrder>;
  getMedicineOrders(): Promise<MedicineOrder[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [created] = await db.insert(appointments).values(appointment).returning();
    return created;
  }

  async getAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments).orderBy(appointments.createdAt);
  }

  async createMedicineOrder(order: InsertMedicineOrder): Promise<MedicineOrder> {
    const [created] = await db.insert(medicineOrders).values(order).returning();
    return created;
  }

  async getMedicineOrders(): Promise<MedicineOrder[]> {
    return await db.select().from(medicineOrders).orderBy(medicineOrders.createdAt);
  }
}

export const storage = new DatabaseStorage();
