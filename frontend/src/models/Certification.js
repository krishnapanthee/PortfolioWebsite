import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Certification title is required"],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, "Issuing organization is required"],
      trim: true,
    },
    issueDate: {
      type: String,
      trim: true,
      default: "",
    },
    expiryDate: {
      type: String,
      trim: true,
      default: "",
    },
    credentialId: {
      type: String,
      trim: true,
      default: "",
    },
    credentialUrl: {
      type: String,
      trim: true,
      default: "",
    },
    fileUrl: {
      type: String,
      trim: true,
      default: "",
    },
    fileType: {
      type: String,
      trim: true,
      default: "document", // 'pdf', 'image', 'spreadsheet', 'document'
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Certification ||
  mongoose.model("Certification", CertificationSchema);
