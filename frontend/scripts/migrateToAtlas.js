import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const LOCAL_URI = process.env.LOCAL_MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";
const TARGET_ATLAS_URI = process.argv[2] || process.env.MONGODB_URI;

if (!TARGET_ATLAS_URI || TARGET_ATLAS_URI.includes("127.0.0.1") || TARGET_ATLAS_URI.includes("localhost")) {
  console.error("\n❌ Error: Please provide a valid MongoDB Atlas connection string.");
  console.log("Usage: node scripts/migrateToAtlas.js \"mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/portfolio?retryWrites=true&w=majority\"\n");
  process.exit(1);
}

// Model Schemas
const AdminSchema = new mongoose.Schema({}, { strict: false });
const HeroSchema = new mongoose.Schema({}, { strict: false });
const AboutSchema = new mongoose.Schema({}, { strict: false });
const ExperienceSchema = new mongoose.Schema({}, { strict: false });
const EducationSchema = new mongoose.Schema({}, { strict: false });
const SkillSchema = new mongoose.Schema({}, { strict: false });
const ProjectSchema = new mongoose.Schema({}, { strict: false });
const PostSchema = new mongoose.Schema({}, { strict: false });
const TestimonialSchema = new mongoose.Schema({}, { strict: false });
const FaqSchema = new mongoose.Schema({}, { strict: false });
const SocialLinkSchema = new mongoose.Schema({}, { strict: false });

const collections = [
  { name: "Admin", modelName: "Admin", schema: AdminSchema, collName: "admins" },
  { name: "Hero", modelName: "Hero", schema: HeroSchema, collName: "heroes" },
  { name: "About", modelName: "About", schema: AboutSchema, collName: "abouts" },
  { name: "Experience", modelName: "Experience", schema: ExperienceSchema, collName: "experiences" },
  { name: "Education", modelName: "Education", schema: EducationSchema, collName: "educations" },
  { name: "Skill", modelName: "Skill", schema: SkillSchema, collName: "skills" },
  { name: "Project", modelName: "Project", schema: ProjectSchema, collName: "projects" },
  { name: "Post", modelName: "Post", schema: PostSchema, collName: "posts" },
  { name: "Testimonial", modelName: "Testimonial", schema: TestimonialSchema, collName: "testimonials" },
  { name: "Faq", modelName: "Faq", schema: FaqSchema, collName: "faqs" },
  { name: "SocialLink", modelName: "SocialLink", schema: SocialLinkSchema, collName: "sociallinks" },
];

async function migrate() {
  console.log("\n🚀 Starting Local DB to MongoDB Atlas Migration...");
  console.log(`📍 Local DB URI:  ${LOCAL_URI}`);
  console.log(`🌐 Target Atlas URI: ${TARGET_ATLAS_URI.replace(/:([^@]+)@/, ":****@")}\n`);

  // 1. Connect to Local Connection
  const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
  console.log("✅ Connected to Local MongoDB!");

  // 2. Connect to Atlas Connection
  const atlasConn = await mongoose.createConnection(TARGET_ATLAS_URI).asPromise();
  console.log("✅ Connected to MongoDB Atlas Cluster!\n");

  let totalMigrated = 0;

  for (const item of collections) {
    const LocalModel = localConn.model(item.modelName, item.schema, item.collName);
    const AtlasModel = atlasConn.model(item.modelName, item.schema, item.collName);

    const docs = await LocalModel.find({}).lean();
    console.log(`📦 Collection [${item.collName}]: Found ${docs.length} documents locally.`);

    if (docs.length > 0) {
      // Clear existing records in target Atlas collection to avoid duplicate _id conflicts
      await AtlasModel.deleteMany({});
      await AtlasModel.insertMany(docs);
      console.log(`   └─ Successfully copied ${docs.length} documents to MongoDB Atlas! ✨`);
      totalMigrated += docs.length;
    }
  }

  console.log(`\n🎉 Migration Complete! Successfully transferred ${totalMigrated} total documents to MongoDB Atlas.`);
  
  await localConn.close();
  await atlasConn.close();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Migration failed with error:", err);
  process.exit(1);
});
