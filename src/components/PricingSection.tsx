import { motion } from 'motion/react';
import { PRICING_TIERS } from '../data';
import { Check, ArrowRight } from 'lucide-react';

export default function PricingSection() {
  const handleScrollToNav = (id: string) => {
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

  return (
    <section 
      id="pricing" 
      className="w-full bg-neutral-50/50 py-24 md:py-32 border-b border-[#EAEAEA] relative"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20" id="pricing-header">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#666666]">
              Pricing & Engagements
            </span>
          </div>
          <h2 className="font-display font-bold text-[36px] md:text-[54px] leading-[1.05] tracking-[-0.03em] text-[#111111] mb-6">
            Transparent retainer models. Built for ambitious speed.
          </h2>
          <p className="font-sans text-[18px] text-[#666666] leading-relaxed max-w-xl">
            Choose a model that aligns with your timeline. No hidden overhead, no long negotiations. Pause or cancel your designer subscription at any time.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10" id="pricing-tiers-grid">
          {PRICING_TIERS.map((tier, idx) => {
            const isHighlight = tier.name === "Product Sprint";
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`relative bg-[#FFFFFF] border rounded-xl p-8 flex flex-col justify-between min-h-[560px] transition-all duration-300 ${
                  isHighlight 
                    ? 'border-[#111111] shadow-md ring-1 ring-black/5' 
                    : 'border-[#EAEAEA] hover:border-neutral-400'
                }`}
                id={`pricing-card-${tier.name.toLowerCase().replace(" ", "-")}`}
              >
                {/* Popular Badge */}
                {isHighlight && (
                  <div className="absolute top-4 right-4 bg-[#111111] text-white text-[11px] font-mono tracking-widest uppercase px-3 py-1 rounded-sm">
                    Highly In Demand
                  </div>
                )}

                {/* Tier Meta */}
                <div>
                  <p className="font-mono text-[11px] text-[#666666] uppercase tracking-wider mb-2">
                    {tier.bestFor}
                  </p>
                  <h3 className="font-display font-bold text-[28px] text-[#111111] leading-none mb-4">
                    {tier.name}
                  </h3>
                  <p className="font-sans text-[14.5px] text-[#666666] leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-[#EAEAEA]">
                    <span className="font-display font-extrabold text-[40px] sm:text-[46px] text-[#111111] tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="font-sans text-[15px] text-[#666666]">
                        / {tier.period}
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#111111]/5 flex items-center justify-center text-[#111111]">
                          <Check size={11} strokeWidth={3} />
                        </div>
                        <span className="font-sans text-[14px] text-neutral-700 leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button actions */}
                <div className="mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleScrollToNav('estimator')}
                    className={`w-full py-4 rounded-full font-sans font-bold text-[14px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                      isHighlight
                        ? 'bg-[#111111] text-white hover:bg-black/90 shadow-sm'
                        : 'bg-white text-[#111111] border border-[#EAEAEA] hover:border-[#111111]'
                    }`}
                    id={`pricing-btn-${idx}`}
                  >
                    {tier.cta}
                    <ArrowRight size={15} />
                  </motion.button>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* FAQ helper row */}
        <div className="mt-16 pt-12 border-t border-[#EAEAEA] flex flex-col md:flex-row justify-between items-start gap-8" id="pricing-subtexts">
          <div>
            <h4 className="font-display font-medium text-[16px] text-[#111111] mb-1">Have custom enterprise constraints?</h4>
            <p className="font-sans text-[14px] text-[#666666]">We provide specific compliance SLA models, IP handoffs, and customized technical integrations.</p>
          </div>
          <div>
            <h4 className="font-display font-medium text-[16px] text-[#111111] mb-1">Can I toggle commitments?</h4>
            <p className="font-sans text-[14px] text-[#666666]">Yes, the retainer model allows you to pause service at any point when your pipeline is complete, resuming it whenever you require.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
