import { connectDB } from "@/lib/db";
import Post from "@/models/Post";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  try {
    await connectDB();
    const posts = await Post.find({ published: true }).select("slug updatedAt createdAt");

    const postRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.createdAt || new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    return [...routes, ...postRoutes];
  } catch (e) {
    return routes;
  }
}
