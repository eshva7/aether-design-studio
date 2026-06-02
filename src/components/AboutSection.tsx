import { motion } from 'motion/react';
import { Mail, Globe2, Layers, Heart, ShieldAlert } from 'lucide-react';

export default function AboutSection() {
  const principles = [
    {
      step: "01",
      title: "Tactile Grid Discipline",
      description: "Every sub-pixel, typography scale, and layout boundary follows mathematical geometric grids, achieving absolute Swiss structure."
    },
    {
      step: "02",
      title: "Sub-millisecond Latency",
      description: "Interfaces must render instantly. We target zero-noise visual layouts with performant React orchestration and layout keys."
    },
    {
      step: "03",
      title: "Radical Transparency",
      description: "No agency marketing fluff. We talk in raw metrics, source deliverables, transparent budgets, and concrete progress."
    }
  ];

  const offices = [
    { city: "Zürich", coords: "47.3769° N, 8.5417° E", status: "Focus Studio" },
    { city: "San Francisco", coords: "37.7749° N, 122.4194° W", status: "Framer Handoff" },
    { city: "Tokyo", coords: "35.6762° N, 139.6503° E", status: "Product Sprint" }
  ];

  return (
    <section 
      id="about" 
      className="w-full bg-white py-24 md:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Core Layout split: 40% left philosophy description, 60% right principles stack */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 md:gap-24 mb-24 md:mb-32Items-start" id="about-intro">
          
          <div className="lg:col-span-4" id="about-intro-left">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#666666]">
                About & Philosophy
              </span>
            </div>
            <h2 className="font-display font-bold text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.03em] text-[#111111] mb-6">
              Simplifying complexity with severe aesthetic discipline.
            </h2>
            <p className="font-sans text-[16px] text-[#666666] leading-relaxed mb-6">
              Our studio operates at the razor edge intersection of high-fidelity interface arts and performant web technologies. We design without unnecessary bulk, aiming for quiet luxury.
            </p>
            <p className="font-sans text-[16px] text-[#666666] leading-relaxed">
              We treat clients as core partners, delivering Figma files that developer teams praise, paired with pristine React boilers using atomic structures.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-12" id="about-principles-stack">
            {principles.map((pr) => (
              <div key={pr.step} className="flex gap-6 sm:gap-10 border-t border-[#EAEAEA] pt-8" id={`about-pr-${pr.step}`}>
                <span className="font-mono text-[16px] text-[#111111] font-bold">
                  {pr.step}
                </span>
                <div className="max-w-md">
                  <h3 className="font-display font-bold text-[18px] sm:text-[20px] text-[#111111] mb-2">
                    {pr.title}
                  </h3>
                  <p className="font-sans text-[14.5px] text-[#666666] leading-relaxed">
                    {pr.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Global physical office layout / footer info */}
        <div className="border-t border-[#EAEAEA] pt-16 md:pt-20 grid grid-cols-1 md:grid-cols-3 gap-12" id="about-offices-strip">
          {offices.map((office) => (
            <div key={office.city} className="flex flex-col gap-2" id={`office-${office.city.toLowerCase().replace(' ', '-')}`}>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest leading-none">Global Node</p>
              <h3 className="font-display font-bold text-[22px] text-[#111111] mt-1">
                {office.city}
              </h3>
              <p className="font-mono text-[11px] text-[#666666]">
                {office.coords}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2 font-sans text-[12px] text-neutral-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                {office.status}
              </span>
            </div>
          ))}
        </div>

        {/* Studio footer credits block */}
        <div className="mt-24 pt-12 border-t border-[#EAEAEA] flex flex-col md:flex-row items-center justify-between gap-6" id="about-credits">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#111111] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rotate-45 transform" />
            </div>
            <span className="font-mono text-[11px] tracking-wider uppercase text-neutral-400">
              © {new Date().getFullYear()} ESHVA VISUALS AGENCY. All copyrights persistent.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6" id="about-social-actions">
            <span className="font-sans text-[13px] text-neutral-500 flex items-center gap-1.5">
              <span className="text-[#111111] font-bold">Mail:</span>
              <a href="mailto:rajwarbhabesh7@gmail.com" className="hover:text-black hover:underline transition-colors">
                rajwarbhabesh7@gmail.com
              </a>
            </span>
            <span className="font-sans text-[13px] text-neutral-500 flex items-center gap-1.5">
              <Globe2 size={14} className="text-neutral-400" />
              <span className="hover:text-black transition-colors select-none">
                eshvavisuals.com
              </span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
