import { Server } from "socket.io";
import { io } from "socket.io-client";
import { http } from "http";

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir des fichiers statiques (client HTML/CSS/JS)
app.use(express.static("public"));

// Écoute des connexions clients
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  // Réception d'un message du client
  socket.on("chat message", (msg) => {
    console.log("Message reçu :", msg);

    // Diffuser le message à tous les clients
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
});
