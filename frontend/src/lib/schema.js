/**
 * Schema.org JSON-LD Structured Data Generators for Technical SEO, GEO, and AEO.
 * Optimized for Google Search, Bing, SearchGPT, Claude, Perplexity AI, and Voice Assistants.
 */

const getSiteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

/**
 * Generates canonical Person entity graph schema.
 */
export function generatePersonSchema({ hero, about, experiences, education, skills, socialLinks, certifications }) {
  const siteUrl = getSiteUrl();

  const sameAs = [
    "https://github.com/krishnapanthee",
    ...(socialLinks || []).map((s) => s.url).filter(Boolean),
  ];
  // Deduplicate sameAs links
  const uniqueSameAs = Array.from(new Set(sameAs));

  const knowsAbout = Array.from(
    new Set([
      "Full-Stack Web Development",
      "MERN Stack (MongoDB, Express, React, Node.js)",
      "Next.js App Router & Server Components",
      "TypeScript",
      "JavaScript (ES6+)",
      "PostgreSQL",
      "RESTful API Design",
      "GraphQL Architecture",
      "Tailwind CSS",
      "Technical SEO",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      ...(skills || []).flatMap((s) => s.skills || []),
    ])
  );

  const worksFor = (experiences || []).map((e) => ({
    "@type": "EmployeeRole",
    roleName: e.role,
    worksFor: {
      "@type": "Organization",
      name: e.company,
      url: e.companyUrl || undefined,
    },
    startDate: e.period ? e.period.split("—")[0]?.trim() : undefined,
  }));

  const alumniOf = (education || []).map((ed) => ({
    "@type": "EducationalOrganization",
    name: ed.institution,
    description: ed.degree,
  }));

  const hasCredential = (certifications || []).map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    credentialCategory: "Certification",
    recognizedBy: {
      "@type": "Organization",
      name: c.issuer,
    },
    url: c.credentialUrl || undefined,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: hero?.name || "Krishna Panthi",
    alternateName: ["Krishna Prasad Panthi", "krishnapanthee"],
    jobTitle: "Full-Stack Developer",
    description:
      hero?.tagline ||
      about?.paragraphs?.[0] ||
      "Full-stack developer based in Nepal specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL.",
    url: siteUrl,
    image: `${siteUrl}${about?.imageUrl || "/assets/imgPortfolio.png"}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Nepal",
    },
    sameAs: uniqueSameAs,
    knowsAbout,
    worksFor,
    alumniOf,
    hasCredential: hasCredential.length > 0 ? hasCredential : undefined,
    mainEntityOfPage: siteUrl,
  };
}

/**
 * Generates top-level ProfilePage schema for portfolio root.
 */
export function generateProfilePageSchema({ siteUrl = getSiteUrl() }) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: "Krishna Panthi — Full-Stack Developer Portfolio & Engineering Hub",
    description:
      "Official portfolio of Krishna Panthi, a Full-Stack Software Engineer based in Nepal specializing in MERN stack, Next.js, and PostgreSQL.",
    mainEntity: {
      "@id": `${siteUrl}/#person`,
    },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Technical Articles & Writing",
        url: `${siteUrl}/blog`,
      },
      {
        "@type": "WebPage",
        name: "LLM Context Index (llms.txt)",
        url: `${siteUrl}/llms.txt`,
      },
    ],
  };
}

/**
 * Generates WebSite schema with publisher reference.
 */
export function generateWebSiteSchema({ siteUrl = getSiteUrl() }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Krishna Panthi Portfolio",
    description: "Full-stack software engineering portfolio, project showcases, and technical guides by Krishna Panthi.",
    inLanguage: "en-US",
    publisher: {
      "@id": `${siteUrl}/#person`,
    },
  };
}

/**
 * Generates FAQPage schema with speakable selectors for AEO (Answer Engine Optimization).
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteUrl}/#faq`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".faq-question", ".faq-answer"],
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates BlogPosting schema with speakable & author entity linking.
 */
export function generateBlogPostSchema(post) {
  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const cleanText = post.content?.replace(/<[^>]*>?/gm, "").substring(0, 500) || post.description;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    headline: post.title,
    description: post.description,
    articleBody: post.content?.replace(/<[^>]*>?/gm, "") || "",
    datePublished: post.createdAt || post.date,
    dateModified: post.updatedAt || post.createdAt || post.date,
    inLanguage: "en-US",
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".prose p"],
    },
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Krishna Panthi",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Krishna Panthi",
      url: siteUrl,
    },
    keywords: post.category ? [post.category, "Krishna Panthi", "Full-Stack Development"] : ["Krishna Panthi"],
  };

  if (post.faqs && post.faqs.length > 0) {
    const faqSchema = generateFAQSchema(post.faqs);
    return [blogPostingSchema, faqSchema];
  }

  return blogPostingSchema;
}

/**
 * Generates Project ItemList schema for software showcases.
 */
export function generateProjectListSchema(projects) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}/#projects`,
    name: "Krishna Panthi's Web Development Projects",
    itemListElement: (projects || []).map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.description,
        applicationCategory: "WebApplication",
        url: p.demoUrl || p.githubUrl || siteUrl,
        operatingSystem: "Web Browser",
        author: {
          "@id": `${siteUrl}/#person`,
        },
      },
    })),
  };
}

/**
 * Generates BreadcrumbList schema for path navigation hierarchy.
 */
export function generateBreadcrumbSchema(items = []) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
      })),
    ],
  };
}
