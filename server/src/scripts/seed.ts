/**
 * Seeds baseline reference data: skills taxonomy + syllabus topics
 * (used by AI quiz generation) and a couple of sample colleges.
 * Run once after applying supabase/schema.sql:  npm run seed
 */
import { supabaseAdmin } from "../config/supabase";

const skills = [
  { name: "Panchakarma Therapy", category: "Clinical" },
  { name: "Ayurvedic Pharmacology (Dravyaguna)", category: "Clinical" },
  { name: "Rasa Shastra (Pharmaceutics)", category: "Clinical" },
  { name: "Clinical Documentation", category: "Digital" },
  { name: "Patient Communication", category: "Communication" },
  { name: "Research Methodology", category: "Research" },
  { name: "Yoga Therapy", category: "Clinical" },
  { name: "Nutrition & Ahara Counselling", category: "Clinical" },
  { name: "Digital Health Records", category: "Digital" },
  { name: "Herbal Quality Testing", category: "Research" },
];

const topics = [
  { title: "Panchakarma: Purvakarma Procedures", subject: "Panchakarma", difficulty: "beginner", skillName: "Panchakarma Therapy" },
  { title: "Rasa, Guna, Virya, Vipaka Basics", subject: "Dravyaguna", difficulty: "beginner", skillName: "Ayurvedic Pharmacology (Dravyaguna)" },
  { title: "Bhasma Preparation Principles", subject: "Rasa Shastra", difficulty: "intermediate", skillName: "Rasa Shastra (Pharmaceutics)" },
  { title: "Writing a Clinical Case Sheet", subject: "Clinical Practice", difficulty: "beginner", skillName: "Clinical Documentation" },
  { title: "Asana & Pranayama for Common Ailments", subject: "Yoga", difficulty: "beginner", skillName: "Yoga Therapy" },
];

async function seed() {
  console.log("Seeding skills...");
  const { data: insertedSkills, error: skillErr } = await supabaseAdmin
    .from("skills")
    .upsert(skills, { onConflict: "name" })
    .select();
  if (skillErr) throw skillErr;

  const skillByName = new Map(insertedSkills!.map((s) => [s.name, s.id]));

  console.log("Seeding topics...");
  for (const t of topics) {
    const skillId = skillByName.get(t.skillName);
    const { error } = await supabaseAdmin.from("topics").insert({
      title: t.title,
      subject: t.subject,
      difficulty: t.difficulty,
      skill_id: skillId,
    });
    if (error) console.error(`Failed to insert topic "${t.title}":`, error.message);
  }

  console.log("Seeding sample college...");
  await supabaseAdmin.from("colleges").upsert(
    [{ name: "All India Institute of Ayurveda (AIIA)", city: "New Delhi", state: "Delhi", affiliation: "AIIA", verified: true }],
    { onConflict: "name" }
  );

  console.log("Done.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
