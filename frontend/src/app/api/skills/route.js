import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Skill from "@/models/Skill";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const skills = await Skill.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    await connectDB();

    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
