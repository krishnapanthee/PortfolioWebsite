export default function manifest() {
  return {
    name: "Krishna Panthi — Full-Stack Developer Portfolio",
    short_name: "Krishna Panthi",
    description:
      "Full-stack software developer based in Nepal specializing in React, Next.js, Node.js, TypeScript, and PostgreSQL.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#10b981",
    icons: [
      {
        src: "/assets/imgPortfolio.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/imgPortfolio.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
