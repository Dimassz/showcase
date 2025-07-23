const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect(); 
    console.log('✅ MySQL Connected successfully with Prisma!');
  } catch (error) {
    console.error('❌ Failed to connect to MySQL with Prisma:', error.message);
    process.exit(1);
  }
}

connectToDatabase();

module.exports = prisma;

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});