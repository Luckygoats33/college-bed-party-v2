import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { email, school } = await request.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    const line = JSON.stringify({ email, school: school ?? "", ts: new Date().toISOString() }) + "\n";
    const file = path.join(process.cwd(), "newsletter-signups.jsonl");
    await fs.appendFile(file, line, "utf8");

    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
