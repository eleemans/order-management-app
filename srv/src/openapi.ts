import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { isLocalhost } from '../util/get-environment';

const swaggerRouter = Router();

const servers = [
  {
    url: 'http://localhost:5000',
    description: 'Approuter for testing locally',
  },
  {
    url: 'http://localhost:5001',
    description: 'Development server',
  },
  // {
  //   url: 'https://alliander-dev-cf-dev-ogi-hc-order-management-app-approuter.cfapps.eu10.hana.ondemand.com',
  //   description: 'Approuter for testing',
  // },
  // {
  //   url: 'https://alliander-dev-cf-dev-ogi-hc-order-management-app-server.cfapps.eu10.hana.ondemand.com',
  //   description: 'Development server',
  // },
  // {
  //   url: 'https://alliander-acc-cf-qirion-icore-api-server.cfapps.eu10.hana.ondemand.com',
  //   description: 'Acceptance server',
  // },
  // {
  //   url: 'https://alliander-prd-cf-qirion-icore-api-server.cfapps.eu10.hana.ondemand.com',
  //   description: 'Production server',
  // },
];
const apis = ['./src/api/*.ts'];

// if (isLocalhost()) {
//   servers.unshift(
// {
//   url: 'http://localhost:5000',
//   description: 'Approuter for testing locally',
// },
// {
//   url: 'http://localhost:5001',
//   description: 'Development server',
// }
//   );

//   apis.push('./src/api/users/*.ts');
// }

const optionsJsdoc: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'iCore API',
      version: '1.0.1',
      description: 'iCore API',
      contact: {
        name: 'Team Geel',
        url: 'https://portal-alliander.api-dex.io',
        email: 'bert.matton@qirion.nl',
      },
    },
    servers: servers,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    basePath: 'api/v1',
    tags: [
      // {
      //   name: 'Assets',
      //   description: '',
      // },
      // {
      //   name: 'Issues',
      //   description: '',
      // },
      // {
      //   name: 'Choicelists',
      //   description: '',
      // },
      // {
      //   name: 'Choicelists allowed values',
      //   description: '',
      // },
      // {
      //   name: 'App users',
      //   description: '',
      // },
    ],
  },
  apis: apis,
};

const swaggerSpec: swaggerUi.JsonObject = swaggerJsdoc(optionsJsdoc);

const optionsUi: swaggerUi.SwaggerUiOptions = {
  explorer: false,
};

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerSpec, optionsUi));

export default swaggerRouter;
