import express, { Application, Request, Response } from 'express';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(corsMiddleware);

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', routes);

app.use(errorHandler);

app.use('*', (_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

export default app;
