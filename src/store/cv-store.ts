import { create } from "zustand";
import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/store/auth-store";

export interface CVExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface CVEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface CVSkill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

export interface CVCertification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
}

export interface CVLanguage {
  id: string;
  language: string;
  proficiency: "basic" | "intermediate" | "fluent" | "native";
}

export interface CVProject {
  id: string;
  name: string;
  description: string;
  role: string;
  technologies: string[];
  url?: string;
}

export interface CVPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  portfolio?: string;
  nationality?: string;
  dateOfBirth?: string;
  visaStatus?: string;
  maritalStatus?: string;
  targetMarket?: string;
  workAuth?: string;
  workPreference?: string;
}

export interface CVVersion {
  id: string;
  timestamp: number;
  templateId: string;
  data: CVData;
  score: number;
}

export interface CVData {
  personal: CVPersonalInfo;
  summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  certifications: CVCertification[];
  languages: CVLanguage[];
  projects: CVProject[];
}

export interface CVStore {
  // Current CV data
  data: CVData;
  updatePersonal: (personal: Partial<CVPersonalInfo>) => void;
  updateSummary: (summary: string) => void;
  addExperience: (exp: Omit<CVExperience, "id">) => void;
  updateExperience: (id: string, exp: Partial<CVExperience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Omit<CVEducation, "id">) => void;
  updateEducation: (id: string, edu: Partial<CVEducation>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Omit<CVSkill, "id">) => void;
  updateSkill: (id: string, skill: Partial<CVSkill>) => void;
  removeSkill: (id: string) => void;
  addCertification: (cert: Omit<CVCertification, "id">) => void;
  updateCertification: (id: string, cert: Partial<CVCertification>) => void;
  removeCertification: (id: string) => void;
  addLanguage: (lang: Omit<CVLanguage, "id">) => void;
  updateLanguage: (id: string, lang: Partial<CVLanguage>) => void;
  removeLanguage: (id: string) => void;
  addProject: (project: Omit<CVProject, "id">) => void;
  updateProject: (id: string, project: Partial<CVProject>) => void;
  removeProject: (id: string) => void;

  // Template
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;

  // Analysis
  atsScore: number | null;
  setAtsScore: (score: number | null) => void;
  analysisFeedback: string[];
  setAnalysisFeedback: (feedback: string[]) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;

  // Versions
  versions: CVVersion[];
  addVersion: () => void;
  loadVersion: (id: string) => void;
  currentVersionId: string | null;

  // Upload
  uploadedFile: File | null;
  setUploadedFile: (file: File | null) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;

  // Export
  isExporting: boolean;
  setIsExporting: (value: boolean) => void;

  // Supabase sync
  syncToSupabase: () => Promise<void>;
  loadFromSupabase: () => Promise<void>;
  isSyncing: boolean;
}

const defaultPersonal: CVPersonalInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  nationality: "",
  dateOfBirth: "",
  visaStatus: "",
  maritalStatus: "",
  targetMarket: "global",
  workAuth: "",
  workPreference: "",
};

const defaultData: CVData = {
  personal: defaultPersonal,
  summary: "",
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  languages: [],
  projects: [],
};

