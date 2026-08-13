import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Faq from "@/models/Faq";
import { getAdminFromRequest } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const faq = await Faq.findByIdAndUpdate(id, body, { new: true });
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await connectDB();

    const faq = await Faq.findByIdAndDelete(id);
    if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
