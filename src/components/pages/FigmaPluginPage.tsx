import { motion } from 'framer-motion';
import { Lock, Eye, Coffee, Code, Smile, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FigmaPluginPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,107,107,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,107,107,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* Floating Icons - hidden on small screens */}
      <motion.div 
        className="absolute top-20 left-20 text-gray-700 hidden lg:block"
        variants={floatingVariants}
        animate="animate"
      >
        <Code size={24} />
      </motion.div>
      <motion.div 
        className="absolute top-32 right-32 text-gray-700 hidden lg:block"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      >
        <Coffee size={20} />
      </motion.div>
      <motion.div 
        className="absolute bottom-32 left-32 text-gray-700 hidden lg:block"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      >
        <Eye size={22} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto text-center z-10 relative w-full"
      >
        {/* Lock Icon */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mb-12"
        >
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 3, -3, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-28 h-28 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center border border-red-500/30 backdrop-blur-sm"
            >
              <Lock className="w-14 h-14 text-red-400" />
            </motion.div>
            {/* Sparkles around lock */}
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full blur-sm"
            />
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full blur-sm"
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Oops! 
          </span>
          <br />
          <span className="text-gray-200">This is Top Secret! 🕵️‍♂️</span>
        </motion.h1>

        {/* Funny Message */}
        <motion.div
          variants={itemVariants}
          className="space-y-8 mb-12"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            You've stumbled upon my <span className="text-red-400 font-semibold">super secret</span> Figma plugin! 🎨
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            This little digital masterpiece is so exclusive, it makes VIP clubs look like public parks. 
            It's currently living in a private repository, sipping digital tea and wearing a tiny tuxedo. 🎩☕
          </p>
        </motion.div>

        {/* Fun Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-red-500/20 transition-colors duration-300">
            <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
            <div className="text-sm text-gray-400">Privacy Level</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-pink-500/20 transition-colors duration-300">
            <div className="text-3xl font-bold text-pink-400 mb-2">∞</div>
            <div className="text-sm text-gray-400">Curiosity Generated</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/20 transition-colors duration-300">
            <div className="text-3xl font-bold text-purple-400 mb-2">404</div>
            <div className="text-sm text-gray-400">Links Found</div>
          </div>
        </motion.div>

        {/* Why It's Private */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
            <Smile className="text-yellow-400" size={28} />
            Why So Mysterious?
          </h3>
          <p className="text-gray-300 leading-relaxed text-lg">
            This Figma plugin contains some proprietary magic ✨ that's still brewing in the development cauldron. 
            Think of it as a fine wine that needs more aging, or a secret recipe that's not ready for the world... yet! 🍷👨‍🍳
          </p>
        </motion.div>

        {/* Contact Hint */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-gray-400 mb-4 text-lg">
            Curious about the plugin? Want to know more about this digital mystery? 🤔
          </p>
          <p className="text-gray-500">
            Feel free to reach out! I'd love to tell you all about it over a virtual coffee ☕
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <Link to="/">
            <motion.button
              className="flex items-center gap-3 px-6 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg transition-all duration-300 text-red-400 hover:text-red-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Projects</span>
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-red-500/10 via-pink-500/5 to-transparent blur-3xl" />
    </div>
  );
};

export default FigmaPluginPage; 