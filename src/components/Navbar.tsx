import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
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
    <nav
      id="navbar-container"
      className={`fixed top-0 left-0 right-0 z-50 h-[80px] w-full bg-white/80 backdrop-blur-md transition-all duration-300 border-b ${
        isScrolled ? 'border-[#EAEAEA]/100 shadow-xs' : 'border-[#EAEAEA]/60'
      }`}
    >
      <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 flex items-center justify-between">
        {/* Left: Minimalist high-end abstract black logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="relative w-8 h-8 bg-[#111111] flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
            {/* Abstract negative space geometry inside */}
            <div className="absolute w-3 h-3 bg-white rotate-45 transform" />
          </div>
          <span className="font-display font-bold tracking-tight text-[18px] text-[#111111]">
            Eshva Visuals.
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-10" id="nav-center-menu">
          <button
            onClick={() => handleScrollTo('pricing')}
            className="font-sans text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors duration-200 cursor-pointer"
          >
            Pricing
          </button>
          <button
            onClick={() => handleScrollTo('stories')}
            className="font-sans text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors duration-200 cursor-pointer"
          >
            Stories
          </button>
          <button
            onClick={() => handleScrollTo('about')}
            className="font-sans text-[15px] font-medium text-[#666666] hover:text-[#111111] transition-colors duration-200 cursor-pointer"
          >
            About
          </button>
        </div>

        {/* Right: Black rounded button */}
        <div className="hidden md:flex items-center gap-4" id="nav-right-actions">
          <button
            onClick={() => handleScrollTo('estimator')}
            className="text-[14px] font-medium text-[#666666] hover:text-[#111111] transition-colors duration-200 mr-2"
          >
            Sizing Estimator
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleScrollTo('estimator')}
            className="font-sans text-[15px] font-bold px-6 py-2.5 rounded-full bg-[#111111] text-white hover:bg-black/90 transition-all duration-300 shadow-sm cursor-pointer"
          >
            Start Free
          </motion.button>
        </div>

        {/* Hamburger Mobile Icon */}
        <div className="flex md:hidden items-center" id="nav-mobile-trigger">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#111111] p-1.5 hover:bg-[#EAEAEA]/40 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[80px] left-0 w-full bg-white border-b border-[#EAEAEA] shadow-lg flex flex-col px-6 py-8 gap-5 z-40 md:hidden"
            id="mobile-nav-panel"
          >
            <button
              onClick={() => handleScrollTo('pricing')}
              className="text-left font-sans text-[16px] font-medium py-2 text-[#666666] hover:text-[#111111] transition-colors duration-200"
            >
              Pricing
            </button>
            <button
              onClick={() => handleScrollTo('stories')}
              className="text-left font-sans text-[16px] font-medium py-2 text-[#666666] hover:text-[#111111] transition-colors duration-200"
            >
              Stories
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-left font-sans text-[16px] font-medium py-2 text-[#666666] hover:text-[#111111] transition-colors duration-200"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo('estimator')}
              className="text-left font-sans text-[16px] font-medium py-2 text-[#666666] hover:text-[#111111] transition-colors duration-200 border-t border-[#EAEAEA] pt-4"
            >
              Budget Estimator
            </button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo('estimator')}
              className="font-sans text-[15px] font-bold w-full py-3.5 rounded-full bg-[#111111] text-white text-center mt-2 cursor-pointer"
            >
              Start Free
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
