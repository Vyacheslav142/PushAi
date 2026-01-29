import { PrismaClient } from '@prisma/client';
import { PgAdapter } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import logger from '../config/logger';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PgAdapter(pool);

const prisma = new PrismaClient({
  adapter,
  log:
    process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
});

prisma
  .$connect()
  .then(() => {
    logger.info('✅ Database connected successfully');
  })
  .catch((error) => {
    logger.error('❌ Database connection failed:', error);
    process.exit(1);
  });

export default prisma;
