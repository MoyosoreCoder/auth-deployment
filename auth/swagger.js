const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger Configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "User authentication API with JWT",
    },
    servers: [
      {
        url: "http://localhost:5000/api/auth",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/authRoutes.js"], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };