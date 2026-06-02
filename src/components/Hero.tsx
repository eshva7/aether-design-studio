import { motion } from 'motion/react';
import PremiumAssistant3D from './PremiumAssistant3D';
import InteractiveGrid from './InteractiveGrid';

export default function Hero() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Standard spring transition for premium agency feel
  const springTransition = { type: "spring", stiffness: 100, damping: 20 };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[calc(100vh-80px)] w-full bg-[#FAFAFA] flex items-center justify-center px-6 md:px-12 pt-[120px] pb-[80px] overflow-hidden"
    >
      {/* Premium Minimal Grid Lines for Switzerland Editorial Style */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-4 lg:grid-cols-12 h-full w-full max-w-[1400px] mx-auto px-6 md:px-12 z-0 opacity-[0.03]">
        <div className="border-r border-[#111111] h-full col-span-1" />
        <div className="border-r border-[#111111] h-full col-span-1" />
        <div className="border-r border-[#111111] h-full col-span-1" />
        <div className="border-r border-[#111111] h-full col-span-1 lg:hidden" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block border-r border-[#111111] h-full col-span-1" />
        <div className="hidden lg:block h-full col-span-1" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-10 items-center gap-12 md:gap-16">
        
        {/* Left Column (40%) - span 4 on large screens */}
        <div className="lg:col-span-4 flex flex-col justify-center text-left" id="hero-left-col">
          
          {/* Small Label with micro-motion */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-6"
            id="hero-label-wrap"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-sans font-semibold text-[13.5px] uppercase tracking-[0.15em] text-[#111111]">
              ✨ Digital Product Design Studio
            </span>
          </motion.div>

          {/* Headline - High-fashion condensed bold display type */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="font-anton uppercase text-[36px] sm:text-[50px] lg:text-[60px] xl:text-[66px] leading-[1.1] tracking-[-0.015em] text-[#111111] mb-8"
            id="hero-headline"
          >
            Designing Products
            <span className="block mt-2 text-[#111111]/90">That Feel Effortless.</span>
          </motion.h1>

          {/* Subheadline - 22px, medium weight */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.3 }}
            className="font-sans font-medium text-[18px] sm:text-[20px] lg:text-[22px] leading-[1.45] text-[#666666] tracking-tight mb-10 max-w-lg"
            id="hero-subheadline"
          >
            We help startups and ambitious brands transform ideas into beautiful digital experiences through strategy, product design, and modern development.
          </motion.p>

          {/* Buttons Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.4 }}
            className="flex items-center gap-6"
            id="hero-actions"
          >
            <button
              onClick={() => handleScrollTo('estimator')}
              className="font-sans font-medium text-[15px] px-7 py-3 rounded-full bg-[#111111] text-white hover:bg-[#111111]/90 transition-all duration-300 cursor-pointer"
            >
              Start Project
            </button>
            
            <button
              onClick={() => handleScrollTo('stories')}
              className="group font-sans font-medium text-[15px] text-[#555555] hover:text-[#111111] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <span>Learn More</span>
              <span className="inline-block transition-transform duration-355 ease-out group-hover:translate-x-1">→</span>
            </button>
          </motion.div>

        </div>

        {/* Right Column (60%) - span 6 on large screens */}
        {/* Features an ultra-premium, interactive Three.js 3D character assistant */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-6 h-[300px] sm:h-[450px] lg:h-[580px] relative rounded-2xl border border-neutral-200 bg-neutral-100 overflow-hidden"
          id="hero-right-col-empty"
        >
          {/* Interactive Millions of Grids Background with cursor spotlight effect */}
          <InteractiveGrid />

          {/* Premium Real-Time 3D Digital Assistant */}
          <PremiumAssistant3D />

          {/* Corner blueprint markers */}
          <div className="absolute top-4 left-4 flex gap-1 items-center font-mono text-[9px] text-neutral-500 hover:text-neutral-700 select-none z-20 transition-colors">
            <span>[ SYSTEM_CORE_ASSISTANT_01 ]</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center font-mono text-[9px] text-neutral-500 hover:text-neutral-700 select-none z-20 transition-colors">
            <span>+ 47.3769° N (interactive)</span>
          </div>

          {/* Bottom-left status */}
          <div className="absolute bottom-4 left-4 font-mono text-[9px] text-neutral-500 hover:text-neutral-700 select-none z-20 transition-colors">
            <span>GRID_SYSTEM: ACTIVE</span>
          </div>

          {/* Bottom-right slot ID */}
          <div className="absolute bottom-4 right-4 font-mono text-[9px] text-neutral-500 hover:text-neutral-700 select-none z-20 transition-colors">
            <span>3D_ACCELERATION: WEBGL_2.0</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
