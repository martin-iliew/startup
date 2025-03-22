import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 1,
  enableReadyCheck: false,
});

// ✅ Catch global Redis connection errors
redis.on("error", (err) => {
  console.warn("⚠️ Redis client error (global):", err.message);
});

export default redis;
