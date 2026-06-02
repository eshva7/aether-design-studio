/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import StoriesSection from './components/StoriesSection';
import PricingSection from './components/PricingSection';
import ProjectEstimator from './components/ProjectEstimator';
import AboutSection from './components/AboutSection';

export default function App() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-white text-[#111111]"
      id="root-app-viewport"
    >
      {/* 80px High-end Navigation Bar */}
      <Navbar />

      {/* Main layout contents offset by Navbar height */}
      <main className="pt-[80px]" id="main-landing-content">
        
        {/* Full-screen Hero Section */}
        <Hero />

        {/* Gray logo strip */}
        <ClientLogos />

        {/* Stories portfolio with slide-over details */}
        <StoriesSection />

        {/* Linear/Stripe style pricing options */}
        <PricingSection />

        {/* Scoping/Timeline cost calculator with Intake Brief */}
        <ProjectEstimator />

        {/* Philosophy, Offices, and footer credits */}
        <AboutSection />

      </main>
    </motion.div>
  );
}
