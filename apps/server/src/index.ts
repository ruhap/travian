import express from "express";

import { Game } from "@travian/game-engine/game";

const port = 3001;

const app = express();

const game = new Game();

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/game", (req, res) => {
  res.send(game.example());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
