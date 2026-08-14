import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://krishnaprasadpanthi17.com.np";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Krishna Panthi | Full-Stack Developer & Software Engineer Nepal",
    template: "%s | Krishna Panthi",
  },
  description:
    "Official portfolio of Krishna Panthi, a Full-Stack Software Engineer based in Nepal specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL.",
  keywords: [
    "Krishna Panthi",
    "Full Stack Developer Nepal",
    "React Developer Nepal",
    "Next.js Developer",
    "MERN Stack Engineer",
    "Software Engineer Nepal",
    "Web Developer Nepal",
    "PostgreSQL",
    "TypeScript",
  ],
  authors: [{ name: "Krishna Panthi", url: siteUrl }],
  creator: "Krishna Panthi",
  publisher: "Krishna Panthi",
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
      "application/json": `${siteUrl}/feed.json`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/imgPortfolio.png",
    shortcut: "/assets/imgPortfolio.png",
    apple: "/assets/imgPortfolio.png",
  },
  openGraph: {
    title: "Krishna Panthi | Full-Stack Developer & Software Engineer Nepal",
    description:
      "Full-stack software developer based in Nepal building high-performance web applications with React, Next.js, Node.js, TypeScript, and PostgreSQL.",
    url: siteUrl,
    siteName: "Krishna Panthi Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/imgPortfolio.png",
        width: 1200,
        height: 630,
        alt: "Krishna Panthi - Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krishna Panthi | Full-Stack Developer & Software Engineer",
    description: "Full-stack developer building scalable web applications with React, Next.js, Node.js, and PostgreSQL.",
    creator: "@kishna165887",
    site: "@kishna165887",
    images: ["/assets/imgPortfolio.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
