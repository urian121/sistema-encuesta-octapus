import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "respuestas.json");

export async function POST(req) {
  const body = await req.json();

  if (!fs.existsSync(path.dirname(FILE))) {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
  }

  const existing = fs.existsSync(FILE)
    ? JSON.parse(fs.readFileSync(FILE, "utf-8"))
    : [];

  existing.push({ id: crypto.randomUUID(), fecha: new Date().toISOString(), respuestas: body });
  fs.writeFileSync(FILE, JSON.stringify(existing, null, 2));

  return NextResponse.json({ ok: true });
}
