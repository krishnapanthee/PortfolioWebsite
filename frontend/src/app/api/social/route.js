import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import SocialLink from "@/models/SocialLink";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const links = await SocialLink.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(links);
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

    const link = await SocialLink.create(body);
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
