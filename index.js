import { PrismaClient } from "@prisma/client";
import { env } from "@appblocks/node-sdk";
import { createClient } from "redis";

const redis = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASSWORD
});
redis.on("error", (err) => {
  console.log("Error " + err);
});
redis.on("connect", () => {
  console.log("Redis client connected");
});

(async () => {
  await redis.connect();
})();

env.init();

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
prisma.$on("beforeExit", async () => {
  console.log("beforeExit hook");
  // PrismaClient still available
});

export default { prisma, redis };
