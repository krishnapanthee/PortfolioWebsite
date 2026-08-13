import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Certification from "@/models/Certification";
import { getAdminFromRequest } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const body = await request.json();

    const certification = await Certification.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!certification) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    return NextResponse.json(certification);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const certification = await Certification.findByIdAndDelete(id);

    if (!certification) {
      return NextResponse.json({ error: "Certification not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Certification deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
