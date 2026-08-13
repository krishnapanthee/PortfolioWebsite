/**
 * Schema.org JSON-LD Structured Data Generators for SEO, GEO, and AEO.
 */

export function generatePersonSchema({ hero, about, experiences, education, skills, socialLinks }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

  const sameAs = (socialLinks || []).map((s) => s.url).filter(Boolean);
  const knowsAbout = (skills || []).flatMap((s) => s.skills || []);

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
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: hero?.name || "Krishna Panthi",
    jobTitle: "Full-Stack Developer",
    description: hero?.tagline || "Full-stack developer building things for the web.",
    url: siteUrl,
    image: `${siteUrl}${about?.imageUrl || "/assets/imgPortfolio.png"}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "Nepal",
    },
    sameAs,
    knowsAbout,
    worksFor,
    alumniOf,
  };
}

export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function generateBlogPostSchema(post) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    articleBody: post.content?.replace(/<[^>]*>?/gm, ""), // Clean text
    datePublished: post.createdAt || post.date,
    dateModified: post.updatedAt || post.createdAt || post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    author: {
      "@type": "Person",
      name: "Krishna Panthi",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Krishna Panthi",
      url: siteUrl,
    },
  };

  if (post.faqs && post.faqs.length > 0) {
    const faqSchema = generateFAQSchema(post.faqs);
    return [blogPostingSchema, faqSchema];
  }

  return blogPostingSchema;
}

export function generateProjectListSchema(projects) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
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
      },
    })),
  };
}
