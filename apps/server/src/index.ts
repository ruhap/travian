// filepath: c:\Users\root\projektit\travian\apps\server\src\index.ts
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "@travian/game-engine";

import "dotenv/config";
import { db } from "./db";

const port = 3001;

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const game = new Game();

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/game", (req, res) => {
  res.json({ message: game.example() });
});

app.get("/villages", async (req, res) => {
  const userId = "2";
  const villages = await db.query.villages.findMany({
    where: (village, { eq }) => eq(village.ownerId, userId),
  });

  res.json({ villages });
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (data) => {
    console.log("Message received:", data);
    socket.emit("response", { message: "Message received!" });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
