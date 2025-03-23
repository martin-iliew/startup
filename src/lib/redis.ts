import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 1,
  enableReadyCheck: false,
});

redis.on("error", (err) => {
  console.warn("⚠️ Redis client error (global):", err.message);
});

export type StoredRecommendation = {
  quizAnswers: Record<string, string | string[]>;
  prompt: string;
  recommendations: Array<{
    major: string;
    reason: string;
    universities: Array<{
      name: string;
      link: string;
      snippet?: string;
    }>;
  }>;
};

export async function saveResult(
  key: string,
  data: StoredRecommendation
): Promise<void> {
  await redis.set(key, JSON.stringify(data));
}

export async function getResult(
  key: string
): Promise<StoredRecommendation | null> {
  const data = await redis.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data) as StoredRecommendation;
  } catch {
    return null;
  }
}

export default redis;
