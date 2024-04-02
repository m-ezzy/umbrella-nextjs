import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

// prisma.$connect()
//   .then(() => {
//     console.log('Connected to the database'.bgGreen);
//   })
//   .catch((error: any) => {
//     console.error('Error connecting to the database:'.bgRed, error);
//   });

// prisma.$disconnect()
//   .then(() => {
//     console.log('Disconnected from the database'.bgGreen);
//   })
//   .catch((error: any) => {
//     console.error('Error disconnecting from the database:'.bgRed, error);
//   });

export { prisma }
