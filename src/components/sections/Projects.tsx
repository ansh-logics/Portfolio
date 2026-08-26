import { motion } from 'framer-motion'
import { MagicCard } from '../ui/magic-card'
import { BorderBeam } from '../ui/border-beam'
import projects from "../../Projects.json";
import { SiGithub } from 'react-icons/si';
import { ExternalLink, ArrowRight } from 'lucide-react';
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

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    // Bento grid pattern: First and last items span 2 columns on large screens
    const spanClass = index === 0 || index === 3 ? "lg:col-span-2" : "lg:col-span-1";
    
    return (
      <motion.div 
        variants={itemVariants}
        className={`group relative w-full h-full flex flex-col ${spanClass}`}
      >
        <MagicCard
          className="flex-1 w-full h-full overflow-hidden bg-transparent p-0"
          gradientColor="#262626"
          gradientOpacity={0.1}
          gradientFrom="#9E7AFF"
          gradientTo="#FE8BBB"
        >
          {/* Card Content */}
          <div className="relative z-10 h-full flex flex-col justify-between bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            {/* Enhanced Border Beam */}
            <BorderBeam 
              duration={6} 
              size={200}
              colorFrom={project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}
              colorTo={project.theme === '#FEFFFE' ? '#FE8BBB' : project.theme}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Header and Content Section */}
            <div className="p-6 sm:p-8 flex flex-col h-full bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-6 z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: project.theme === '#FEFFFE' ? '#8A39EA' : project.theme }}
                    ></div>
                    <h3 
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-200 group-hover:text-white transition-colors duration-300 tracking-tight"
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 group-hover:text-gray-300 text-sm sm:text-base transition-colors duration-300 font-medium">
                    {project.role}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 justify-end sm:justify-start">
                  {/* GitHub/Source Link */}
                  {project.link && (
                    project.link.startsWith('/') ? (
                      <Link to={project.link}>
                        <motion.div
                          className="group/btn relative overflow-hidden rounded-full p-2.5 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                          <div 
                            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}30, transparent 70%)`
                            }}
                          ></div>
                        </motion.div>
                      </Link>
                    ) : (
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative overflow-hidden rounded-full p-2.5 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}30, transparent 70%)`
                          }}
                        ></div>
                      </motion.a>
                    )
                  )}
                  
                  {/* Website/Demo Link */}
                  {project.website.startsWith('/') ? (
                    <Link to={project.website}>
                      <motion.div
                        className="group/btn relative overflow-hidden rounded-full p-2.5 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}30, transparent 70%)`
                          }}
                        ></div>
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden rounded-full p-2.5 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover/btn:text-white transition-colors relative z-10" />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}30, transparent 70%)`
                        }}
                      ></div>
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Description Snippet */}
              {project.description && (
                <p className="text-gray-400/90 text-sm sm:text-base leading-relaxed mb-8 flex-grow z-10">
                  {project.description}
                </p>
              )}
              
              {/* Tech Stack Indicators */}
              <div className="flex flex-wrap gap-2 mt-auto z-10">
                {(project.tech || ['React', 'TypeScript', 'Node.js']).map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1.5 text-xs sm:text-sm font-medium bg-white/5 text-gray-300 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/10 hover:text-white transition-all duration-300 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Decorative Background Gradient Element */}
              <div 
                className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[80px] opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-700"
                style={{ backgroundColor: project.theme === '#FEFFFE' ? '#8A39EA' : project.theme }}
              ></div>
            </div>

            {/* Glow Effects */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0 blur-xl opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}, transparent 70%)`
                }}
              ></div>
            </div>
          </div>
        </MagicCard>
      </motion.div>
    );
  };

  // Simple CTA Button Component
  const CTAButton = () => {
    const handleExploreClick = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
      <motion.div
        variants={itemVariants}
        className="flex justify-center items-center"
      >
        <Link to="/projects" onClick={handleExploreClick}>
          <motion.button
            className="flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-300 text-gray-400 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </Link>
      </motion.div>
    );
  };

  // Get only the first 4 projects
  const featuredProjects = (projects as Project[]).slice(0, 4);

  return (
    <section className="relative min-h-screen w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Projects Grid - First 4 projects */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
          >
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.div className="mt-12 flex justify-center">
            <CTAButton />
          </motion.div>
        </motion.div>
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none"></div>
    </section>
  )
}

export default Projects;
