import { motion } from 'framer-motion'
import { MagicCard } from '../ui/magic-card'
import { BorderBeam } from '../ui/border-beam'
import { Meteors } from '../ui/meteors'
import { WordPullUp } from '../animations/WordPullUp'
import projects from "../../Projects.json";
import { SiGithub } from 'react-icons/si';
import { ExternalLink, ArrowLeft, Star, Calendar, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  role: string;
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
    const isEven = index % 2 === 0;
    
    return (
      <motion.div 
        variants={itemVariants}
        className={`group relative w-full ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-6 lg:gap-8`}
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
            <div className="relative z-10 h-full bg-neutral-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden">
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
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: project.theme === '#FEFFFE' ? '#8A39EA' : project.theme }}
                    ></div>
                    <h3 
                      className="text-2xl lg:text-3xl font-bold text-gray-400 group-hover:text-white transition-all duration-300"
                      style={{
                        '--hover-color': project.theme === '#FEFFFE' ? '#8A39EA' : project.theme
                      } as React.CSSProperties}
                    >
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 group-hover:text-gray-400 transition-colors duration-300">{project.role}</p>
                  
                  {/* Additional project details */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>React • TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      <span>Featured</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative overflow-hidden rounded-lg px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SiGithub className="w-5 h-5 text-gray-500 group-hover:text-gray-300 group-hover/btn:text-white transition-colors relative z-10" />
                    <span className="text-gray-500 group-hover/btn:text-white transition-colors relative z-10 font-medium">
                      View Code
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}20, transparent 70%)`
                      }}
                    ></div>
                  </motion.a>
                  
                  <motion.a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn relative overflow-hidden rounded-lg px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-gray-300 group-hover/btn:text-white transition-colors relative z-10" />
                    <span className="text-gray-500 group-hover/btn:text-white transition-colors relative z-10 font-medium">
                      Live Demo
                    </span>
                    <div 
                      className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}20, transparent 70%)`
                      }}
                    ></div>
                  </motion.a>
                </div>
              </div>
              
              {/* Project Description Section */}
              <div className="p-6 lg:p-8">
                <p className="text-gray-400 leading-relaxed mb-4">
                  This project showcases modern web development practices with a focus on user experience and performance. 
                  Built with cutting-edge technologies and best practices in mind.
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech, i) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 text-sm font-medium bg-black/40 backdrop-blur-sm text-gray-300 rounded-full border border-white/10 transition-colors group-hover:border-white/20"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
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
        </div>

        {/* Image Section */}
        <div className="flex-1">
          <div className="relative h-64 lg:h-full min-h-[400px] rounded-xl overflow-hidden group/image">
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            />
            
            {/* Overlay Effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating Action on Image */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div 
                className="w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle, ${project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}40, transparent 70%)`
                }}
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
            </div>
            
            {/* Bottom Project Stats */}
            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="px-3 py-1 text-xs font-medium bg-black/80 backdrop-blur-sm text-white rounded-full border border-white/20">
                    ⭐ Featured
                  </div>
                  <div className="px-3 py-1 text-xs font-medium bg-black/80 backdrop-blur-sm text-white rounded-full border border-white/20">
                    🚀 Live
                  </div>
                </div>
              </div>
            </div>
            
            {/* Border Beam for Image */}
            <BorderBeam 
              duration={12} 
              size={250}
              colorFrom={project.theme === '#FEFFFE' ? '#8A39EA' : project.theme}
              colorTo={project.theme === '#FEFFFE' ? '#FE8BBB' : project.theme}
              className="opacity-0 group-hover:opacity-60 transition-opacity duration-700"
            />
          </div>
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
              className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              A comprehensive showcase of my work, featuring cutting-edge web applications, 
              innovative solutions, and creative implementations.
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
            <ProjectCard key={index} project={project} index={index} />
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
            <Link 
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <span>Get In Touch</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Background Ambient Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none"></div>
    </div>
  );
}

export default AllProjects; 