import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import { sendContactEmail } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      
      // Send email notification
      const emailSent = await sendContactEmail({
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        message: contact.message,
        phone: contact.phone || undefined
      });

      if (!emailSent) {
        console.warn("Email failed to send, but contact was saved to database");
      }
      
      res.json({ 
        success: true, 
        message: emailSent 
          ? "Message sent successfully! You'll receive a response soon."
          : "Message received! There was an issue with email delivery, but your message has been saved.",
        contact: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          subject: contact.subject
        },
        emailSent
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "Failed to send message. Please try again."
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json({ success: true, contacts });
    } catch (error) {
      console.error("Get contacts error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve contacts"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
