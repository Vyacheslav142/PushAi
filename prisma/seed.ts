import { PrismaClient } from '@prisma/client';
import { PgAdapter } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PgAdapter(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seed...');

  const roomItems = [
    {
      name: 'Коврик для йоги',
      priceInPoints: 50,
      description: 'Удобный коврик для упражнений',
    },
    {
      name: 'Гантели 2кг',
      priceInPoints: 100,
      description: 'Легкие гантели для начинающих',
    },
    {
      name: 'Фитбол',
      priceInPoints: 150,
      description: 'Мяч для баланса и упражнений',
    },
    {
      name: 'Эспандер',
      priceInPoints: 80,
      description: 'Эластичная лента для тренировок',
    },
    {
      name: 'Турник настенный',
      priceInPoints: 200,
      description: 'Турник для подтягиваний',
    },
    {
      name: 'Беговая дорожка',
      priceInPoints: 500,
      description: 'Профессиональная беговая дорожка',
    },
    {
      name: 'Скакалка',
      priceInPoints: 30,
      description: 'Скакалка для кардио',
    },
    {
      name: 'Гантели 5кг',
      priceInPoints: 250,
      description: 'Гантели среднего веса',
    },
  ];

  for (const item of roomItems) {
    await prisma.roomItem.upsert({
      where: { id: roomItems.indexOf(item) + 1 },
      update: {},
      create: item,
    });
  }

  console.log('✅ Seed completed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