export const useCVStore = create<CVStore>()((set, get) => ({
  data: defaultData,

  updatePersonal: (personal) => set((state) => ({
    data: { ...state.data, personal: { ...state.data.personal, ...personal } },
  })),

  updateSummary: (summary) => set((state) => ({
    data: { ...state.data, summary },
  })),

  addExperience: (exp) => set((state) => ({
    data: {
      ...state.data,
      experience: [...state.data.experience, { ...exp, id: `exp-${Date.now()}` }],
    },
  })),

  updateExperience: (id, exp) => set((state) => ({
    data: {
      ...state.data,
      experience: state.data.experience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
    },
  })),

  removeExperience: (id) => set((state) => ({
    data: {
      ...state.data,
      experience: state.data.experience.filter((e) => e.id !== id),
    },
  })),

  addEducation: (edu) => set((state) => ({
    data: {
      ...state.data,
      education: [...state.data.education, { ...edu, id: `edu-${Date.now()}` }],
    },
  })),

  updateEducation: (id, edu) => set((state) => ({
    data: {
      ...state.data,
      education: state.data.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
    },
  })),

  removeEducation: (id) => set((state) => ({
    data: {
      ...state.data,
      education: state.data.education.filter((e) => e.id !== id),
    },
  })),

  addSkill: (skill) => set((state) => ({
    data: {
      ...state.data,
      skills: [...state.data.skills, { ...skill, id: `skill-${Date.now()}` }],
    },
  })),

  updateSkill: (id, skill) => set((state) => ({
    data: {
      ...state.data,
      skills: state.data.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    },
  })),

  removeSkill: (id) => set((state) => ({
    data: {
      ...state.data,
      skills: state.data.skills.filter((s) => s.id !== id),
    },
  })),

  addCertification: (cert) => set((state) => ({
    data: {
      ...state.data,
      certifications: [...state.data.certifications, { ...cert, id: `cert-${Date.now()}` }],
    },
  })),

  updateCertification: (id, cert) => set((state) => ({
    data: {
      ...state.data,
      certifications: state.data.certifications.map((c) => (c.id === id ? { ...c, ...cert } : c)),
    },
  })),

  removeCertification: (id) => set((state) => ({
    data: {
      ...state.data,
      certifications: state.data.certifications.filter((c) => c.id !== id),
    },
  })),

  addLanguage: (lang) => set((state) => ({
    data: {
      ...state.data,
      languages: [...state.data.languages, { ...lang, id: `lang-${Date.now()}` }],
    },
  })),

  updateLanguage: (id, lang) => set((state) => ({
    data: {
      ...state.data,
      languages: state.data.languages.map((l) => (l.id === id ? { ...l, ...lang } : l)),
    },
  })),

  removeLanguage: (id) => set((state) => ({
    data: {
      ...state.data,
      languages: state.data.languages.filter((l) => l.id !== id),
    },
  })),

  addProject: (project) => set((state) => ({
    data: {
      ...state.data,
      projects: [...state.data.projects, { ...project, id: `proj-${Date.now()}` }],
    },
  })),

  updateProject: (id, project) => set((state) => ({
    data: {
      ...state.data,
      projects: state.data.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    },
  })),

  removeProject: (id) => set((state) => ({
    data: {
      ...state.data,
      projects: state.data.projects.filter((p) => p.id !== id),
    },
  })),

  selectedTemplate: "ats-classic",
  setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),

  atsScore: null,
  setAtsScore: (score) => set({ atsScore: score }),
  analysisFeedback: [],
  setAnalysisFeedback: (feedback) => set({ analysisFeedback: feedback }),
  isAnalyzing: false,
  setIsAnalyzing: (value) => set({ isAnalyzing: value }),

  versions: [],
  addVersion: () => set((state) => {
    const version = {
      id: `v-${Date.now()}`,
      timestamp: Date.now(),
      templateId: state.selectedTemplate,
      data: state.data,
      score: state.atsScore || 0,
    };
    return {
      versions: [...state.versions, version],
      currentVersionId: version.id,
    };
  }),
  loadVersion: (id) => set((state) => {
    const version = state.versions.find((v) => v.id === id);
    if (!version) return {};
    return {
      data: version.data,
      selectedTemplate: version.templateId,
      atsScore: version.score,
      currentVersionId: id,
    };
  }),
  currentVersionId: null,

  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  isUploading: false,
  setIsUploading: (value) => set({ isUploading: value }),

  isExporting: false,
  setIsExporting: (value) => set({ isExporting: value }),

  isSyncing: false,

  syncToSupabase: async () => {
    const supabase = createClient();
    const user = useAuthStore.getState().user;
    if (!supabase || !user) return;

    set({ isSyncing: true });
    const state = get();
    const { data: existing } = await supabase
      .from("cvs")
      .select("id")
      .eq("user_id", user.id)
      .limit(1);

    const cvData = {
      personal_info: state.data.personal,
      summary: state.data.summary,
      experience: state.data.experience,
      education: state.data.education,
      skills: state.data.skills,
      certifications: state.data.certifications,
      languages: state.data.languages,
      projects: state.data.projects,
      ats_score: state.atsScore,
      template_id: state.selectedTemplate,
    };

    if (existing && existing.length > 0) {
      await supabase.from("cvs").update(cvData).eq("id", existing[0].id);
    } else {
      await supabase.from("cvs").insert({ user_id: user.id, ...cvData });
    }

    set({ isSyncing: false });
  },

  loadFromSupabase: async () => {
    const supabase = createClient();
    const user = useAuthStore.getState().user;
    if (!supabase || !user) return;

    set({ isSyncing: true });
    const { data } = await supabase
      .from("cvs")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(1);

    if (data && data.length > 0) {
      const cv = data[0];
      set({
        data: {
          personal: cv.personal_info || defaultPersonal,
          summary: cv.summary || "",
          experience: cv.experience || [],
          education: cv.education || [],
          skills: cv.skills || [],
          certifications: cv.certifications || [],
          languages: cv.languages || [],
          projects: cv.projects || [],
        },
        selectedTemplate: cv.template_id || "ats-classic",
        atsScore: cv.ats_score || null,
      });
    }

    set({ isSyncing: false });
  },
}));
