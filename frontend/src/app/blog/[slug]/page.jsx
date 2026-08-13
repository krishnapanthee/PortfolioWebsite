import { connectDB } from "@/lib/db";
import PostModel from "@/models/Post";
import { getPostBySlug } from "@/lib/posts";
import { generateBlogPostSchema } from "@/lib/schema";
import { notFound } from "next/navigation";
import BlogArticleClient from "./BlogArticleClient";

async function fetchPost(slug) {
  try {
    await connectDB();
    const dbPost = await PostModel.findOne({ slug }).lean();
    if (dbPost) {
      return JSON.parse(JSON.stringify(dbPost));
    }
  } catch (e) {}
  return getPostBySlug(slug);
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | Krishna Panthi",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

  return {
    title: `${post.metaTitle || post.title} | Krishna Panthi`,
    description: post.metaDescription || post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.createdAt || post.date,
      authors: ["Krishna Panthi"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const post = await fetchPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const postSchema = generateBlogPostSchema(post);

  return (
    <>
      {postSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      )}
      <BlogArticleClient post={post} />
    </>
  );
}
