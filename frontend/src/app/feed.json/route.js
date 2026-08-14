import { connectDB } from "@/lib/db";
import PostModel from "@/models/Post";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600;

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

  let posts = [];

  try {
    await connectDB();
    const dbPosts = await PostModel.find({ published: true }).sort({ createdAt: -1 }).lean();
    if (dbPosts && dbPosts.length > 0) {
      posts = JSON.parse(JSON.stringify(dbPosts));
    }
  } catch (e) {
    console.error("Error fetching database posts for JSON feed:", e);
  }

  if (posts.length === 0) {
    posts = getAllPosts();
  }

  const items = posts.map((post) => ({
    id: `${siteUrl}/blog/${post.slug}`,
    url: `${siteUrl}/blog/${post.slug}`,
    title: post.title,
    summary: post.description || post.metaDescription || "",
    date_published: new Date(post.createdAt || post.date || Date.now()).toISOString(),
    author: {
      name: "Krishna Panthi",
      url: siteUrl,
    },
  }));

  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Krishna Panthi | Writing & Technical Articles",
    home_page_url: siteUrl,
    feed_url: `${siteUrl}/feed.json`,
    description: "Technical articles and software engineering guides by Krishna Panthi.",
    authors: [
      {
        name: "Krishna Panthi",
        url: siteUrl,
      },
    ],
    items,
  };

  return new Response(JSON.stringify(jsonFeed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
