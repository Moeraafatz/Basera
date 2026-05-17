/**
 * CV Templates — 18 professional templates for global job markets
 * 8 ATS-safe, 6 Visual, 4 Industry-specific
 */

export interface CVTemplate {
  id: string;
  name?: string;
  nameAr?: string;
  nameEn?: string;
  type: "ats" | "visual" | "industry";
  category: string;
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  isSingleColumn: boolean;
  atsCompatible: boolean;
  preview: string;
}

export const CV_TEMPLATES: CVTemplate[] = [
  // ATS-Safe Templates (8)
  {
    id: "ats-classic",
    name: "Classic ATS",
    type: "ats",
    category: "Professional",
    description: "Clean, professional template compatible with all ATS systems",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "classic",
  },
  {
    id: "ats-minimal",
    name: "Minimal ATS",
    type: "ats",
    category: "Modern",
    description: "Minimalist design focusing on content and achievements",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "minimal",
  },
  {
    id: "ats-executive",
    name: "Executive ATS",
    type: "ats",
    category: "Leadership",
    description: "Template designed for senior leadership and executive roles",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "executive",
  },
  {
    id: "ats-technical",
    name: "Technical ATS",
    type: "ats",
    category: "Technology",
    description: "Template optimized for technical and software roles",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "technical",
  },
  {
    id: "ats-fresh",
    name: "Fresh Graduate",
    type: "ats",
    category: "Entry Level",
    description: "Template for fresh graduates focusing on education and skills",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "fresh",
  },
  {
    id: "ats-healthcare",
    nameAr: "الرعاية الصحية ATS",
    nameEn: "Healthcare ATS",
    type: "ats",
    category: "Healthcare",
    descriptionAr: "قالب مخصص لمهنيي الرعاية الصحية مع تراخيص وشهادات",
    descriptionEn: "Template for healthcare professionals with licenses and certifications",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "healthcare",
  },
  {
    id: "ats-engineering",
    name: "Engineering ATS",
    type: "ats",
    category: "Engineering",
    description: "Template for engineers with projects and technical achievements",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "engineering",
  },
  {
    id: "ats-finance",
    name: "Finance ATS",
    type: "ats",
    category: "Finance",
    description: "Template for accountants and financial analysts",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "finance",
  },

  // Visual Templates (6)
  {
    id: "visual-modern",
    name: "Modern Visual",
    type: "visual",
    category: "Contemporary",
    description: "Contemporary design with elegant visual elements",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "modern",
  },
  {
    id: "visual-creative",
    name: "Creative Visual",
    type: "visual",
    category: "Design",
    description: "Creative design for designers and creative professionals",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "creative",
  },
  {
    id: "visual-elegant",
    name: "Elegant Visual",
    type: "visual",
    category: "Professional",
    description: "Elegant and refined design for professionals",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "elegant",
  },
  {
    id: "visual-bold",
    name: "Bold Visual",
    type: "visual",
    category: "Marketing",
    description: "Bold and eye-catching design",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "bold",
  },
  {
    id: "visual-clean",
    name: "Clean Visual",
    type: "visual",
    category: "Minimal",
    description: "Clean and simple design with white space",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "clean",
  },
  {
    id: "visual-professional",
    name: "Professional Visual",
    type: "visual",
    category: "Corporate",
    description: "Professional design for corporate environments",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "professional",
  },

  // Industry-Specific Templates (4)
  {
    id: "industry-engineering",
    name: "Engineering",
    type: "industry",
    category: "Engineering",
    description: "Specialized template for engineers with projects and technical certifications",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "engineering",
  },
  {
    id: "industry-healthcare",
    name: "Healthcare",
    type: "industry",
    category: "Healthcare",
    description: "Specialized template for healthcare professionals with licenses",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "healthcare",
  },
  {
    id: "industry-creative",
    name: "Creative",
    type: "industry",
    category: "Creative",
    description: "Specialized template for designers with portfolio section",
    isSingleColumn: false,
    atsCompatible: false,
    preview: "creative",
  },
  {
    id: "industry-academic",
    name: "Academic",
    type: "industry",
    category: "Academic",
    description: "Template for academic and research positions with publications",
    isSingleColumn: true,
    atsCompatible: true,
    preview: "academic",
  },
];

export const CV_SECTIONS = [
  { id: "personal", label: "Personal Information" },
  { id: "summary", label: "Professional Summary" },
  { id: "experience", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
  { id: "projects", label: "Projects" },
  { id: "references", label: "References" },
];
