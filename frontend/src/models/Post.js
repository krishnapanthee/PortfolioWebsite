import mongoose from "mongoose";

const FaqItemSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const PostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }, // e.g. "May 2026"
    readTime: { type: String, default: "5 min read" },
    category: { type: String, default: "Architecture" },
    content: { type: String, required: true }, // Rich Text HTML content from TipTap
    published: { type: Boolean, default: true },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    faqs: { type: [FaqItemSchema], default: [] }, // Post-specific FAQs for AEO & SEO
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", PostSchema);
