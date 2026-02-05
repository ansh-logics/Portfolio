import { PropsWithChildren } from 'react'
import MagicCard from '../MagicUI/MagicCard'
import EmergingEffect from '../MagicUI/EmergingEffect'
import { motion } from 'framer-motion'

function HeroFrame(props:PropsWithChildren) {
  return (
    <>
      <EmergingEffect className="group">
        <div className='mt-[40%] sm:mt-[10%] lg:mt-[10%] flex flex-row items-center justify-center w-[90vw] lg:w-[50vw] sm:w-[85vw] md:w-[85vw] h-[50vh] sm:h-[52vh] md:h-[50vh] lg:h-[60vh] sm:p-4 p-3 lg:p-5 rounded-[30px] bg-gradient-to-b from-[#B8B8B8] from-1% to-[#1E1E1E] to-80% relative overflow-hidden'>
          {/* Emerging line effect from bottom right */}
          <div className="absolute bottom-0 right-0 w-[70%] h-[70%] pointer-events-none">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-white to-transparent animate-expandWidth"></div>
            <div className="absolute bottom-0 right-0 h-full w-[1px] bg-gradient-to-t from-white to-transparent animate-expandHeight"></div>
          </div>
          
          <MagicCard className='bg-[#1E1E1E] w-full h-full flex items-center justify-center rounded-[20px]'>
            {props.children}
          </MagicCard>
          
          {/* Corner light effect */}
          <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-gradient-radial from-white/20 to-transparent opacity-60 blur-lg pointer-events-none"></div>
          
          {/* Shimmer effect */}
          <motion.div 
            className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/5 pointer-events-none"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </EmergingEffect>
    </>
  )
}

export default HeroFrame