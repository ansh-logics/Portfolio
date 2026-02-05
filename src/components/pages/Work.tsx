import Projects from "../sections/Projects";
import { WordPullUp } from "../animations/WordPullUp";

function Work() {
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
          backgroundSize: '40px 40px',
          transform: 'perspective(200px) rotateX(65deg)',
          transformOrigin: 'center bottom'
        }}
      ></div>
      {/* Overlay for responsive grid pattern adjustment */}
      <div 
        className="absolute inset-0 opacity-10 hidden md:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(200px) rotateX(65deg)',
          transformOrigin: 'center bottom'
        }}
      ></div>
      <div 
        className="absolute inset-0 opacity-10 hidden lg:block"
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

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]" data-section="projects">
      <RetroGrid className="opacity-20" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-8 sm:gap-10 lg:gap-12 py-8 sm:py-12 lg:py-16">
        <div className="w-full max-w-5xl">
          <WordPullUp text="PROJECTS"/>
        </div>
        <div className="w-full">
          <Projects />
        </div>
      </div>
    </div>
  );
}

export default Work;