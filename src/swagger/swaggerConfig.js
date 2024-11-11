// swaggerConfig.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CodexCloud Authentication API",
      version: "1.0.0",
      description: "API documentation for CodexCloud Authentication service",
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Points to the file where routes are defined
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);
export const swaggerUiSetup = swaggerUi;
