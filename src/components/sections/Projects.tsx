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

  const ProjectCard = ({ project }: { project: Project }) => {
    return (
      <motion.div 
        variants={itemVariants}
        className="group relative w-full"
      >
        <MagicCard
          className="h-full overflow-hidden bg-transparent p-0"
          gradientColor="#262626"
          gradientOpacity={0.1}
          gradientFrom="#9E7AFF"
          gradientTo="#FE8BBB"
        >
          {/* Card Content */}
          <div className="relative z-10 h-full bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
            {/* Enhanced Border Beam */}
            <BorderBeam 
              duration={6} 
              size={200}
              colorFrom={project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}
              colorTo={project.theme === '#FEFFFE' ? '#FE8BBB' : project.theme}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Header Section */}
            <div className="p-4 sm:p-6 border-b border-white/10 bg-gradient-to-br from-white/5 to-transparent">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full shadow-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: project.theme === '#FEFFFE' ? '#8A39EA' : project.theme }}
                    ></div>
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 group-hover:text-white transition-all duration-300"
                      style={{
                        '--hover-color': project.theme === '#FEFFFE' ? '#8A39EA' : project.theme
                      } as React.CSSProperties}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-400 text-sm transition-colors duration-300">{project.role}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 justify-end sm:justify-start">
                  {/* GitHub/Source Link */}
                  {project.link.startsWith('/') ? (
                    <Link to={project.link}>
                      <motion.div
                        className="group/btn relative overflow-hidden rounded-full p-2 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-300 group-hover/btn:text-white transition-colors relative z-10" />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}20, transparent 70%)`
                          }}
                        ></div>
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden rounded-full p-2 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-300 group-hover/btn:text-white transition-colors relative z-10" />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}20, transparent 70%)`
                        }}
                      ></div>
                    </motion.a>
                  )}
                  
                  {/* Website/Demo Link */}
                  {project.website.startsWith('/') ? (
                    <Link to={project.website}>
                      <motion.div
                        className="group/btn relative overflow-hidden rounded-full p-2 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-300 group-hover/btn:text-white transition-colors relative z-10" />
                        <div 
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}20, transparent 70%)`
                          }}
                        ></div>
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden rounded-full p-2 sm:p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-gray-300 group-hover/btn:text-white transition-colors relative z-10" />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}20, transparent 70%)`
                        }}
                      ></div>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>

            {/* Image Section with Enhanced Hover Effects */}
            <div className="relative overflow-hidden group/image">
              <div className="aspect-video relative">
                {/* Project Image */}
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
                
                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Tech Stack Indicators */}
                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  {['React', 'Next.js', 'TypeScript'].slice(0, 2).map((tech, i) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs font-medium bg-black/80 backdrop-blur-sm text-white rounded-full border border-white/20"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Bottom Gradient Blend */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-neutral-900/50 to-transparent"></div>
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
      // Scroll to top when navigating
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
              <ProjectCard key={index} project={project} />
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
