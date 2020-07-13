import express from 'express';
import 'express-async-errors';
import path from 'path';
import * as Sentry from '@sentry/node';
import routes from './routes';
import sentryConfig from './config/sentry';
import exceptionHandler from './app/middlewares/exceptionHandler';

import './database';

const app = express();

Sentry.init(sentryConfig);
app.use(Sentry.Handlers.requestHandler());

app.use(express.json());
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(exceptionHandler);

export default app;
