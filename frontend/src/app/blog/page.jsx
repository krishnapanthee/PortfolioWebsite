import { getAllPosts } from "../../lib/posts";
import BlogListClient from "./BlogListClient";

export const metadata = {
  title: "Writing & Articles | Krishna Panthi",
  description:
    "Articles and technical guides on MERN stack architecture, React & Next.js performance, and minimalist web design.",
};

export default function BlogListPage() {
  const posts = getAllPosts();
  return <BlogListClient posts={posts} />;
}
