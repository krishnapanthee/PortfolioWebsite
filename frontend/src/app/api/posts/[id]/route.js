import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    let post;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      post = await Post.findById(id);
    } else {
      post = await Post.findOne({ slug: id });
    }

    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const admin = getAdminFromRequest(request);
    if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    await connectDB();

    const post = await Post.findByIdAndUpdate(id, body, { new: true });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(post);
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

    const post = await Post.findByIdAndDelete(id);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
