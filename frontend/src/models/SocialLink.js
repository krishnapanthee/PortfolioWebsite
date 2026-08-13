import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true }, // "GitHub", "LinkedIn", "Twitter", "Email"
    url: { type: String, required: true },
    label: { type: String, required: true },
    iconName: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.SocialLink ||
  mongoose.model("SocialLink", SocialLinkSchema);
