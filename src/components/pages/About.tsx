import MagicCard from "../MagicUI/MagicCard";
import { useState } from "react";

export function About() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  const skills = [
    { name: "JavaScript", level: 95 },
    { name: "Python", level: 90 },
    { name: "React & Next.js", level: 92 },
    { name: "Node.js & Express", level: 88 },
    { name: "Database (MongoDB, MySQL)", level: 85 },
    { name: "Flask & FastAPI", level: 80 }
  ];

  const experiences = [
    {
      role: "Building Waysorted",
      company: "Waysorted",
      period: "March 2025 – Present",
      location: "Remote",
      description: "Built and maintained backend architecture for a Figma plugin, developed 15+ Core REST APIs, and collaborated with UI/UX teams."
    },
    {
      role: "Project Administrator",
      company: "Social Winter of Code (SWOC)",
      period: "January 2025 – March 2025",
      location: "Remote",
      description: "Supervised 30+ contributors in an open-source Python-based automation project, reviewed PRs, and resolved merge conflicts."
    },
    {
      role: "Web Developer Intern",
      company: "House of Couton Pvt. Ltd.",
      period: "January 2025 – December 2025",
      location: "Remote",
      description: "Developed full-stack web applications, translated research ideas into prototypes, and delivered 10+ end-to-end projects."
    },
    {
      role: "Project Administrator",
      company: "GirlScript Summer of Code (GSSoC)",
      period: "October 2024 – December 2024",
      location: "Remote",
      description: "Led the open-source project Quiz Quest, managed roadmap, and mentored contributors in Git workflows and CI/CD setup."
    }
  ];

  const education = {
    degree: "Bachelor of Computer Science and Engineering",
    university: "Abdul Kalam Technical University",
    period: "2023 - 2027",
    cgpa: "5.9 CGPA"
  };

  const achievements = [
    "Secured 2nd position in Dron Innovision 2025 with YuktiERP",
    "Selected for specialized round in Smart India Hackathon 2025",
    "Built KnowZ matchmaking platform in ACE Hack 2025",
    "Secured top 11 rank in AWS Young Builders Challenge 2023",
    "Secured top 20 rank in BOB X Microsoft hackathon 2024",
    "Google Developer Groups (GDG) Organizer 2025"
  ];

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

          {/* Left Column - Profile & Bio */}
          <div className="space-y-8">
            {/* Profile Card */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Avatar placeholder */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center text-4xl font-bold text-white/80">
                  AB
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Ansh Bhatt</h3>
                  <p className="text-gray-400">Full Stack Developer</p>
                  <p className="text-gray-500 text-sm">New Delhi, India</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-gray-400">Available for work</p>
                  </div>
                </div>

                {/* Contact Links */}
                <div className="flex space-x-4">
                  {[
                    { name: 'Email', href: 'mailto:anshbhatt140@gmail.com' },
                    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ansh-bhatt-py' },
                    { name: 'GitHub', href: 'https://www.github.com/ansh-logics' }
                  ].map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm border border-white/20 rounded-full text-gray-300 hover:text-white hover:border-white/40 transition-colors"
                    >
                      {platform.name}
                    </a>
                  ))}
                </div>
              </div>
            </MagicCard>

            {/* Bio Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-4">About</h4>
              <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                Hi, I'm Ansh Bhatt, a Computer Science Engineering student at Abdul Kalam Technical University with a passion for full-stack development. I specialize in JavaScript, Python, and modern frameworks like React, Next.js, Flask, and Django. With hands-on experience in building web applications and working with diverse databases from MongoDB to ArangoDB.
              </p>

              <p className="text-gray-400 text-sm mt-4">
                I have proven my skills in national-level competitions, securing top ranks in AWS Young Builders Challenge and BOB X Microsoft hackathon.
                Currently gaining industry experience as a Web Developer Intern at House of Couton Pvt. Ltd.
              </p>
            </MagicCard>

            {/* Education Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-4">Education</h4>
              <div className="space-y-2">
                <h5 className="text-white font-medium">{education.degree}</h5>
                <p className="text-gray-400">{education.university}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{education.period}</span>
                  <span className="text-gray-500">{education.cgpa}</span>
                </div>
              </div>
            </MagicCard>
          </div>

          {/* Right Column - Skills, Experience & Achievements */}
          <div className="space-y-8">
            {/* Skills Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6">Technical Skills</h4>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group cursor-pointer"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm font-medium">{skill.name}</span>
                      <span className="text-gray-500 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-white/60 to-white/40 rounded-full transition-all duration-300 ${hoveredSkill === skill.name ? 'shadow-lg shadow-white/20' : ''
                          }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>

            {/* Experience Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6">Experience</h4>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-8 border-l border-white/20 hover:border-white/40 transition-colors group"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-white/20 rounded-full border-2 border-white/40 group-hover:bg-white/40 transition-colors" />

                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        <h5 className="text-white font-medium">{exp.role}</h5>
                        <span className="text-gray-500 text-sm">{exp.period}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{exp.company} • {exp.location}</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MagicCard>

            {/* Achievements Section */}
            <MagicCard className="p-8 border border-white/10 bg-neutral-900/40 backdrop-blur-sm">
              <h4 className="text-lg font-semibold text-white mb-6">Achievements</h4>
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-2 h-2 bg-white/60 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 text-sm leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </MagicCard>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="group relative overflow-hidden rounded-full border border-white/20 px-8 py-3 text-white hover:border-white/40 transition-colors"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="relative z-10">Let's work together</span>
          </button>
        </div>
      </div>
    </div>
  );
}
