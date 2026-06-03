import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BRANDED_STORIES } from '../data';
import { CaseStudy } from '../types';
import { ArrowUpRight, X, Sparkles, FolderOpen, Clock } from 'lucide-react';

export default function StoriesSection() {
  const [activeStory, setActiveStory] = useState<CaseStudy | null>(null);

  return (
    <section 
      id="stories" 
      className="w-full bg-white py-24 md:py-32 border-b border-[#EAEAEA] relative overflow-hidden"
    >
      {/* Decorative vertical grid line */}
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-neutral-100 hidden lg:block pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20" id="stories-header">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#666666]">
                Case Studies
              </span>
            </div>
            <h2 className="font-anton uppercase text-[32px] md:text-[48px] leading-[1.1] tracking-[0.01em] text-[#111111]">
              Selected projects that shape modern design standards.
            </h2>
          </div>
          <div className="flex items-center">
            <p className="font-sans text-[15px] text-[#666666] max-w-xs md:text-right">
              Meticulous craftsmanship across interactions, tokens, and frontend codebases. Click any project to open detailed design overview.
            </p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10" id="stories-grid-container">
          {BRANDED_STORIES.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onClick={() => setActiveStory(story)}
              className="group relative bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-8 hover:border-[#111111] hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[460px] hover:-translate-y-1"
              id={`story-card-${story.id}`}
            >
              {/* Top part */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#666666] bg-neutral-100 px-3 py-1 rounded-sm">
                    {story.category}
                  </span>
                  <div className="text-neutral-400 group-hover:text-[#111111] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

                <h3 className="font-display font-medium text-[26px] leading-[1.2] tracking-tight text-[#111111] mb-4 group-hover:text-black transition-colors">
                  {story.title}
                </h3>
                
                <p className="font-sans text-[14.5px] text-[#666666] leading-relaxed line-clamp-3 mb-6">
                  {story.overview}
                </p>
              </div>

              {/* Bottom part */}
              <div className="border-t border-[#EAEAEA] pt-6 mt-auto">
                <div className="grid grid-cols-3 gap-2">
                  {story.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-left">
                      <p className="font-display font-bold text-[18px] sm:text-[20px] text-[#111111] leading-none mb-1">
                        {metric.value}
                      </p>
                      <p className="font-sans text-[10px] uppercase tracking-wider text-[#666666] leading-tight">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Slide-over Detail Modal for Awwwards-quality interaction depth */}
      <AnimatePresence>
        {activeStory && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveStory(null)}
              className="fixed inset-0 bg-black z-50 cursor-zoom-out"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 overflow-y-auto px-8 md:px-12 py-12 flex flex-col justify-between border-l border-[#EAEAEA]"
              id="story-detail-drawer"
            >
              <div>
                {/* Header controls */}
                <div className="flex items-center justify-between pb-6 border-b border-[#EAEAEA] mb-10">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#111111]" />
                    <span className="font-mono text-[11px] tracking-widest uppercase text-[#111111] font-bold">
                      Interactive Studio Audit
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveStory(null)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-black cursor-pointer"
                    aria-label="Close details"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Meta details */}
                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 bg-neutral-100 px-3 py-1 rounded-sm">
                  {activeStory.category}
                </span>

                <h3 className="font-display font-bold text-[32px] md:text-[40px] leading-tight tracking-tight text-[#111111] mt-4 mb-6">
                  {activeStory.client}: {activeStory.title}
                </h3>

                <div className="grid grid-cols-2 gap-4 py-4 px-5 rounded-lg border border-[#EAEAEA] bg-neutral-50/50 mb-8">
                  <div className="flex items-center gap-2 text-[#666666] font-sans text-[13px]">
                    <Clock size={15} />
                    <span>Timeline: {activeStory.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#666666] font-sans text-[13px]">
                    <FolderOpen size={15} />
                    <span>Project Partnership</span>
                  </div>
                </div>

                {/* Core Sections */}
                <div className="space-y-8" id="story-paragraphs">
                  <div>
                    <h4 className="font-mono text-[11px] tracking-wider uppercase text-neutral-400 mb-2">01 / Overview</h4>
                    <p className="font-sans text-[15px] leading-relaxed text-[#666666]">{activeStory.overview}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] tracking-wider uppercase text-neutral-400 mb-2">02 / The Challenge</h4>
                    <p className="font-sans text-[15px] leading-relaxed text-[#666666]">{activeStory.challenge}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] tracking-wider uppercase text-neutral-400 mb-2">03 / The Tactical Solution</h4>
                    <p className="font-sans text-[15px] leading-relaxed text-[#666666]">{activeStory.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] tracking-wider uppercase text-neutral-400 mb-2">04 / Absolute Impact</h4>
                    <p className="font-sans text-[15px] leading-relaxed text-[#666666]">{activeStory.impact}</p>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] tracking-wider uppercase text-neutral-400 mb-3">Project Scope of Delivery</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeStory.scope.map((tag) => (
                        <span key={tag} className="font-sans text-[12px] bg-neutral-50 border border-[#EAEAEA] px-3.5 py-1.5 rounded-full text-[#111111]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Drawer CTA */}
              <div className="border-t border-[#EAEAEA] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest leading-none">Delivered Metrics</p>
                  <p className="font-display font-bold text-[24px] text-[#111111] mt-1">
                    {activeStory.metrics[0].value}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveStory(null);
                    const element = document.getElementById('estimator');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="font-sans font-bold text-[14px] px-6 py-3 rounded-full bg-[#111111] text-white hover:bg-black/90 transition-all text-center w-full sm:w-auto cursor-pointer"
                >
                  Initiate Similar Project
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
