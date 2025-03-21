import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

// Servers Table
export const servers = pgTable("servers", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()), // Use UUID with a default random value
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Users Table
export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(),
  serverId: text("server_id").references(() => servers.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Villages Table
export const villages = pgTable("villages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  serverId: text("server_id").references(() => servers.id),
  ownerId: text("owner_id").references(() => users.id),
  name: text("name").notNull(),
  x: integer("x").notNull(),
  y: integer("y").notNull(),
  population: integer("population").default(2),
  createdAt: timestamp("created_at").defaultNow(),
});

// Resources Table
export const resources = pgTable("resources", {
  villageId: text("village_id")
    .primaryKey()
    .references(() => villages.id),
  wood: integer("wood").default(400),
  clay: integer("clay").default(400),
  iron: integer("iron").default(400),
  wheat: integer("wheat").default(800),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Troops Table
export const troops = pgTable("troops", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  villageId: text("village_id").references(() => villages.id),
  type: text("type").notNull(), // "spearman", "axeman", "cavalry"
  count: integer("count").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Movements Table
export const movements = pgTable("movements", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  serverId: text("server_id").references(() => servers.id),
  fromVillage: text("from_village").references(() => villages.id),
  toVillage: text("to_village").references(() => villages.id),
  arrivalTime: timestamp("arrival_time").notNull(),
  troops: jsonb("troops").notNull(), // JSON-encoded troops { "spearman": 10, "cavalry": 5 }
  status: text("status").default("moving"), // "moving", "arrived", "battle"
});
