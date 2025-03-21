import express from "express";

import { Game } from "@travian/game-engine/game";

const port = 3001;

const app = express();

const game = new Game();

console.log(game.example());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
