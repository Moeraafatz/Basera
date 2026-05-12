"use client";

import { motion, useInView } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const SECTIONS = [
  {
    id: "information-collection",
    icon: Eye,
    gradient: "from-violet-500 to-purple-500",
    title: "Information We Collect",
    content: `We collect information you provide directly when you use our services, including:

• Text inputs you enter when using our prompt generation tools
• Settings and preferences you select within the application
• Technical data such as browser type, operating system, and device identifiers
• Usage statistics and interaction patterns to improve our services

We do NOT collect or store the AI-generated content beyond your current browser session. No data is permanently stored on our servers.`,
  },
  {
    id: "how-we-use",
    icon: Lock,
    gradient: "from-emerald-500 to-teal-500",
    title: "How We Use Your Information",
    content: `We use collected information for the following purposes:

• To provide and maintain our AI prompt generation services
• To improve, personalize, and optimize user experience
• To analyze usage patterns and develop new features
• To ensure technical stability and security of our platform
• To comply with legal obligations and prevent misuse

Your text inputs are processed in real-time through our AI API providers (OpenRouter/Google Gemini) and are not stored after session completion.`,
  },
  {
    id: "data-sharing",
    icon: FileText,
    gradient: "from-blue-500 to-cyan-500",
    title: "Data Sharing & Third Parties",
    content: `We share minimal information with trusted third-party services:

• AI Processing: Your inputs are sent to OpenRouter API and Google Gemini API for prompt generation. These services have their own privacy policies.
• Analytics: We use anonymous analytics to understand usage patterns and improve performance.
• Infrastructure: Our services are hosted on Vercel, which maintains its own security standards.

We NEVER sell, rent, or trade your personal information to advertisers or marketing companies.`,
  },
  {
    id: "data-security",
    icon: Shield,
    gradient: "from-amber-500 to-orange-500",
    title: "Data Security",
    content: `We implement appropriate security measures to protect your information:

• All data transmission occurs over HTTPS/SSL encrypted connections
• API keys are stored securely in environment variables, never exposed client-side
• We regularly update dependencies to patch potential vulnerabilities
• Access to our infrastructure is restricted and monitored
• Data processing follows industry-standard security practices

While we strive to protect your data, no method of transmission over the internet is 100% secure.`,
  },
  {
    id: "cookies",
    icon: Lock,
    gradient: "from-pink-500 to-rose-500",
    title: "Cookies & Tracking",
    content: `Our website uses minimal cookies and tracking:

• Essential Cookies: Required for basic site functionality and security
• Analytics Cookies: Anonymous usage data to understand how visitors interact with our site
• No Advertising Cookies: We do not use tracking for advertising purposes

You can control cookie preferences through your browser settings. Disabling cookies may affect site functionality.`,
  },
  {
    id: "your-rights",
    icon: Eye,
    gradient: "from-indigo-500 to-violet-500",
    title: "Your Rights",
    content: `You have the following rights regarding your data:

• Access: Request information about what data we collect (limited, as we collect minimal data)
• Portability: Export your preferences and settings
• Erasure: Request deletion of your data (contact us)
• Object: Object to certain types of processing
• Restrict: Limit how we process your data

To exercise these rights, please contact us at the email provided below. We respond to all legitimate requests within 30 days.`,
  },
  {
    id: "data-retention",
    icon: FileText,
    gradient: "from-cyan-500 to-blue-500",
    title: "Data Retention",
    content: `We retain data only for as long as necessary:

• Session Data: Cleared immediately when you close your browser
• Analytics: Aggregated, anonymous data retained for up to 26 months
• Support Communications: Retained for 12 months after resolution
• Legal Compliance: Data retained longer if required by law

When data is no longer needed, it is securely deleted or anonymized.`,
  },
  {
    id: "international",
    icon: Shield,
    gradient: "from-teal-500 to-emerald-500",
    title: "International Data Transfers",
    content: `Your data may be processed internationally:

• Our services are hosted on servers primarily in the United States
• AI API providers (OpenRouter, Google) may process data in various global locations
• All international transfers comply with applicable data protection regulations
• Adequate safeguards are in place for cross-border data transfers

By using our services, you consent to such international data processing.`,
  },
  {
    id: "childrens-privacy",
    icon: Lock,
    gradient: "from-purple-500 to-pink-500",
    title: "Children's Privacy",
    content: `Our services are not intended for children under 13:

• We do not knowingly collect data from children under 13
• If we discover inadvertent collection of children's data, we will delete it immediately
• Parents who believe their child has provided data should contact us

Users must be 13 years or older to use Prompt Engineer.`,
  },
  {
    id: "changes-policy",
    icon: FileText,
    gradient: "from-rose-500 to-pink-500",
    title: "Policy Updates",
    content: `We may update this Privacy Policy periodically:

• Changes are effective when posted on this page
• Significant changes will be indicated by updated "Last Updated" date
• We encourage periodic review of this policy
• Continued use of services after changes constitutes acceptance

Previous versions are archived and available upon request.`,
  },
  {
    id: "contact",
    icon: Mail,
    gradient: "from-violet-600 to-purple-600",
    title: "Contact Us",
    content: `For privacy-related questions or concerns:

• Email: privacy@prompt.engineer
• Response Time: Within 48 hours
• We take all privacy complaints seriously and investigate promptly

We are committed to resolving your concerns and ensuring your data is handled responsibly.`,
  },
];

export default function PrivacyPolicyPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(124,58,237,0.1),transparent_40%)]" />

      <motion.div
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-violet-400/20 to-purple-400/20 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-to-br from-pink-400/20 to-rose-400/20 rounded-full blur-3xl"
        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Shield className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Legal</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy matters to us. Learn how we collect, use, and protect your data.
          </p>
          <p className="text-sm text-gray-400 mt-4">Last Updated: May 12, 2026</p>
        </motion.div>

        <div className="space-y-6">
          {SECTIONS.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (index % 4) }}
              >
                <div className="bg-white/80 backdrop-blur rounded-2xl border-0 shadow-xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${section.gradient} p-4`}>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h2 className="text-white font-semibold text-lg">{section.title}</h2>
                        <p className="text-white/70 text-sm capitalize">{section.id.replace(/-/g, " ")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="prose prose-gray max-w-none">
                      {section.content.split("\n\n").map((paragraph, pIndex) => (
                        <p key={pIndex} className={`text-gray-700 leading-relaxed mb-4 ${paragraph.startsWith("•") ? "pl-4" : ""}`}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions?</h3>
            <p className="text-gray-600 mb-4">If you have any questions about this Privacy Policy, please contact us.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
            >
              Return to Home
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}