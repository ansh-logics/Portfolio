import { motion } from 'framer-motion'

import { ShimmerButton } from '../MagicUI/ShimmerButton'


function Hero() {


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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Simple components for missing Magic UI elements
  const SparklesText = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={className}>{children}</span>
  );

  const InteractiveHoverButton = ({ children, className, ...props }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
    <button
      className={`group relative overflow-hidden rounded-full border border-gray-600 text-lg font-semibold text-gray-300 transition-all duration-300 hover:border-gray-500 hover:text-white flex items-center justify-center ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </button>
  );

  const RetroGrid = ({ className }: { className?: string }) => (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
      <div
        className="absolute inset-0 opacity-20"
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

  const Safari = ({ url, children, className }: { url: string, children: React.ReactNode, className?: string }) => (
    <div className={`relative ${className}`}>
      {/* Safari Window Frame with Glass Effect */}
      <div className="bg-neutral-800/70 backdrop-blur-xl border border-white/10 rounded-t-lg p-3 flex items-center space-x-2 relative">
        {/* Glass effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/3 to-transparent rounded-t-lg"></div>

        <div className="flex space-x-2 relative z-10">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
        </div>
        <div className="flex-1 mx-4 relative z-10">
          <div className="bg-neutral-700/70 backdrop-blur-sm border border-white/10 rounded px-3 py-1 text-sm text-gray-300 text-center">
            {url}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="rounded-b-lg overflow-hidden relative">
        {children}
      </div>
    </div>
  );

  return (
    <section className="relative min-h-screen w-full flex items-start justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background Effects */}

      <RetroGrid className="opacity-20" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 pt-90 pb-16 md:pt-72 lg:pt-80">
        <motion.div
          className="flex justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Interactive Mockup */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-4xl relative mx-auto"
          >
            {/* Mockup Background Glow Effects - Similar to Magic UI */}
            <div className="absolute inset-0 -m-8">
              {/* Primary glow - large soft white glow */}
              <motion.div
                className="absolute inset-0 bg-white/[0.02] blur-3xl rounded-3xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>

              {/* Secondary glow - medium glow for depth */}
              <motion.div
                className="absolute inset-4 bg-white/[0.04] blur-2xl rounded-2xl"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>

              {/* Tertiary glow - smaller, brighter center glow */}
              <motion.div
                className="absolute inset-8 bg-white/[0.06] blur-xl rounded-xl"
                animate={{
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              ></motion.div>

              {/* Accent glow - very subtle edge enhancement */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] blur-2xl rounded-3xl"></div>

              {/* Animated ring glow effect */}
              <motion.div
                className="absolute inset-0 border border-white/[0.05] rounded-3xl"
                animate={{
                  opacity: [0, 0.3, 0],
                  scale: [0.95, 1.02, 0.95],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
            </div>

            {/* Mockup Container with enhanced shadow */}
            <div className="relative z-10 drop-shadow-2xl">
              <Safari
                url="portfolio.dev"
                className="w-full h-auto relative"
              >
                <div className="bg-[#111111] min-h-[600px] flex flex-col relative">
                  {/* Hero Content Inside Mockup */}
                  <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 space-y-6 md:space-y-8">
                    {/* Professional Badge - Inspired by Magic UI */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm text-gray-300 backdrop-blur-sm"
                    >
                      <span className="mr-2">🎓</span>
                      <SparklesText className="text-sm font-medium">
                        CS Student • Web Developer Intern • Freelancer
                      </SparklesText>
                    </motion.div>

                    {/* Main Value Proposition - Magic UI Style */}
                    <div className="text-center space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-4"
                      >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                          Crafting Innovative
                          <span className="block bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Web Solutions
                          </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                          Computer Science student & Web Developer Intern building modern applications with
                          <span className="text-gray-300 font-medium"> JavaScript, Python, React & Next.js</span>.
                          Award-winning developer from national competitions.
                        </p>
                      </motion.div>
                    </div>

                    {/* Enhanced CTA Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                      <ShimmerButton
                        text="View Projects"
                        className="w-48 h-12 text-base font-semibold"
                        onClick={() => {
                          const projectsSection = document.querySelector('[data-section="projects"]');
                          if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      />

                      <InteractiveHoverButton
                        className="w-48 h-12 border-white/30 text-gray-300 hover:text-white hover:border-white/50"
                        onClick={() => window.open('./CV.pdf', '_blank')}
                      >
                        Download Resume
                      </InteractiveHoverButton>
                    </motion.div>

                    {/* Trust Indicators - Magic UI Style */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="pt-8 border-t border-white/10 w-full"
                    >
                      <p className="text-xs text-gray-500 text-center mb-4 uppercase tracking-wide">
                        Technologies & Achievements
                      </p>
                      <div className="space-y-3">
                        <div className="flex flex-wrap justify-center items-center gap-4 opacity-60">
                          {['JavaScript', 'Python', 'React', 'Next.js', 'Flask', 'MongoDB'].map((tech, index) => (
                            <motion.span
                              key={tech}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                              className="text-sm text-gray-400 font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-4 opacity-50">
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 2.0 }}
                            className="text-xs text-gray-500 font-medium px-2 py-1 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                          >
                            🏆 AWS Young Builders Challenge Top 100
                          </motion.span>
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 2.1 }}
                            className="text-xs text-gray-500 font-medium px-2 py-1 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                          >
                            🏆 Microsoft Top 20
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Enhanced Dissolving Effects - positioned to not interfere with content */}
                  {/* Inner dissolving gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 via-[#0A0A0A]/60 via-[#0A0A0A]/30 to-transparent pointer-events-none"></div>

                  {/* Secondary dissolving layer */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none"></div>

                  {/* Final bottom extension */}
                  <div className="h-16 bg-[#0A0A0A]"></div>
                </div>
              </Safari>
            </div>

            {/* Enhanced Bottom Dissolving Effects */}
            {/* Primary external dissolve */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 via-[#0A0A0A]/40 to-transparent pointer-events-none"></div>

            {/* Side blending gradients - left and right corners */}
            <div
              className="absolute bottom-0 left-0 w-1/3 h-32 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at bottom left, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)'
              }}
            ></div>
            <div
              className="absolute bottom-0 right-0 w-1/3 h-32 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at bottom right, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 50%, transparent 100%)'
              }}
            ></div>

            {/* Additional side fade for smoother blending */}
            <div className="absolute bottom-0 left-0 w-1/4 h-40 bg-gradient-to-tr from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/80 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-1/4 h-40 bg-gradient-to-tl from-transparent via-[#0A0A0A]/40 to-[#0A0A0A]/80 pointer-events-none"></div>

            {/* Final seamless extension to screen bottom */}
            <div className="absolute -bottom-16 left-0 right-0 h-16 bg-[#0A0A0A] pointer-events-none"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Extended Dissolving Effect to screen bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent pointer-events-none z-20"></div>
    </section>
  )
}

export default Hero