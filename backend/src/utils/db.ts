// Reliable standard PrismaClient — works perfectly for Node.js Express dev server
// The Neon serverless adapter is only needed for edge/Cloudflare Workers deployments
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Singleton pattern - reuse in dev (prevents exhausting connections on hot reload)
const prisma: PrismaClient =
  global.__prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

export { prisma };
export default prisma;
