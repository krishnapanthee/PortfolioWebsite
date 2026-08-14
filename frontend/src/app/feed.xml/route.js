import { connectDB } from "@/lib/db";
import PostModel from "@/models/Post";
import { getAllPosts } from "@/lib/posts";

export const revalidate = 3600; // Revalidate every hour

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
    console.error("Error fetching database posts for RSS feed:", e);
  }

  if (posts.length === 0) {
    posts = getAllPosts();
  }

  const itemsXml = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.createdAt || post.date || Date.now()).toUTCString();
      const description = post.description || post.metaDescription || "";
      const title = post.title || "";

      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>Krishna Panthi</author>
    </item>`;
    })
    .join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Krishna Panthi | Writing &amp; Technical Articles</title>
    <link>${siteUrl}/blog</link>
    <description>Technical articles and guides on MERN stack, Next.js, TypeScript, and software engineering by Krishna Panthi.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
