import dotenv from 'dotenv';
import prismaClientPkg from './prisma-sqlite-js/node_modules/@prisma/client/default.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { fileURLToPath } from 'node:url';

const { PrismaClient } = prismaClientPkg;
const dbPath = fileURLToPath(new URL('./prisma-sqlite-js/dev.db', import.meta.url));

dotenv.config({ path: fileURLToPath(new URL('./prisma-sqlite-js/.env', import.meta.url)) });

// 1. Instantiate the Driver Adapter Prisma 7 expects
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });

// 2. Pass the adapter to the client constructor
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
