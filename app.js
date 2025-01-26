import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import sequelize from "./db.js";

// Configuration
const SERVER_PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const template_folder = path.join(__dirname, "tmpl", "layout");

// Initialisation du serveur
const app = express();

// Middleware pour les cookies et l'analyse des requêtes
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Middleware pour les sessions
app.use(
  session({
    secret: "votreCleSecrete", // Changez cette clé pour plus de sécurité
    resave: false,
    saveUninitialized: true,
  })
);

// Configuration du moteur de rendu
app.set("view engine", "ejs");
app.set("views", template_folder);

// Middleware pour passer la session à EJS
app.use((req, res, next) => {
  res.locals.session = req.session; // Transmettre la session à toutes les vues
  next();
});

// app.get("/image-clem", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "tmpl", "delle.webp"));
// });

// Routes
app.get("/(HOME)?", (req, res) => {
  const isAdmin = req.session.user === "admin";
  res.render("page", {
    isAdmin,
    header: { title: "HOME" },
    body: {
      header: "<h1>Bienvenue !</h1>",
      main: "<p>Ceci est mon site fait avec EJS.</p>",
    },
  });
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    req.session.user = username;
    res.redirect("/");
  } else {
    res.render("login", { error: "Identifiants incorrects" });
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/clement.html", (req, res) => {
  res.render("socket");
});

// Gestion des pages introuvables
app.use((req, res) => {
  res.status(404).render("NotFound", { message: "Page non trouvée" });
});

// Lancement du serveur
app.listen(SERVER_PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${SERVER_PORT} 🚀!`);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion à la base de données réussie.");
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });
