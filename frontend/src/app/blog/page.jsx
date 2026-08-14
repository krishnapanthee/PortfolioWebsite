import { getAllPosts } from "../../lib/posts";
import { generateBreadcrumbSchema } from "@/lib/schema";
import BlogListClient from "./BlogListClient";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

export const metadata = {
  title: "Writing & Technical Articles | Krishna Panthi",
  description:
    "Technical articles and engineering guides on MERN stack architecture, React & Next.js performance, PostgreSQL, and web development.",
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: "Writing & Technical Articles | Krishna Panthi",
    description: "Technical articles on MERN stack, Next.js, and modern web development.",
    url: `${siteUrl}/blog`,
    type: "website",
  },
};

export default function BlogListPage() {
  const posts = getAllPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Writing & Articles", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogListClient posts={posts} />
    </>
  );
}
