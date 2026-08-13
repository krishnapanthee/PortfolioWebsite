import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import About from "@/models/About";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    let about = await About.findOne();
    if (!about) {
      about = await About.create(body);
    } else {
      Object.assign(about, body);
      await about.save();
    }

    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
