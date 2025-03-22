import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const count = Number(req.nextUrl.searchParams.get("limit") || 20);
    const raw = await redis.lrange("chat:history", 0, count - 1);
    const history = raw
      .map((item) => {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      })
      .filter(Boolean); 

    return NextResponse.json({ history });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ History fetch error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
