const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const serverUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://bangkit2024.up.railway.app/api/destinAsyik/v1'
    : 'http://localhost:3000/api/destinAsyik/v1';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Destinasyik API v1',
      version: '1.0.0',
      description: 'Dokumentasi API untuk Destinasyik',
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, './*.js')], 
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;