// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Définir les options pour la documentation Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Version OpenAPI
    info: {
      title: "API Eugene",
      version: "1.0.0",
      description: "Une API exemple avec Swagger et Express",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  // Spécifiez les fichiers contenant les définitions des API
  apis: [
    "./modele/modele-utilisateur.js",
    "./controller/utilisateur-controller.js",
    "./routes/utilisateur-routes.js",
  ], // Changez cela selon vos fichiers de routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec };
