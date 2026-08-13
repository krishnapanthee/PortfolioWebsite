import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Krishna Panthi" },
    tagline: {
      type: String,
      default: "full-stack developer building things for the web.",
    },
    techHighlights: {
      type: [String],
      default: ["React", "Node.js", "Next.js", "TypeScript", "PostgreSQL"],
    },
    statusText: { type: String, default: "// currently open to opportunities" },
    githubUrl: { type: String, default: "https://github.com/krishnapanthee" },
    resumeUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
