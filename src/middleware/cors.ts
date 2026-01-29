import cors from 'cors';
import { config } from '../config';

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (
      config.cors.allowedOrigins.includes(origin) ||
      origin.includes('telegram.org') ||
      config.nodeEnv === 'development'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
