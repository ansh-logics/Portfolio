import { motion } from 'framer-motion'
import { MagicCard } from '../ui/magic-card'
import { BorderBeam } from '../ui/border-beam'
import { Meteors } from '../ui/meteors'
import { WordPullUp } from '../animations/WordPullUp'
import projects from "../../Projects.json";
import { SiGithub } from 'react-icons/si';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  role: string;
  description?: string;
  built?: string;
  tech?: string[];
  link: string;
  website: string;
  image: string;
  theme: string;
}

function AllProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const ProjectCard = ({ project }: { project: Project }) => {
    
    return (
      <motion.div 
        variants={itemVariants}
        className="group relative w-full flex flex-col items-stretch"
      >
        <div className="flex-1">
          <MagicCard
            className="h-full overflow-hidden bg-transparent p-0"
            gradientColor="#262626"
            gradientOpacity={0.1}
            gradientFrom="#9E7AFF"
            gradientTo="#FE8BBB"
          >
            {/* Background Meteors Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <Meteors number={6} />
            </div>

            {/* Card Content */}
            <div className="relative z-10 h-full flex flex-col justify-between bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
              {/* Enhanced Border Beam */}
              <BorderBeam 
                duration={8} 
                size={300}
                colorFrom={project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}
                colorTo={project.theme === '#FEFFFE' ? '#FE8BBB' : project.theme}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Header Section */}
              <div className="p-6 lg:p-8 border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3.5 h-3.5 rounded-full shadow-lg opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: project.theme === '#FEFFFE' ? '#8A39EA' : project.theme }}
                    ></div>
                    <h3 
                      className="text-2xl lg:text-3xl font-bold text-gray-300 group-hover:text-white transition-all duration-300"
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 text-sm font-medium transition-colors duration-300">{project.role}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {project.link && (
                    project.link.startsWith('/') ? (
                      <Link
                        to={project.link}
                        className="group/btn relative overflow-hidden rounded-lg px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                      >
                        <SiGithub className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                        <span className="text-gray-300 group-hover/btn:text-white transition-colors relative z-10 text-sm font-medium">
                          View Project
                        </span>
                      </Link>
                    ) : (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative overflow-hidden rounded-lg px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <SiGithub className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                        <span className="text-gray-300 group-hover/btn:text-white transition-colors relative z-10 text-sm font-medium">
                          GitHub
                        </span>
                      </motion.a>
                    )
                  )}
                  
                  {project.website.startsWith('/') ? (
                    <Link
                      to={project.website}
                      className="group/btn relative overflow-hidden rounded-lg px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                      <span className="text-gray-300 group-hover/btn:text-white transition-colors relative z-10 text-sm font-medium">
                        Explore
                      </span>
                    </Link>
                  ) : (
                    <motion.a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden rounded-lg px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                      <span className="text-gray-300 group-hover/btn:text-white transition-colors relative z-10 text-sm font-medium">
                        Live Demo
                      </span>
                    </motion.a>
                  )}
                </div>
              </div>
              
              {/* Project Description Section */}
              <div className="p-6 lg:p-8 space-y-4">
                {project.description && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">What it does</span>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                )}

                {project.built && (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">Built & Implementation</span>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {project.built}
                    </p>
                  </div>
                )}
                
                {/* Tech Stack */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2">
                    {(project.tech || ['React', 'TypeScript', 'Tailwind CSS']).map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-xs font-medium bg-black/40 backdrop-blur-sm text-gray-300 rounded-lg border border-white/10 transition-colors group-hover:border-white/25"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow Effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div 
                  className="absolute inset-0 blur-[100px] opacity-20"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}, transparent 70%)`
                  }}
                ></div>
              </div>
            </div>
          </MagicCard>
        </div>
      </motion.div>
    );
  };

  // RetroGrid background component
  const RetroGrid = ({ className }: { className?: string }) => (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(200px) rotateX(65deg)',
          transformOrigin: 'center bottom'
        }}
      ></div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] overflow-hidden">
      <RetroGrid className="opacity-20" />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-16 lg:mb-24"
        >
          {/* Back Button */}
          <motion.div 
            className="flex justify-start mb-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/"
              className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-gray-400 group-hover:text-white transition-colors font-medium">
                Back to Home
              </span>
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <WordPullUp text="ALL PROJECTS" />
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              A showcase of full-stack platforms, real-time microservices, AI systems, and interactive applications.
            </motion.p>
          </div>
        </motion.div>

        {/* Projects List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16 lg:space-y-24"
        >
          {(projects as Project[]).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div 
          className="text-center mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always open to discussing new opportunities and exciting projects.
            </p>
            <a 
              href="mailto:anshbhatt140@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-white/10 to-white/20 hover:from-white/20 hover:to-white/30 border border-white/20 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Get In Touch</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default AllProjects;