// PrismaClient is attached to the `global` object in development to prevent exhausting your database connection limit
// Learn more: https://pris.ly/d/help/next-js-best-practices

import { PrismaClient } from '@prisma/client'

declare global {
  var prismaGlobal: undefined | PrismaClient // ReturnType<typeof prismaClientSingleton>
}

// const globalForPrisma = global as unknown as { prisma: PrismaClient }
// export const prisma = globalForPrisma.prisma || new PrismaClient()

export const getPrismaClientSingleton = () => {
  return new PrismaClient()
}

export const prisma = globalThis.prismaGlobal ?? getPrismaClientSingleton()

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

export default prisma
