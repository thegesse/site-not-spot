import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

// 1. Initialize the better-sqlite3 database connection
const sqlite = new Database('prisma/dev.db');

// 2. Instantiate the Driver Adapter Prisma 7 requires
const adapter = new PrismaBetterSqlite3(sqlite);

// 3. Feed the adapter into the Prisma Client
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Writing a test user to SQLite...');
  const newUser = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });
  console.log('✅ Created User:', newUser);

  console.log('\n🔍 Fetching all users...');
  const allUsers = await prisma.user.findMany();
  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
