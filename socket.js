import { Server } from "socket.io";
import determineCoupureGeneric from "./dab.js";

export default (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080", // Origine autorisée pour le frontend
      methods: ["GET", "POST"], // Méthodes HTTP autorisées
    },
  });

  // Fonction utilitaire pour obtenir l'heure au format HH:mm
  function getTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  io.on("connection", (socket) => {
    console.log("Un utilisateur est connecté");

    socket.on("joindre_chat", (username) => {
      socket.username = username;
      // Diffuser la connection à tous les clients
      io.emit("message", {
        type: "system",
        time: getTime(),
        content: `${username} a rejoint le chat`,
      });
    });
    // Réception d'un message
    socket.on("chat message", (msg) => {
      console.log("Message reçu :", msg);
      // Vérification si le message est une commande pour le DAB
      const dabRegex = /^DAB\s([\d,]+)€$/i;
      const match = msg.match(dabRegex);

      if (match) {
        // Extraction du montant de la commande DAB
        const montantString = match[1].replace(",", ".");
        const montant = parseFloat(montantString);

        // Utilisation de la fonction pour déterminer les coupures
        const result = determineCoupureGeneric({ montant, typeDevise: "EUR" });

        // Diffuser la réponse dans le chat
        io.emit("chat_message", {
          type: "chat",
          user: "Système", // ou un nom spécifique pour le bot
          time: getTime(),
          content: result, // Afficher le résultat de la répartition
        });
      } else {
        // Diffuser le message classique à tous les clients
        io.emit("chat_message", {
          type: "chat",
          user: socket.username,
          time: getTime(),
          content: msg, // Utiliser "msg" au lieu de "message"
        });
      }
    });
    // Deconnection du socket
    socket.on("disconnect", () => {
      if (socket.username) {
        // Diffuser la deconnection à tous les clients
        io.emit("message", {
          type: "system",
          time: getTime(),
          content: `${socket.username} a quitté le chat`,
        });
      }
    });
  });
};
