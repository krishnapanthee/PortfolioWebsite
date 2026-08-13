import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // e.g. "frontend", "backend", "databases", "tools"
    skills: { type: [String], required: true, default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
