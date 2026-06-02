import { motion } from 'motion/react';

export default function ClientLogos() {
  const logos = [
    {
      name: "Google",
      svg: (
        <svg className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 240 80" fill="currentColor">
          <text x="10" y="55" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="42" letterSpacing="-2">G</text>
          <text x="45" y="55" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="34" letterSpacing="-2">oogle</text>
        </svg>
      )
    },
    {
      name: "Stripe",
      svg: (
        <svg className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 240 80" fill="currentColor">
          {/* Custom vector approximation of Stripe logo type */}
          <path d="M22 41.5c0-4.8 3.5-7.5 9-7.5 3.5 0 6.5 1 8 2v5c-1.5-1-4.2-1.8-7-1.8-3.5 0-4.8 1.5-4.8 3.2 0 4.5 11 3.5 11 11.2 0 5-3.5 7.8-9.5 7.8-3.8 0-7.2-1.2-9-2.5v-5.2c1.8 1.2 4.8 2.2 8 2.2 3.8 0 5-1.5 5-3.2 0-4.8-10.7-3.6-10.7-11.2zm28.8-14h5.8v7.2h-5.8v18.5c0 2.2 1 3 3 3 1 0 1.8-.2 2.5-.5V61c-1 .3-2.5.5-4 .5-4.5 0-7.2-2.2-7.2-7.2V34.8h-4.2v-5c1.8-.8 3.8-2 5-3.8h4.8v5h5.8zm11.5 4.5V29h6v4.8c1-3.2 3.8-5.3 7-5.3.8 0 1.5.1 2.2.3v6c-1-.3-2-.5-3-.5-4.2 0-6.2 2.8-6.2 7v19.8h-6V32zm20 3V29h6v4.5c1.8-3 5-5 8.8-5 1 0 1.8.2 2.5.5v5.8c-1-.3-2-.5-3-.5-4.2 0-7.5 2.5-8.2 6.5V61h-6.1V35zm18.5 6.5c0-7.5 5.5-13 13.5-13 8 0 12.8 5.5 12.8 13v1.8h-20c.2 4.2 3 6.8 7.5 6.8 3 0 5.2-1 7-2.5l3.2 3.8c-2.8 2.8-6.8 4.2-11 4.2-10 0-13-7.5-13-13.8zm13.2-4.5c0-3.5-1.8-5.5-4.8-5.5-2.8 0-4.8 2-5 5.5h9.8z" />
        </svg>
      )
    },
    {
      name: "Notion",
      svg: (
        <svg className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 240 80" fill="currentColor">
          <rect x="20" y="20" width="36" height="36" rx="6" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
          <text x="29" y="47" fontFamily="var(--font-sans), sans-serif" fontWeight="900" fontSize="26" fill="#FFFFFF">N</text>
          <text x="68" y="48" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="30" letterSpacing="-1">Notion</text>
        </svg>
      )
    },
    {
      name: "Framer",
      svg: (
        <svg className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 240 80" fill="currentColor">
          <path d="M20 18h32v16H36l16 16H20V34h16z" />
          <text x="64" y="47" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="29" letterSpacing="-1">Framer</text>
        </svg>
      )
    },
    {
      name: "Linear",
      svg: (
        <svg className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 240 80" fill="currentColor">
          <path d="M18 20h22v6H24v6h16v6H24v6h16v6H18z" />
          <text x="50" y="48" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="30" letterSpacing="-1.5">LINEAR</text>
        </svg>
      )
    },
    {
      name: "Shopify",
      svg: (
        <svg className="h-6 w-auto opacity-40 hover:opacity-100 transition-opacity duration-300" viewBox="0 0 240 80" fill="currentColor">
          <path d="M35 15l-13 4v34l18 6 12-16V22zM28 20l5 12h-9z" />
          <text x="58" y="48" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="30" letterSpacing="-1.5">shopify</text>
        </svg>
      )
    }
  ];

  return (
    <section 
      id="client-logos-section" 
      className="w-full bg-white border-y border-[#EAEAEA]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 md:py-14">
        <p className="text-center font-mono text-[11px] tracking-[0.2em] uppercase text-[#666666] mb-8 select-none">
          Collaborated with pioneering engineering & product teams
        </p>
        
        {/* Logos horizontal flex strip wrapper */}
        <div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-8 items-center justify-items-center select-none" 
          id="logos-grid"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center text-[#111111] hover:text-[#111111] cursor-pointer"
              whileHover={{ scale: 1.03 }}
              id={`logo-${logo.name.toLowerCase()}`}
            >
              {logo.svg}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
