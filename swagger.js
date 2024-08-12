import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'API Documentation'
        },
        servers: [
            {
                url: 'http://localhost:3000', // Change this to your server URL
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
    apis: ['./router/*.js',],
    
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app) => {
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
