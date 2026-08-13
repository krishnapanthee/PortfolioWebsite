import { connectDB } from "@/lib/db";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";
import ExperienceModel from "@/models/Experience";
import EducationModel from "@/models/Education";
import SkillModel from "@/models/Skill";
import ProjectModel from "@/models/Project";
import PostModel from "@/models/Post";
import TestimonialModel from "@/models/Testimonial";
import FaqModel from "@/models/Faq";
import SocialLinkModel from "@/models/SocialLink";

import {
  generatePersonSchema,
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
      "Krishna Panthi is a Full-Stack Developer based in Nepal specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL. View portfolio, projects, and articles.",
    keywords: [
      "Krishna Panthi",
      "Full Stack Developer Nepal",
      "React Developer Nepal",
      "Next.js Developer",
      "MERN Stack Engineer",
      "Software Engineer Nepal",
    ],
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Krishna Panthi | Full-Stack Developer",
      description: "Full-stack developer building scalable web applications.",
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
      description: "Full-stack developer building scalable web applications.",
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
  const faqSchema = generateFAQSchema(data.faqs);
  const projectSchema = generateProjectListSchema(data.projects);

  return (
    <>
      {/* Schema.org JSON-LD Structured Data Injection for Search Engines & AEO */}
      {personSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
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
        posts={data.posts}
        testimonials={data.testimonials}
        faqs={data.faqs}
        socialLinks={data.socialLinks}
      />
    </>
  );
}
