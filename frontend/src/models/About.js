import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Krishna Panthi" },
    location: { type: String, default: "Nepal" },
    imageUrl: { type: String, default: "/assets/imgPortfolio.png" },
    paragraphs: {
      type: [String],
      default: [
        "I'm Krishna Panthi, a full-stack developer based in Nepal. I specialize in the MERN stack and build clean, efficient digital solutions with Next.js and PostgreSQL.",
        "My goal is to create web applications that are as powerful as they are intuitive - shipping products that real people use, not just 'projects'.",
      ],
    },
    highlightTechs: {
      type: [String],
      default: ["MERN", "Next.js", "PostgreSQL"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.About || mongoose.model("About", AboutSchema);
