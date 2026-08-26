import MagicCard from "../MagicUI/MagicCard";
import { useState } from "react";

export function About() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // RetroGrid background component
  const RetroGrid = ({ className }: { className?: string }) => (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(200px) rotateX(65deg)',
          transformOrigin: 'center bottom'
        }}
      ></div>
    </div>
  );

  const skillCategories = [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Python", "C++"]
    },
    {
      category: "Frontend",
      skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "FastAPI", "Django", "Flask", "REST APIs"]
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "ArangoDB", "SQLAlchemy ORM"]
    },
    {
      category: "Tools & DevOps",
      skills: ["Docker", "Docker Compose", "Git", "GitHub", "Cloudinary", "FFmpeg"]
    },
    {
      category: "AI & Integrations",
      skills: ["Groq API", "LLaMA 3.3-70B", "Hugging Face Transformers", "Figma API"]
    }
  ];

  const experiences = [
    {
      role: "Web Developer Intern",
      company: "House of Couton Pvt. Ltd.",
      period: "Jan 2025 – Dec 2025",
      location: "Remote",
      bullets: [
        "Developed full-stack applications for marketing, human resources, and management research teams.",
        "Translated business and research requirements into production-ready platforms using MERN, Django, Flask, and PostgreSQL.",
        "Built scalable REST APIs, database workflows, and third-party integrations in collaboration with cross-functional teams."
      ]
    },
    {
      role: "Backend Engineer",
      company: "Waysorted",
      period: "Jan 2025 – Present",
      location: "Remote",
      bullets: [
        "Developed the backend for a real-time Figma plugin, delivering 15+ REST APIs for authentication, synchronization, plugin operations, and Figma API integration.",
        "Diagnosed and resolved cross-service integration issues across the plugin, web application, and Flask newsletter service by tracing authenticated product-event and subscriber workflows.",
        "Configured and validated the seven-day inactivity email journey through a controlled canary-to-eligible-user rollout, achieving zero delivery failures and clearing the queue backlog; established a reproducible local setup with 34 passing tests."
      ]
    }
  ];

  const education = [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Dr. A.P.J. Abdul Kalam Technical University",
      period: "2023 – 2027",
      details: "Focusing on Full-Stack Systems, Distributed Architectures & AI Integration"
    },
    {
      degree: "Senior Secondary Education (Class XII)",
      institution: "The Union Academy Senior Secondary School",
      period: "Completed 2023",
      details: "Science & Mathematics Stream"
    }
  ];

  const achievements = [
    {
      title: "Google Developer Groups on Campus Lead (2025–26)",
      desc: "Selected to lead the campus developer community and technical initiatives."
    },
    {
      title: "Two-Time College Hackathon Winner",
      desc: "Won two college-level hackathons by building and presenting solution-focused technology projects."
    },
    {
      title: "Smart India Hackathon 2025",
      desc: "Selected for the external round from a competitive pool of 145+ teams."
    },
    {
      title: "AWS Young Builders Challenge 2023",
      desc: "Ranked among the top 11 teams nationally."
    },
    {
      title: "Bank of Baroda × Microsoft Hackathon 2024",
      desc: "Ranked among the top 20 teams nationally."
    }
  ];

  const categories = ["All", ...skillCategories.map(c => c.category)];

  const filteredCategories = activeCategory === "All"
    ? skillCategories
    : skillCategories.filter(c => c.category === activeCategory);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-6 lg:px-8 bg-[#0A0A0A]">
      <RetroGrid className="opacity-20" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-center font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-500 dark:text-neutral-500 px-4 sm:px-6 lg:px-8">
            ABOUT ME
          </h1>
          <div className="h-px w-20 bg-white/30 mx-auto mt-4" />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column - Profile, Bio & Skills */}
          <div className="space-y-8">
            {/* Profile Card */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Avatar */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent border border-white/20 flex items-center justify-center text-3xl font-bold text-white shadow-inner">
                  AB
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Ansh Bhatt</h3>
                  <p className="text-gray-300 font-medium">Full-Stack & Backend Developer</p>
                  <p className="text-gray-500 text-sm">New Delhi, India • +91-9560078250</p>
                  <div className="flex items-center justify-center space-x-2 pt-1">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <p className="text-emerald-400/90 text-sm font-medium">Open to opportunities</p>
                  </div>
                </div>

                {/* Contact & Links */}
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { name: 'Email', href: 'mailto:anshbhatt140@gmail.com' },
                    { name: 'GitHub', href: 'https://github.com/ansh-logics' },
                    { name: 'Website', href: 'https://anshbhatt.space' },
                    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ansh-bhatt-py' }
                  ].map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 text-xs font-medium border border-white/15 rounded-full text-gray-300 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </div>
            </MagicCard>



            {/* Technical Skills Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h4 className="text-lg font-semibold text-white">Technical Skills</h4>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 mb-6 pb-2 border-b border-white/10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-lg transition-colors font-medium ${
                      activeCategory === cat
                        ? "bg-white text-black font-semibold"
                        : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Categorized Skills */}
              <div className="space-y-5">
                {filteredCategories.map((group) => (
                  <div key={group.category} className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      {group.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-medium bg-white/[0.04] text-gray-200 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/[0.08] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>
            {/* Education Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6">Education</h4>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-1.5 pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                      <h5 className="text-white font-medium text-sm sm:text-base">{edu.degree}</h5>
                      <span className="text-gray-500 text-xs font-mono">{edu.period}</span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-xs">{edu.details}</p>
                  </div>
                ))}
              </div>
            </MagicCard>
          </div>

          {/* Right Column - Experience & Achievements */}
          <div className="space-y-8">
            {/* Experience Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6">Experience</h4>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-6 border-l-2 border-white/20 hover:border-white/50 transition-colors group"
                  >
                    <div className="absolute -left-[9px] top-1 w-4 h-4 bg-black rounded-full border-2 border-white/40 group-hover:border-white transition-colors" />

                    <div className="space-y-2.5">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                        <h5 className="text-white font-semibold text-base">{exp.role}</h5>
                        <span className="text-gray-400 text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-300 text-xs sm:text-sm font-medium">
                        {exp.company} • <span className="text-gray-500">{exp.location}</span>
                      </p>
                      <ul className="space-y-2 pt-1">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-gray-400 text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                            <span className="text-white/40 mt-1.5 text-[10px]">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>

            {/* Achievements & Leadership Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6">Achievements & Leadership</h4>
              <div className="space-y-4">
                {achievements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.5)]"></div>
                    <div className="space-y-1">
                      <p className="text-gray-200 text-sm font-medium">{item.title}</p>
                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10 font-medium">Let's work together</span>
          </button>
        </div>
      </div>
    </div>
  );
}
