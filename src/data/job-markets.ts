/**
 * Global Job Markets — Regional keywords, certifications, and ATS systems
 * for CV optimization across worldwide job markets.
 */

export interface JobMarket {
  id: string;
  name: string;
  region: string;
  certifications: Certification[];
  regionalKeywords: string[];
  popularATS: string[];
}

export interface Certification {
  id: string;
  name: string;
  category: string;
  globallyRecognized: boolean;
}

export const JOB_MARKETS: JobMarket[] = [
  {
    id: "us",
    name: "United States",
    region: "North America",
    certifications: [
      { id: "pmp", name: "PMP", category: "Management", globallyRecognized: true },
      { id: "aws", name: "AWS Certified", category: "Cloud", globallyRecognized: true },
      { id: "cfa", name: "CFA", category: "Finance", globallyRecognized: true },
      { id: "cpa", name: "CPA", category: "Accounting", globallyRecognized: true },
    ],
    regionalKeywords: ["Equal Opportunity", "Diversity", "Remote", "Hybrid", "US Citizen", "Green Card"],
    popularATS: ["Workday", "Greenhouse", "Lever", "iCIMS", "Taleo"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    region: "Europe",
    certifications: [
      { id: "prince2", name: "PRINCE2", category: "Management", globallyRecognized: true },
      { id: "acca", name: "ACCA", category: "Accounting", globallyRecognized: true },
      { id: "cismp", name: "CISMP", category: "Security", globallyRecognized: false },
    ],
    regionalKeywords: ["Right to Work", "Sponsorship", "GDPR", "Civil Service"],
    popularATS: ["Workday", "Greenhouse", "Sage", "BambooHR"],
  },
  {
    id: "eu",
    name: "European Union",
    region: "Europe",
    certifications: [
      { id: "gdpr", name: "GDPR Certified", category: "Compliance", globallyRecognized: true },
      { id: "pmp_eu", name: "PMP", category: "Management", globallyRecognized: true },
      { id: "ceh", name: "CEH", category: "Security", globallyRecognized: true },
    ],
    regionalKeywords: ["GDPR", "EU Citizen", "Work Permit", "Blue Card", "English Proficiency"],
    popularATS: ["Workday", "SAP SuccessFactors", "Personio", "Greenhouse"],
  },
  {
    id: "gcc",
    name: "GCC Countries",
    region: "Middle East",
    certifications: [
      { id: "pmp_gcc", name: "PMP", category: "Management", globallyRecognized: true },
      { id: "scfhs", name: "SCFHS", category: "Healthcare", globallyRecognized: false },
      { id: "dha", name: "DHA", category: "Healthcare", globallyRecognized: false },
    ],
    regionalKeywords: ["Vision 2030", "Transferable", "Visa Status", "Nationality", "Arabic Speaking"],
    popularATS: ["Bayt", "LinkedIn", "GulfTalent", "Workday"],
  },
  {
    id: "asia",
    name: "Asia Pacific",
    region: "Asia",
    certifications: [
      { id: "pmp_asia", name: "PMP", category: "Management", globallyRecognized: true },
      { id: "cfa_asia", name: "CFA", category: "Finance", globallyRecognized: true },
      { id: "aws_asia", name: "AWS Certified", category: "Cloud", globallyRecognized: true },
    ],
    regionalKeywords: ["Work Visa", "English Proficiency", "Mandarin", "Japanese", "Singapore PR"],
    popularATS: ["JobStreet", "LinkedIn", "Indeed", "Workday"],
  },
  {
    id: "global",
    name: "Global / Remote",
    region: "Worldwide",
    certifications: [
      { id: "pmp_global", name: "PMP", category: "Management", globallyRecognized: true },
      { id: "aws_global", name: "AWS Certified", category: "Cloud", globallyRecognized: true },
      { id: "gcp_global", name: "Google Cloud", category: "Cloud", globallyRecognized: true },
      { id: "cfa_global", name: "CFA", category: "Finance", globallyRecognized: true },
      { id: "cpa_global", name: "CPA", category: "Accounting", globallyRecognized: true },
    ],
    regionalKeywords: ["Remote", "Distributed", "Async", "Global", "Work From Anywhere"],
    popularATS: ["Workday", "Greenhouse", "Lever", "Ashby", "BambooHR"],
  },
];

export const ATS_SYSTEMS = [
  { id: "workday", name: "Workday", description: "Enterprise HR platform" },
  { id: "greenhouse", name: "Greenhouse", description: "Hiring optimization platform" },
  { id: "taleo", name: "Oracle Taleo", description: "Oracle ATS system" },
  { id: "icims", name: "iCIMS", description: "Talent acquisition platform" },
  { id: "lever", name: "Lever", description: "Modern recruiting platform" },
  { id: "bamboo", name: "BambooHR", description: "HR management system" },
  { id: "ashby", name: "Ashby", description: "Modern recruiting CRM" },
  { id: "sap", name: "SAP SuccessFactors", description: "SAP HR platform" },
  { id: "personio", name: "Personio", description: "European HR platform" },
];
