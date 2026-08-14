import { connectDB } from "@/lib/db";
import PostModel from "@/models/Post";
import { getPostBySlug } from "@/lib/posts";
import { generateBlogPostSchema, generateBreadcrumbSchema } from "@/lib/schema";
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
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: `${post.metaTitle || post.title} | Krishna Panthi`,
    description: post.metaDescription || post.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      type: "article",
      publishedTime: post.createdAt || post.date,
      modifiedTime: post.updatedAt || post.createdAt || post.date,
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
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Writing & Articles", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      {postSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <BlogArticleClient post={post} />
    </>
  );
}
