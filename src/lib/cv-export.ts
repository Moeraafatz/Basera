/**
 * CV Export — Generate ATS-safe and Visual CV versions
 * Supports PDF, DOCX, and plain text export
 */

import { CVData, CVExperience, CVEducation, CVSkill } from "@/store/cv-store";

export interface ExportOptions {
  format: "txt" | "html" | "json";
  template: string;
  language: "ar" | "en";
}

export function exportToText(data: CVData, language: "ar" | "en"): string {
  const lines: string[] = [];

  // Personal Info
  lines.push(data.personal.fullName || "");
  lines.push(`${data.personal.email} | ${data.personal.phone} | ${data.personal.location}`);
  if (data.personal.nationality) lines.push(`${language === "ar" ? "الجنسية" : "Nationality"}: ${data.personal.nationality}`);
  if (data.personal.dateOfBirth) lines.push(`${language === "ar" ? "تاريخ الميلاد" : "Date of Birth"}: ${data.personal.dateOfBirth}`);
  if (data.personal.visaStatus) lines.push(`${language === "ar" ? "حالة التأشيرة" : "Visa Status"}: ${data.personal.visaStatus}`);
  lines.push("");

  // Summary
  if (data.summary) {
    lines.push(language === "ar" ? "الملخص المهني" : "PROFESSIONAL SUMMARY");
    lines.push(data.summary);
    lines.push("");
  }

  // Experience
  if (data.experience.length > 0) {
    lines.push(language === "ar" ? "الخبرة العملية" : "WORK EXPERIENCE");
    data.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company}`);
      lines.push(`${exp.startDate} — ${exp.current ? (language === "ar" ? "حتى الآن" : "Present") : exp.endDate}`);
      if (exp.description) lines.push(exp.description);
      exp.achievements.forEach((a) => lines.push(`• ${a}`));
      lines.push("");
    });
  }

  // Education
  if (data.education.length > 0) {
    lines.push(language === "ar" ? "التعليم" : "EDUCATION");
    data.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field}`);
      lines.push(`${edu.institution} | ${edu.startDate} — ${edu.endDate}`);
      if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
      lines.push("");
    });
  }

  // Skills
  if (data.skills.length > 0) {
    lines.push(language === "ar" ? "المهارات" : "SKILLS");
    data.skills.forEach((skill) => {
      lines.push(`• ${skill.name} (${skill.level})`);
    });
    lines.push("");
  }

  // Certifications
  if (data.certifications.length > 0) {
    lines.push(language === "ar" ? "الشهادات" : "CERTIFICATIONS");
    data.certifications.forEach((cert) => {
      lines.push(`• ${cert.name} — ${cert.issuer} (${cert.date})`);
    });
    lines.push("");
  }

  // Languages
  if (data.languages.length > 0) {
    lines.push(language === "ar" ? "اللغات" : "LANGUAGES");
    data.languages.forEach((lang) => {
      lines.push(`• ${lang.language}: ${lang.proficiency}`);
    });
    lines.push("");
  }

  return lines.join("\n");
}

export function exportToHTML(data: CVData, language: "ar" | "en", template: string): string {
  const isRTL = language === "ar";
  const dir = isRTL ? "rtl" : "ltr";

  return `<!DOCTYPE html>
<html lang="${language}" dir="${dir}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.personal.fullName} - CV</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "'Inter', sans-serif"}; line-height: 1.6; color: #191919; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 18px; margin: 24px 0 12px; padding-bottom: 8px; border-bottom: 2px solid #CC785C; }
    h3 { font-size: 16px; margin: 12px 0 4px; }
    p { margin: 8px 0; }
    ul { margin: 8px 0 8px ${isRTL ? "0" : "20px"}; }
    li { margin: 4px 0; }
    .contact { color: #666663; font-size: 14px; margin-bottom: 16px; }
    .date { color: #91918D; font-size: 14px; }
    .skill-tag { display: inline-block; background: #F0F0EB; padding: 4px 12px; border-radius: 16px; margin: 4px; font-size: 14px; }
    .cert { margin: 8px 0; }
  </style>
</head>
<body>
  <h1>${data.personal.fullName}</h1>
  <div class="contact">
    ${data.personal.email} | ${data.personal.phone} | ${data.personal.location}
    ${data.personal.nationality ? `<br>${isRTL ? "الجنسية" : "Nationality"}: ${data.personal.nationality}` : ""}
    ${data.personal.visaStatus ? `<br>${isRTL ? "حالة التأشيرة" : "Visa Status"}: ${data.personal.visaStatus}` : ""}
  </div>

  ${data.summary ? `
    <h2>${isRTL ? "الملخص المهني" : "PROFESSIONAL SUMMARY"}</h2>
    <p>${data.summary}</p>
  ` : ""}

  ${data.experience.length > 0 ? `
    <h2>${isRTL ? "الخبرة العملية" : "WORK EXPERIENCE"}</h2>
    ${data.experience.map((exp) => `
      <h3>${exp.role}</h3>
      <p><strong>${exp.company}</strong> <span class="date">${exp.startDate} — ${exp.current ? (isRTL ? "حتى الآن" : "Present") : exp.endDate}</span></p>
      ${exp.description ? `<p>${exp.description}</p>` : ""}
      ${exp.achievements.length > 0 ? `<ul>${exp.achievements.map((a) => `<li>${a}</li>`).join("")}</ul>` : ""}
    `).join("")}
  ` : ""}

  ${data.education.length > 0 ? `
    <h2>${isRTL ? "التعليم" : "EDUCATION"}</h2>
    ${data.education.map((edu) => `
      <h3>${edu.degree} in ${edu.field}</h3>
      <p><strong>${edu.institution}</strong> <span class="date">${edu.startDate} — ${edu.endDate}</span></p>
      ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ""}
    `).join("")}
  ` : ""}

  ${data.skills.length > 0 ? `
    <h2>${isRTL ? "المهارات" : "SKILLS"}</h2>
    <div>
      ${data.skills.map((skill) => `<span class="skill-tag">${skill.name}</span>`).join("")}
    </div>
  ` : ""}

  ${data.certifications.length > 0 ? `
    <h2>${isRTL ? "الشهادات" : "CERTIFICATIONS"}</h2>
    ${data.certifications.map((cert) => `
      <div class="cert"><strong>${cert.name}</strong> — ${cert.issuer} (${cert.date})</div>
    `).join("")}
  ` : ""}

  ${data.languages.length > 0 ? `
    <h2>${isRTL ? "اللغات" : "LANGUAGES"}</h2>
    ${data.languages.map((lang) => `<p>${lang.language}: ${lang.proficiency}</p>`).join("")}
  ` : ""}
</body>
</html>`;
}

export async function downloadCV(data: CVData, options: ExportOptions): Promise<void> {
  let content: string;
  let mimeType: string;
  let extension: string;

  switch (options.format) {
    case "txt":
      content = exportToText(data, options.language);
      mimeType = "text/plain";
      extension = "txt";
      break;
    case "html":
      content = exportToHTML(data, options.language, options.template);
      mimeType = "text/html";
      extension = "html";
      break;
    case "json":
      content = JSON.stringify(data, null, 2);
      mimeType = "application/json";
      extension = "json";
      break;
    default:
      content = exportToText(data, options.language);
      mimeType = "text/plain";
      extension = "txt";
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.personal.fullName || "CV"}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
