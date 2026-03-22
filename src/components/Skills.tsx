import { AnimatePresence, motion } from "motion/react";
import { useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Code,
  Wrench,
  Database,
  Lightbulb,
  ChevronDown,
} from "lucide-react";

type FilterType = "all" | "fullstack" | "devops" | "backend" | "frontend";

interface SkillsProps {
  reduceMotion?: boolean;
}

export function Skills({ reduceMotion = false }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const skillCategories = [
    {
      title: "Languages",
      icon: Code,
      skills: [
        {
          name: "TypeScript",
          use: "Typed React applications, scalable UI code, safer API integration",
          tags: ["fullstack", "frontend"],
        },
        {
          name: "JavaScript",
          use: "Frontend interactivity, component logic, modern web applications",
          tags: ["fullstack", "frontend"],
        },
        {
          name: "Python",
          use: "Automation scripts, backend utilities, reporting workflows",
          tags: ["fullstack", "backend", "devops"],
        },
        {
          name: "SQL",
          use: "Database queries, data modeling, reporting pipelines",
          tags: ["fullstack", "backend"],
        },
        {
          name: "HTML/CSS",
          use: "Responsive layouts, semantic markup, polished UI delivery",
          tags: ["fullstack", "frontend"],
        },
        {
          name: "C / C++",
          use: "System programming, performance-focused problem solving",
          tags: ["backend"],
        },
        {
          name: "Java",
          use: "Object-oriented programming, backend fundamentals, Spring-based services",
          tags: ["backend", "fullstack"],
        },
        {
          name: "PHP",
          use: "Server-side scripting and web application fundamentals",
          tags: ["backend", "fullstack"],
        },
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Frameworks & Tools",
      icon: Wrench,
      skills: [
        {
          name: "React",
          use: "Component-based frontend development, reusable UI, production web features",
          tags: ["frontend", "fullstack"],
        },
        {
          name: "Spring Boot",
          use: "REST APIs, backend services, scalable Java applications",
          tags: ["backend", "fullstack"],
        },
        {
          name: "Git / GitHub",
          use: "Version control, pull requests, collaborative development workflows",
          tags: ["fullstack", "devops", "backend", "frontend"],
        },
        {
          name: "GitHub Actions",
          use: "CI/CD workflows for linting, testing, preview deploys, and release automation",
          tags: ["devops", "fullstack"],
        },
        {
          name: "Docker",
          use: "Containerization, standardized environments, portable deployment workflows",
          tags: ["devops", "backend", "fullstack"],
        },
        {
          name: "Jenkins",
          use: "Build automation, CI pipelines, deployment workflow support",
          tags: ["devops"],
        },
        {
          name: "Azure DevOps",
          use: "Delivery workflows, build/release practices, DevOps-aligned engineering",
          tags: ["devops"],
        },
        {
          name: "Power Platform",
          use: "Business automation, low-code apps, workflow digitization",
          tags: ["fullstack", "devops"],
        },
        {
          name: "Power Apps",
          use: "Low-code app development, internal tools, business process automation",
          tags: ["fullstack"],
        },
        {
          name: "Power Automate",
          use: "Workflow automation, data transfer automation, process orchestration",
          tags: ["fullstack", "devops"],
        },
        {
          name: "VS Code",
          use: "Development environment, extensions, debugging, day-to-day coding workflow",
          tags: ["fullstack", "frontend", "backend"],
        },
        {
          name: "WordPress",
          use: "Website development, CMS customization, content-driven web delivery",
          tags: ["frontend", "fullstack"],
        },
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Cloud & Database",
      icon: Database,
      skills: [
        {
          name: "Microsoft Azure",
          use: "Cloud services, application hosting, automation support, platform delivery",
          tags: ["devops", "backend"],
        },
        {
          name: "REST APIs",
          use: "Service integration, authentication flows, frontend-backend communication",
          tags: ["fullstack", "backend"],
        },
        {
          name: "MySQL",
          use: "Relational database design, structured storage, application data queries",
          tags: ["backend", "fullstack"],
        },
        {
          name: "CDS / Dataverse",
          use: "Relational data backend for Power Platform applications and workflows",
          tags: ["fullstack", "backend", "devops"],
        },
        {
          name: "Power BI",
          use: "Business intelligence dashboards, stakeholder reporting, KPI visualization",
          tags: ["fullstack", "backend"],
        },
        {
          name: "Tableau",
          use: "Interactive dashboards and data storytelling for operational insights",
          tags: ["fullstack", "backend"],
        },
        {
          name: "Microsoft Access",
          use: "Desktop database workflows and operational data management",
          tags: ["backend"],
        },
      ],
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Concepts",
      icon: Lightbulb,
      skills: [
        {
          name: "Full-Stack Development",
          use: "End-to-end feature delivery across frontend, backend, and integration layers",
          tags: ["fullstack"],
        },
        {
          name: "CI/CD",
          use: "Automated build, test, and deployment pipelines for reliable releases",
          tags: ["devops", "fullstack"],
        },
        {
          name: "Build Automation",
          use: "Reducing manual engineering steps through repeatable automated workflows",
          tags: ["devops"],
        },
        {
          name: "Production Deployment",
          use: "Release readiness, preview environments, and deployment consistency",
          tags: ["devops", "fullstack"],
        },
        {
          name: "API Integration",
          use: "Connecting frontend experiences to backend endpoints and external services",
          tags: ["fullstack", "backend", "frontend"],
        },
        {
          name: "Performance Optimization",
          use: "Code splitting, asset tuning, and page-load improvements",
          tags: ["frontend", "fullstack"],
        },
        {
          name: "Testing",
          use: "Unit checks, validation, regression reduction, and release confidence",
          tags: ["fullstack", "backend", "devops"],
        },
        {
          name: "Troubleshooting",
          use: "Debugging issues through logs, validation, and root-cause analysis",
          tags: ["fullstack", "backend", "devops"],
        },
        {
          name: "SDLC / Agile",
          use: "Sprint-based collaboration, iterative delivery, and team coordination",
          tags: ["fullstack", "devops", "backend", "frontend"],
        },
        {
          name: "OOP",
          use: "Structured software design, reusable logic, and maintainable code organization",
          tags: ["backend", "fullstack"],
        },
      ],
      color: "from-amber-500 to-orange-500",
    },
  ] as const;

  const filters = [
    { id: "all" as FilterType, label: "All" },
    { id: "fullstack" as FilterType, label: "Full-Stack" },
    { id: "devops" as FilterType, label: "DevOps" },
    { id: "backend" as FilterType, label: "Backend" },
    { id: "frontend" as FilterType, label: "Frontend" },
  ];

  const filteredCategories = useMemo(() => {
    return skillCategories
      .map((cat) => {
        const visibleSkills =
          activeFilter === "all"
            ? [...cat.skills]
            : cat.skills.filter((s) => s.tags.includes(activeFilter));
        return { ...cat, visibleSkills };
      })
      .filter((cat) => activeFilter === "all" || cat.visibleSkills.length > 0);
  }, [activeFilter]);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      for (const c of skillCategories) initial[c.title] = false;
      return initial;
    },
  );

  useEffect(() => {
    if (activeFilter === "all") return;

    setOpenCategories(() => {
      const next: Record<string, boolean> = {};
      skillCategories.forEach((c) => {
        next[c.title] = c.skills.some((s) => s.tags.includes(activeFilter));
      });
      return next;
    });
  }, [activeFilter]);

  const toggleCategory = (title: string) => {
    setOpenCategories((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <h2 className="text-5xl font-bold text-white mb-3">Technical Skills</h2>
          <p className="text-gray-400 text-lg mb-7">
            Modern stack. Clean delivery. Strong engineering fundamentals.
          </p>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeFilter === filter.id
                    ? "bg-[#0078d4] text-white shadow-lg shadow-[#0078d4]/40"
                    : "glass text-gray-400 hover:text-white hover:border-[#0078d4]/50"
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div ref={ref} className="space-y-4">
          {filteredCategories.map((category, idx) => {
            const Icon = category.icon;
            const isOpen = !!openCategories[category.title];
            const buttonId = `skills-accordion-btn-${idx}`;
            const panelId = `skills-accordion-panel-${idx}`;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="relative overflow-hidden rounded-2xl glass p-5 hover:border-[#0078d4]/70 transition-all"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-[0.03]`}
                />

                <h3 className="relative z-10">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color}`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>

                      <div className="flex items-baseline gap-3">
                        <span className="text-xl text-white">{category.title}</span>
                        <span className="text-xs text-gray-400 px-2 py-1 rounded-full border border-white/10 bg-white/5">
                          {category.visibleSkills.length} skill
                          {category.visibleSkills.length === 1 ? "" : "s"}
                        </span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-300 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="pt-4 flex flex-wrap gap-3">
                        {category.visibleSkills.map((skill) => (
                          <div key={skill.name} className="relative group">
                            <button
                              type="button"
                              className="px-4 py-2 rounded-full border border-white/10 bg-[#252836]/45 text-white text-sm hover:border-[#0078d4]/60 hover:bg-[#252836]/70 transition"
                              aria-label={`${skill.name}. Hover for details.`}
                            >
                              {skill.name}
                            </button>

                            <div
                              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-20 w-72 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150"
                              role="tooltip"
                              aria-describedby={`tooltip-${skill.name.replace(/\s+/g, "-")}`}
                            >
                              <div className="glass-popover rounded-xl p-3 text-sm text-gray-200">
                                <span className="text-[#0078d4] text-xs">
                                  I use this for:{" "}
                                </span>
                                <span className="text-gray-300">{skill.use}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}