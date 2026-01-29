import app from './app';
import { config } from './config';
import logger from './config/logger';
import prisma from './database/prisma';

const PORT = config.port;

const gracefulShutdown = async () => {
  logger.info('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

app.listen(PORT, () => {
  logger.info(`🚀 Server is running on port ${PORT}`);
  logger.info(`📝 Environment: ${config.nodeEnv}`);
  logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
});
