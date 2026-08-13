import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";

export const metadata = {
  title: "Krishna Panthi | Full-Stack Developer",
  description:
    "Full-stack developer based in Nepal focused on React, Node.js, Next.js, TypeScript, and PostgreSQL.",
  keywords: [
    "Krishna Panthi",
    "Full Stack Developer",
    "Nepal",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
  ],
  authors: [{ name: "Krishna Panthi" }],
  icons: {
    icon: "/assets/imgPortfolio.png",
    shortcut: "/assets/imgPortfolio.png",
    apple: "/assets/imgPortfolio.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
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
