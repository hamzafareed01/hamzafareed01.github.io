import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  ChevronDown,
  Zap,
  TrendingUp,
  Code,
  Cloud,
} from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
  tags: string[];
  logo: string;
  logoAlt: string;
}

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const experiences: ExperienceItem[] = [
    {
      company: "TheCoded Inc",
      role: "Associate Fullstack Developer",
      location: "Remote",
      period: "Oct 2025 – Present",
      bullets: [
        "Delivered production-ready full-stack features from Figma requirements, collaborating across implementation, QA, and release readiness in an Agile workflow.",
        "Improved frontend performance by 28% through code splitting, asset optimization, and page-load tuning, strengthening user experience and delivery quality.",
        "Built and maintained CI/CD pipelines in GitHub Actions for linting, unit tests, and preview deployments, improving release consistency and reducing manual deployment steps.",
        "Integrated REST APIs for authentication and payment workflows, while improving API error handling, debugging, and production reliability."
      ],
      tags: ["React", "TypeScript", "REST APIs", "GitHub Actions", "CI/CD", "Performance", "Azure", "Agile"],
      logo: "/company-logos/thecoded-inc-logo.jpg",
      logoAlt: "TheCoded Inc logo"
    },
    {
      company: "MEA Pack & Ship",
      role: "Platform Engineer",
      location: "Bridgeview, Illinois, United States · Remote",
      period: "May 2023 – Aug 2023",
      bullets: [
        "Built and shipped production web features, collaborating through Git, pull requests, code reviews, and log-based bug resolution across frontend and backend workflows.",
        "Improved build and deployment automation by enhancing CI/CD pipelines with Jenkins/GitHub Actions and Docker-based containerization, helping standardize release workflows.",
        "Automated repetitive operational and reporting tasks with Python scripting, improving reliability, scalability, and reducing manual effort.",
        "Built stakeholder-facing KPI dashboards in Power BI/Tableau using Excel, SQL, and Python datasets, translating operational metrics into actionable business insights."
      ],
      tags: ["Python", "Docker", "Jenkins", "GitHub Actions", "CI/CD", "SQL", "Power BI", "Tableau", "Git"],
      logo: "/company-logos/mea-pack-ship-logo.jpg",
      logoAlt: "MEA Pack & Ship logo"
    },
    {
      company: "TheCoded Inc",
      role: "Associate Developer",
      location: "Remote",
      period: "Mar 2022 – Dec 2022",
      bullets: [
        "Developed workflow automation solutions using Microsoft Power Apps and Power Automate (MS Flow), reducing manual data entry by 92%.",
        "Integrated relational data workflows with CDS/Dataverse and Azure services to improve application functionality, data flow, and operational efficiency.",
        "Performed validation testing, troubleshooting, and log analysis to resolve issues and improve application reliability.",
        "Enabled PDF transcript generation within a school database workflow, improving document portability and process efficiency by 35%."
      ],
      tags: ["Power Apps", "Power Automate", "Azure", "CDS/Dataverse", "Testing", "Troubleshooting", "Workflow Automation"],
      logo: "/company-logos/thecoded-inc-logo.jpg",
      logoAlt: "TheCoded Inc logo"
    }
  ];

  const tagIcons: Record<string, any> = {
    React: Code,
    TypeScript: Code,
    "REST APIs": Code,
    "GitHub Actions": TrendingUp,
    "CI/CD": TrendingUp,
    Performance: Zap,
    Azure: Cloud,
    Agile: TrendingUp,
    Python: Code,
    Docker: Cloud,
    Jenkins: TrendingUp,
    SQL: Code,
    "Power BI": TrendingUp,
    Tableau: TrendingUp,
    Git: Code,
    "Power Apps": Code,
    "Power Automate": Zap,
    "CDS/Dataverse": Cloud,
    Testing: TrendingUp,
    Troubleshooting: Zap,
    "Workflow Automation": Zap,
  };

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-[#0078d4] rounded-full opacity-10 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Experience</h2>
          <p className="text-gray-400 text-lg">
            Building impactful software, platform, and automation solutions
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0078d4] via-[#0078d4]/50 to-transparent"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "top" }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="relative pl-20"
              >
                <motion.div
                  className="absolute left-5 top-6 w-7 h-7 rounded-full bg-[#0a0e27] border-2 border-[#0078d4] flex items-center justify-center"
                  whileHover={{ scale: 1.3 }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#0078d4]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                </motion.div>

                <motion.div
                  className="group relative overflow-hidden rounded-2xl glass p-6 cursor-pointer hover:border-[#0078d4] transition-all duration-300"
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  whileHover={{ y: -5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0078d4]/0 via-[#0078d4]/5 to-[#0078d4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-white border border-white/10 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                          <img
                            src={exp.logo}
                            alt={exp.logoAlt}
                            className="w-full h-full object-contain p-2"
                            loading="lazy"
                          />
                        </div>

                        <div>
                          <h3 className="text-xl text-white mb-1">{exp.role}</h3>
                          <p className="text-[#0078d4] mb-1">{exp.company}</p>
                          <p className="text-sm text-gray-400">
                            {exp.location} • {exp.period}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedIndex === index ? "auto" : 0,
                        opacity: expandedIndex === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10">
                        <ul className="space-y-3 mb-4">
                          {exp.bullets.map((bullet, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={
                                expandedIndex === index
                                  ? { opacity: 1, x: 0 }
                                  : {}
                              }
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-3 text-gray-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#0078d4] mt-2 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">
                                {bullet}
                              </span>
                            </motion.li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, i) => {
                            const Icon = tagIcons[tag] || Zap;
                            return (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                  expandedIndex === index
                                    ? { opacity: 1, scale: 1 }
                                    : {}
                                }
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0078d4]/10 border border-[#0078d4]/30 text-[#0078d4] text-sm"
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {tag}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}