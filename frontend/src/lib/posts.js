import React from "react";

export const posts = [
  {
    slug: "building-scalable-mern-applications",
    title: "Building Scalable MERN Applications with Clean Architecture",
    description:
      "A practical guide on structuring full-stack Node.js and React codebases for long-term maintainability and scalability.",
    date: "May 2026",
    readTime: "5 min read",
    category: "Architecture",
    content: (
      <div className="space-y-6 text-base sm:text-lg leading-relaxed">
        <p>
          When building full-stack applications with Node.js, Express, and React, codebases often start simple but quickly turn into spaghetti code as features grow. Applying <strong>Clean Architecture</strong> principles guarantees separation of concerns, testability, and long-term maintainability.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          1. Layered Controller-Service-Repository Pattern
        </h3>
        <p>
          Avoid writing database queries or business logic directly inside Express route controllers. Instead, decouple your backend into three clear layers:
        </p>
        <ul className="list-disc pl-6 space-y-2 font-mono text-sm sm:text-base">
          <li><strong>Controller Layer:</strong> Handles HTTP requests, extracts parameters, and returns response status codes.</li>
          <li><strong>Service Layer:</strong> Contains business rules, validations, and orchestrates domain logic.</li>
          <li><strong>Repository / Data Layer:</strong> Handles direct database queries via Prisma or Mongoose models.</li>
        </ul>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          2. Centralized Error Handling & Async Wrappers
        </h3>
        <p>
          Never let unhandled promise rejections crash your application server. Implement custom error classes (e.g., <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">AppError</code>) and centralized Express error-handling middleware to sanitize error payloads before returning them to the client.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          3. Deterministic Frontend State Management
        </h3>
        <p>
          On the frontend, separate UI state from server state. Use server-state caching libraries like <strong>TanStack Query</strong> to handle data fetching, background revalidation, loading spinners, and optimistic updates smoothly.
        </p>
      </div>
    ),
  },
  {
    slug: "optimizing-react-nextjs-core-web-vitals",
    title: "Optimizing React & Next.js Core Web Vitals for Production",
    description:
      "Key techniques and real-world strategies for improving rendering speed, page performance, and search indexing.",
    date: "Mar 2026",
    readTime: "4 min read",
    category: "Performance",
    content: (
      <div className="space-y-6 text-base sm:text-lg leading-relaxed">
        <p>
          User experience and SEO rankings are directly tied to application speed. Optimizing Google's <strong>Core Web Vitals</strong> (Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift) is crucial for production web apps.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          1. Eliminating Cumulative Layout Shift (CLS)
        </h3>
        <p>
          Layout shifts occur when images or fonts load without pre-reserved dimensions. Always specify width/height aspect ratios or use <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">next/image</code> with responsive fill containers. Additionally, preload critical web fonts using <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">font-display: swap</code>.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          2. Dynamic Imports & Code Splitting
        </h3>
        <p>
          Reduce initial JavaScript bundle size by dynamic importing components that are not visible in the initial viewport (e.g. heavy charts, modal dialogs, complex rich-text editors).
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          3. Server-Side Caching & Edge Delivery
        </h3>
        <p>
          Utilize static site generation (SSG) and Incremental Static Regeneration (ISR) to pre-render static HTML pages at build time, serving cached assets globally via CDNs for sub-100ms response times.
        </p>
      </div>
    ),
  },
  {
    slug: "designing-typography-driven-minimalist-portfolios",
    title: "Designing Typography-Driven Minimalist Developer Portfolios",
    description:
      "Why typography, whitespace, and clean content structure beat heavy decorative animations for engineering portfolios.",
    date: "Jan 2026",
    readTime: "3 min read",
    category: "Design",
    content: (
      <div className="space-y-6 text-base sm:text-lg leading-relaxed">
        <p>
          Many developer portfolios overload visitors with heavy 3D canvases, flashy particles, and excessive animations. While impressive, these often slow down page loads and obscure the core content: your work, experience, and problem-solving skills.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          1. Dual-Font Harmony (Inter + JetBrains Mono)
        </h3>
        <p>
          Combine clean, legible sans-serif typefaces (like <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">Inter</code>) for body copy with crisp monospace fonts (like <code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">JetBrains Mono</code>) for metadata, section labels, dates, and code snippets to establish an editorial feel.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          2. Generous Whitespace & Proportionate Vertical Padding
        </h3>
        <p>
          Content needs breathing room. Tight, consistent vertical padding paired with unified grid column widths (<code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">~900px</code>) creates a structured, magazine-like reading flow.
        </p>

        <h3 className="text-xl sm:text-2xl font-mono font-bold pt-4 text-[#10b981]">
          3. Subtle Emerald Accents over Heavy Gradients
        </h3>
        <p>
          A high-contrast monochrome base paired with a single vibrant accent color (<code className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-sm">#10b981</code>) guides the user's focus effortlessly without visual noise.
        </p>
      </div>
    ),
  },
];

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getAllPosts() {
  return posts;
}
