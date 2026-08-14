import { connectDB } from "@/lib/db";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";
import ExperienceModel from "@/models/Experience";
import EducationModel from "@/models/Education";
import SkillModel from "@/models/Skill";
import ProjectModel from "@/models/Project";
import CertificationModel from "@/models/Certification";
import PostModel from "@/models/Post";
import TestimonialModel from "@/models/Testimonial";
import FaqModel from "@/models/Faq";
import SocialLinkModel from "@/models/SocialLink";

import {
  generatePersonSchema,
  generateProfilePageSchema,
  generateWebSiteSchema,
  generateFAQSchema,
  generateProjectListSchema,
} from "@/lib/schema";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";

export const revalidate = 60; // Revalidate every 60s for ISR

export async function generateMetadata() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";
  return {
    title: "Krishna Panthi | Full-Stack Developer & Software Engineer Nepal",
    description:
      "Krishna Panthi is a Full-Stack Developer based in Nepal specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL. View portfolio, projects, and technical articles.",
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: "Krishna Panthi | Full-Stack Developer & Software Engineer Nepal",
      description: "Full-stack developer building scalable web applications with React, Next.js, and PostgreSQL.",
      url: siteUrl,
      siteName: "Krishna Panthi Portfolio",
      images: [
        {
          url: `${siteUrl}/assets/imgPortfolio.png`,
          width: 1200,
          height: 630,
          alt: "Krishna Panthi",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Krishna Panthi | Full-Stack Developer",
      description: "Full-stack developer building scalable web applications with React, Next.js, Node.js, and PostgreSQL.",
      creator: "@kishna165887",
    },
  };
}

async function getPortfolioData() {
  try {
    await connectDB();

    const [
      hero,
      about,
      experiences,
      education,
      skills,
      projects,
      certifications,
      posts,
      testimonials,
      faqs,
      socialLinks,
    ] = await Promise.all([
      HeroModel.findOne().lean(),
      AboutModel.findOne().lean(),
      ExperienceModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      EducationModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      SkillModel.find().sort({ order: 1, createdAt: 1 }).lean(),
      ProjectModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      CertificationModel.find({ isPublished: true }).sort({ order: 1, createdAt: -1 }).lean(),
      PostModel.find({ published: true }).sort({ createdAt: -1 }).lean(),
      TestimonialModel.find().sort({ order: 1, createdAt: -1 }).lean(),
      FaqModel.find().sort({ order: 1, createdAt: 1 }).lean(),
      SocialLinkModel.find().sort({ order: 1, createdAt: 1 }).lean(),
    ]);

    // Convert MongoDB _id and dates to plain serializable JSON
    const serialize = (obj) => JSON.parse(JSON.stringify(obj));

    return {
      hero: serialize(hero),
      about: serialize(about),
      experiences: serialize(experiences),
      education: serialize(education),
      skills: serialize(skills),
      projects: serialize(projects),
      certifications: serialize(certifications),
      posts: serialize(posts),
      testimonials: serialize(testimonials),
      faqs: serialize(faqs),
      socialLinks: serialize(socialLinks),
    };
  } catch (e) {
    console.error("Error loading server portfolio data:", e);
    return {};
  }
}

export default async function Home() {
  const data = await getPortfolioData();

  const personSchema = generatePersonSchema(data);
  const profilePageSchema = generateProfilePageSchema({});
  const websiteSchema = generateWebSiteSchema({});
  const faqSchema = generateFAQSchema(data.faqs);
  const projectSchema = generateProjectListSchema(data.projects);

  return (
    <>
      {/* Schema.org JSON-LD Structured Data Injection for Search Engines, GEO & AEO */}
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      )}
      {profilePageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      )}
      {websiteSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {projectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}

      <MainLayoutWrapper
        hero={data.hero}
        about={data.about}
        experiences={data.experiences}
        education={data.education}
        skills={data.skills}
        projects={data.projects}
        certifications={data.certifications}
        posts={data.posts}
        testimonials={data.testimonials}
        faqs={data.faqs}
        socialLinks={data.socialLinks}
      />
    </>
  );
}
