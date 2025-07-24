// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// async function connectToDatabase() {
//   try {
//     await prisma.$connect(); 
//     console.log('✅ MySQL Connected successfully with Prisma!');
//   } catch (error) {
//     console.error('❌ Failed to connect to MySQL with Prisma:', error.message);
//     process.exit(1);
//   }
// }

// connectToDatabase();

// module.exports = prisma;

// process.on('beforeExit', async () => {
//   await prisma.$disconnect();
// });
// process.on('SIGINT', async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);



module.exports = sequelize;
