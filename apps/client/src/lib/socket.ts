import { io, Socket } from "socket.io-client";

export const socket: Socket = io("http://localhost:3001");

socket.on("connect", () => {
  console.log("WebSocket connected");
});
