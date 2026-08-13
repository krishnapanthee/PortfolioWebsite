import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Faq from "@/models/Faq";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const faqs = await Faq.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(faqs);
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

    const faq = await Faq.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
