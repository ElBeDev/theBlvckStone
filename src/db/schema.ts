import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  industry: text("industry"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  locale: text("locale").notNull().default("es"),
  category: text("category").notNull().default("energia-limpia"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  specs: text("specs"),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  locale: text("locale").notNull().default("es"),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  company: text("company"),
  role: text("role"),
  quote: text("quote").notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
