import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");

    const query = all === "true" ? {} : { isPublished: true };
    const certifications = await Certification.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json(certifications);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();
    const certification = await Certification.create(body);

    return NextResponse.json(certification, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
