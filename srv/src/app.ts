import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import xsenv from '@sap/xsenv';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';
import openapi from './openapi';
import * as middlewares from './middlewares/middlewares';

// Loading for VCAP_APPLICATION to process.env from default-env.json (if exists)
xsenv.loadEnv();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

app.get<Record<string, never>, MessageResponse>('/', (_req, res) => {
  res.json({
    message: 'Healthcheck: 🦄',
  });
});
app.use('/api/v1/openapi', openapi);
middlewares.initializeSecurity(app);
app.use('/api/v1', api);
// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

export default app;
