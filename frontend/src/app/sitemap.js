import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { getAllPosts } from "@/lib/posts";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";
  const now = new Date();

  // Static & utility routes
  const routes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llms-full.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/feed.xml`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/feed.json`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.6,
    },
  ];

  let posts = [];

  try {
    await connectDB();
    const dbPosts = await Post.find({ published: true }).select("slug updatedAt createdAt").lean();
    if (dbPosts && dbPosts.length > 0) {
      posts = JSON.parse(JSON.stringify(dbPosts));
    }
  } catch (e) {
    console.error("Error generating sitemap from DB:", e);
  }

  if (posts.length === 0) {
    posts = getAllPosts();
  }

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt || post.createdAt || now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...routes, ...postRoutes];
}
