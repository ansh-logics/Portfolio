import {
  IconBrandGithub,
  IconBrandX,
  IconBrandLinkedin,
  IconMail,
  IconCode,
  IconHeart
} from "@tabler/icons-react";
import { WordPullUp } from "../animations/WordPullUp";
import ShimmerButton from "../MagicUI/ShimmerButton";
import { motion } from "framer-motion";

export function Contact() {
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

  const socialLinks = [
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/ansh-bhatt-py",
    },
    {
      title: "Email",
      icon: <IconMail className="h-5 w-5" />,
      href: "mailto:anshbhatt140@gmail.com",
    },
    {
      title: "Twitter",
      icon: <IconBrandX className="h-5 w-5" />,
      href: "https://twitter.com/AnshBhatt906",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className="h-5 w-5" />,
      href: "https://www.github.com/ansh-logics",
    },
  ];

  return (
    <div className="relative w-full bg-[#0A0A0A]">
      <RetroGrid className="opacity-20" />

      <footer className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Main Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Main Content */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <WordPullUp text="GET IN TOUCH" className="text-left px-0" />
                  <motion.p
                    variants={itemVariants}
                    className="text-gray-400 mt-6 max-w-lg text-lg leading-relaxed"
                  >
                    Have a project in mind or just want to connect? I'm always open to
                    discussing new opportunities and ideas.
                    <span className="block mt-2 text-white/80 font-medium">
                      Let's build something amazing together.
                    </span>
                    <span className="block mt-4 text-gray-500 text-sm">
                      📍 New Delhi, India
                    </span>
                  </motion.p>
                </div>

                <motion.div variants={itemVariants}>
                  <ShimmerButton
                    text="Email Me"
                    className="w-48 h-14 text-base font-semibold"
                    onClick={() => window.location.href = "mailto:anshbhatt140@gmail.com"}
                  />
                </motion.div>
              </motion.div>

              {/* Right Column - Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col items-start lg:items-end justify-start space-y-6"
              >
                <h3 className="text-white text-xl font-semibold tracking-wide">Connect</h3>

                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.title}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative overflow-hidden text-gray-500 hover:text-white transition-all duration-300 p-4 border border-gray-700 rounded-xl hover:border-gray-500 hover:bg-gray-800/50 backdrop-blur-sm"
                      aria-label={link.title}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {link.icon}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom Section */}
            <motion.div
              variants={itemVariants}
              className="border-t border-gray-800 mt-20 pt-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <motion.p
                  className="text-gray-500 text-sm"
                  whileHover={{ color: "#9CA3AF" }}
                  transition={{ duration: 0.2 }}
                >
                  &copy; {new Date().getFullYear()} Ansh Bhatt. All rights reserved.
                </motion.p>

                <motion.p
                  className="text-gray-500 text-sm flex items-center gap-1"
                  whileHover={{ color: "#9CA3AF" }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Made with</span>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconHeart className="h-4 w-4 text-red-500" />
                  </motion.div>
                  <span>and</span>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconCode className="h-4 w-4 text-blue-400" />
                  </motion.div>
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
