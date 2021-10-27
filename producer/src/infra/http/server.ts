import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata'
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '@/infra/docs/swagger.json';
import { AppError } from '@/errors/AppError';
import { getClient } from '@/infra/elastic';
import { getProducer } from '@/infra/kafka';
import { router } from '@/infra/http/routes';
import createConnection from '@/infra/typeorm';
import '@/container';

createConnection();

const app = express();
getClient();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use((request: Request, _: Response, next: NextFunction) => {
  request.producer = getProducer();
  request.elastic = getClient();
  return next();
})
app.use(router);
app.use((error: Error, _: Request, response: Response) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${error.message}`,
  });
});

app.listen(3333, () =>
  console.log(
    `\x1b[35m 🚀 Server started and listening in:\x1b[36m http://localhost:3333/`
  )
);
