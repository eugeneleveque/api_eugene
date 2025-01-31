// // swagger.js
// import swaggerJSDoc from "swagger-jsdoc";

// // Définir les options pour la documentation Swagger
// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0", // Version OpenAPI
//     info: {
//       title: "API Eugene",
//       version: "1.0.0",
//       description: "Une API exemple avec Swagger et Express",
//     },
//     servers: [
//       {
//         url: "http://localhost:8080",
//       },
//     ],
//   },
//   // Spécifiez les fichiers contenant les définitions des API
//   apis: ["./routes/utilisateur-routes.js", ".app.js"], // Changez cela selon vos fichiers de routes
// };

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
  apis: ["./routes/utilisateur-route.js", "./app.js"], // Correction du chemin de fichier
};

export default swaggerOptions;
