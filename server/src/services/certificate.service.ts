import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";
import { supabaseAdmin } from "../config/supabase";

/**
 * Renders a certificate PDF in memory, uploads it to the `certificates` Supabase
 * Storage bucket, and records it in the `certificates` table. Returns the public URL.
 * Create the storage bucket once via: supabase storage create certificates --public
 */
export async function issueCertificate(params: {
  studentId: string;
  studentName: string;
  title: string;
  issuedFor: string;
}): Promise<{ url: string; verificationCode: string }> {
  const verificationCode = uuidv4().split("-")[0].toUpperCase();

  const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke("#2f6f4f");
    doc.fontSize(10).fillColor("#2f6f4f").text("AYURSETU", 50, 50);
    doc.fontSize(28).fillColor("#1a1a1a").text("Certificate of Achievement", 0, 140, { align: "center" });
    doc.fontSize(14).fillColor("#444").text("This certifies that", 0, 190, { align: "center" });
    doc.fontSize(22).fillColor("#2f6f4f").text(params.studentName, 0, 220, { align: "center" });
    doc
      .fontSize(14)
      .fillColor("#444")
      .text(`has successfully completed: ${params.title}`, 0, 260, { align: "center" });
    doc.fontSize(11).fillColor("#666").text(params.issuedFor, 0, 290, { align: "center" });
    doc
      .fontSize(10)
      .fillColor("#888")
      .text(`Verification code: ${verificationCode}`, 0, doc.page.height - 90, { align: "center" });
    doc.fontSize(10).fillColor("#888").text(new Date().toLocaleDateString("en-IN"), 0, doc.page.height - 75, {
      align: "center",
    });

    doc.end();
  });

  const path = `${params.studentId}/${verificationCode}.pdf`;
  const { error: uploadError } = await supabaseAdmin.storage
    .from("certificates")
    .upload(path, pdfBuffer, { contentType: "application/pdf", upsert: true });

  if (uploadError) throw uploadError;

  const { data: publicUrlData } = supabaseAdmin.storage.from("certificates").getPublicUrl(path);
  const url = publicUrlData.publicUrl;

  const { error: insertError } = await supabaseAdmin.from("certificates").insert({
    student_id: params.studentId,
    title: params.title,
    issued_for: params.issuedFor,
    certificate_url: url,
    verification_code: verificationCode,
  });
  if (insertError) throw insertError;

  return { url, verificationCode };
}
