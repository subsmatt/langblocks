import {PrismaClient} from "@prisma/client";

export const errorFormat = function (errorMessage: string) {
    const str = process.env.NODE_ENV === "production" ? "try refreshing page (prisma)" : errorMessage;
    console.log(str);
    return str;
};

// PrismaClient is attached to the `global` object in development to prevent
// exhausting database connection limit.

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;