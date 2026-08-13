import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hero from "@/models/Hero";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    return NextResponse.json(hero);
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

    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(body);
    } else {
      Object.assign(hero, body);
      await hero.save();
    }

    return NextResponse.json(hero);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
