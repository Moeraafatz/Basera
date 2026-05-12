"use client";

import { motion, useInView } from "framer-motion";
import { FileText, Scale, AlertTriangle, Users, Globe, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const SECTIONS = [
  {
    id: "acceptance",
    icon: FileText,
    gradient: "from-violet-500 to-purple-500",
    title: "Acceptance of Terms",
    content: `By accessing and using Prompt Engineer ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.

• Access to the Service constitutes your acceptance of these Terms
• We may modify these Terms at any time; continued use indicates acceptance
• It is your responsibility to review Terms periodically for changes
• Minor updates may be made without explicit notice`,
  },
  {
    id: "service-description",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
    title: "Description of Service",
    content: `Prompt Engineer provides free AI prompt generation tools:

• AI-powered prompt generation using third-party APIs (OpenRouter, Google Gemini)
• Prompt library with categorized prompts across various topics
• Tools for enhancing, checking, and humanizing AI-generated content
• Regular updates and improvements to service functionality

The Service is provided "as-is" without warranties of any kind.`,
  },
  {
    id: "user-obligations",
    icon: Users,
    gradient: "from-blue-500 to-cyan-500",
    title: "User Obligations",
    content: `As a user of Prompt Engineer, you agree to:

• Use the Service only for lawful purposes and in accordance with these Terms
• Not use the Service to generate harmful, illegal, or offensive content
• Not attempt to gain unauthorized access to our systems or other users' data
• Not interfere with the proper functioning of the Service
• Comply with all applicable laws and regulations when using our tools

You are responsible for all activities that occur under your usage.`,
  },
  {
    id: "intellectual-property",
    icon: Scale,
    gradient: "from-amber-500 to-orange-500",
    title: "Intellectual Property Rights",
    content: `Regarding ownership and rights:

• You retain ownership of content you input into the Service
• AI-generated content may be used freely for personal and commercial purposes
• Our website design, logos, and original content are our property
• You may not copy, modify, or redistribute our proprietary elements
• Trademarks of third-party AI providers belong to their respective owners

We respect others' intellectual property and expect users to do the same.`,
  },
  {
    id: "prohibited-uses",
    icon: AlertTriangle,
    gradient: "from-pink-500 to-rose-500",
    title: "Prohibited Uses",
    content: `You may NOT use the Service to:

• Generate content that is illegal, harmful, or discriminatory
• Create spam, malware, or malicious code
• Infringe on intellectual property rights of others
• Generate content for fraudulent or deceptive purposes
• Attempt to reverse engineer or extract underlying AI models
• Use automated systems to access the Service without permission
• Harass, abuse, or threaten other users or entities

Violations may result in immediate termination of access.`,
  },
  {
    id: "service-availability",
    icon: Globe,
    gradient: "from-indigo-500 to-violet-500",
    title: "Service Availability",
    content: `We strive for uninterrupted service but cannot guarantee:

• 100% uptime or continuous availability
• Uninterrupted access to AI generation features
• Specific response times or generation speeds
• Availability of specific AI models or features

We may modify, suspend, or discontinue services at any time with reasonable notice.`,
  },
  {
    id: "third-party-services",
    icon: FileText,
    gradient: "from-cyan-500 to-blue-500",
    title: "Third-Party Services",
    content: `Our Service depends on third-party providers:

• AI processing is handled by OpenRouter and Google Gemini APIs
• These providers have their own terms and privacy policies
• We are not responsible for the actions or policies of third parties
• Service quality depends on third-party API availability and performance
• Changes to third-party services may affect our functionality

We encourage review of third-party terms before using our Service.`,
  },
  {
    id: "limitation-liability",
    icon: Scale,
    gradient: "from-teal-500 to-emerald-500",
    title: "Limitation of Liability",
    content: `To the extent permitted by law:

• The Service is provided "as-is" without warranties of any kind
• We are not liable for any direct, indirect, or consequential damages
• We do not guarantee the accuracy or reliability of AI-generated content
• User-generated content is the sole responsibility of the user
• We are not responsible for any loss of data or business interruption
• Liability is limited to the maximum extent permitted by applicable law

Some jurisdictions may not allow liability limitations; this may not apply to you.`,
  },
  {
    id: "indemnification",
    icon: AlertTriangle,
    gradient: "from-purple-500 to-pink-500",
    title: "Indemnification",
    content: `You agree to indemnify and hold harmless:

• Prompt Engineer, its operators, and affiliates
• From any claims arising from your use of the Service
• From any violation of these Terms or applicable laws
• From any content you generate using our tools

This includes reasonable attorney fees and legal costs associated with claims.`,
  },
  {
    id: "termination",
    icon: Users,
    gradient: "from-rose-500 to-pink-500",
    title: "Termination",
    content: `We reserve the right to:

• Terminate or suspend access to the Service at any time
• Remove or modify content that violates these Terms
• Ban users who repeatedly violate our policies
• Discontinue the Service with reasonable notice

You may stop using the Service at any time. We may retain certain data as required by law.`,
  },
  {
    id: "governing-law",
    icon: Scale,
    gradient: "from-violet-600 to-purple-600",
    title: "Governing Law & Disputes",
    content: `These Terms are governed by:

• Applicable laws of the jurisdiction in which we operate
• Any disputes shall be resolved through binding arbitration
• Class action waivers apply to all users
• Informal resolution attempts should be made before legal action
• Courts in our primary jurisdiction have exclusive authority over disputes

By using our Service, you consent to these dispute resolution terms.`,
  },
  {
    id: "contact",
    icon: Mail,
    gradient: "from-emerald-600 to-teal-600",
    title: "Contact Information",
    content: `For questions or concerns regarding these Terms:

• Email: legal@prompt.engineer
• Response Time: Within 48 hours
• We welcome feedback on our Terms and policies

We are committed to addressing your concerns promptly and professionally.`,
  },
];

export default function TermsOfServicePage() {
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
            <Scale className="h-4 w-4 text-violet-600" />
            <span className="text-sm font-medium text-violet-700">Legal</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms of <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-gray-400 mt-4">Effective: May 12, 2026</p>
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
            <p className="text-gray-600 mb-4">If you have any questions about these Terms, please contact us.</p>
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