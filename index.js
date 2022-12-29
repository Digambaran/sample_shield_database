import { PrismaClient } from "@prisma/client";
// import { env } from "@appblocks/node-sdk";

// env.init();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

console.log("::P::", prisma);
export default { prisma, key: "value" };