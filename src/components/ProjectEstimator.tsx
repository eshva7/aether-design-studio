import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ESTIMATOR_STEPS } from '../data';
import { EstimatorStep } from '../types';
import { Check, ArrowRight, ArrowLeft, RefreshCw, Sparkles, CheckCircle2, DollarSign, Calculator } from 'lucide-react';

export default function ProjectEstimator() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedSingle, setSelectedSingle] = useState<{ [stepId: number]: number }>({
    1: 0, // default first option for step 1
    3: 0, // default first option for step 3
  });
  const [selectedMultiple, setSelectedMultiple] = useState<number[]>([0]); // default first option for step 2
  const [estimate, setEstimate] = useState(8000);
  
  // Client submission form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load any existing draft from localStorage for robust state preservation
  useEffect(() => {
    try {
      const savedEstimator = localStorage.getItem('studio_estimator_draft');
      if (savedEstimator) {
        const parsed = JSON.parse(savedEstimator);
        setSelectedSingle(parsed.selectedSingle || { 1: 0, 3: 0 });
        setSelectedMultiple(parsed.selectedMultiple || [0]);
        setCurrentStepIndex(parsed.currentStepIndex || 0);
      }
    } catch (e) {
      console.warn("Storage reading error omitted:", e);
    }
  }, []);

  // Recalculate cost estimate dynamically in real-time
  useEffect(() => {
    // 1. Base values from Step 1 selection
    const step1Step = ESTIMATOR_STEPS[0];
    const step1ChoiceIndex = selectedSingle[1] ?? 0;
    const step1Choice = step1Step.options[step1ChoiceIndex];
    
    let baseSum = step1Choice?.baseValue || 8000;
    let multiplierMultiplier = step1Choice?.multiplier || 1.0;

    // 2. Base values from Step 2 multiple choices
    const step2Step = ESTIMATOR_STEPS[1];
    selectedMultiple.forEach(idx => {
      const option = step2Step.options[idx];
      if (option) {
        baseSum += option.baseValue;
        if (option.multiplier !== 1.0) {
          multiplierMultiplier *= option.multiplier;
        }
      }
    });

    // 3. Multiplier from Step 3 selection
    const step3Step = ESTIMATOR_STEPS[2];
    const step3ChoiceIndex = selectedSingle[3] ?? 0;
    const step3Choice = step3Step.options[step3ChoiceIndex];
    if (step3Choice) {
      multiplierMultiplier *= step3Choice.multiplier;
    }

    const calculatedValue = Math.round(baseSum * multiplierMultiplier);
    setEstimate(calculatedValue);

    // Save configuration draft to localStorage for persistence
    try {
      localStorage.setItem('studio_estimator_draft', JSON.stringify({
        selectedSingle,
        selectedMultiple,
        currentStepIndex
      }));
    } catch (e) {
      // ignore
    }
  }, [selectedSingle, selectedMultiple, currentStepIndex]);

  const handleSingleSelect = (stepId: number, optionIdx: number) => {
    setSelectedSingle(prev => ({
      ...prev,
      [stepId]: optionIdx
    }));
  };

  const handleMultipleToggle = (optionIdx: number) => {
    setSelectedMultiple(prev => {
      if (prev.includes(optionIdx)) {
        // preserve at least one
        if (prev.length === 1) return prev;
        return prev.filter(idx => idx !== optionIdx);
      } else {
        return [...prev, optionIdx];
      }
    });
  };

  const nextStep = () => {
    if (currentStepIndex < ESTIMATOR_STEPS.length) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const resetEstimator = () => {
    setSelectedSingle({ 1: 0, 3: 0 });
    setSelectedMultiple([0]);
    setCurrentStepIndex(0);
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setBrief('');
    localStorage.removeItem('studio_estimator_draft');
  };

  const handleSubmitBrief = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsSubmitting(true);
    // Simulate real high-end database submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      localStorage.removeItem('studio_estimator_draft');
    }, 1500);
  };

  const currentStep: EstimatorStep | undefined = ESTIMATOR_STEPS[currentStepIndex];

  return (
    <section 
      id="estimator" 
      className="w-full bg-white py-24 md:py-32 border-b border-[#EAEAEA]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16" id="estimator-header">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#666666]">
                Interactive Sizing Engine
              </span>
            </div>
            <h2 className="font-anton uppercase text-[32px] md:text-[48px] leading-[1.1] tracking-[0.01em] text-[#111111] mb-6">
              Estimate your product design & dev scope instantly.
            </h2>
            <p className="font-sans text-[18px] text-[#666666] leading-relaxed">
              We value clarity over lengthy negotiations. Use our interactive engine to construct your scope blueprint and see an immediate estimated budget.
            </p>
          </div>

          <div 
            className="flex items-center gap-4 bg-neutral-50 px-6 py-4 rounded-xl border border-[#EAEAEA] lg:max-w-xs w-full"
            id="estimator-badge"
          >
            <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center rounded-lg">
              <Calculator size={18} />
            </div>
            <div>
              <p className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">Pricing Policy</p>
              <p className="font-sans text-[13px] text-[#111111] font-medium leading-tight">Fixed pricing, zero markup, source files included.</p>
            </div>
          </div>
        </div>

        {/* Dynamic Interactive Panel */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
          id="estimator-live-panel"
        >
          
          {/* Question / Form Area (LHS 7 Columns) */}
          <div className="lg:col-span-7 bg-neutral-50/50 border border-[#EAEAEA] rounded-2xl p-6 sm:p-10 flex flex-col justify-between min-h-[480px]">
            <AnimatePresence mode="wait">
              
              {/* If we are answering steps */}
              {currentStepIndex < ESTIMATOR_STEPS.length && currentStep && (
                <motion.div
                  key={currentStep.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full"
                  id={`estimator-step-block-${currentStep.id}`}
                >
                  <div>
                    {/* Progress Indicator */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-[11px] text-neutral-400">
                        STEP {currentStep.id} OF {ESTIMATOR_STEPS.length}
                      </span>
                      <div className="flex gap-1.5">
                        {ESTIMATOR_STEPS.map((_, sIdx) => (
                          <div 
                            key={sIdx} 
                            className={`h-1 rounded-full transition-all duration-300 ${
                              sIdx === currentStepIndex ? 'w-6 bg-[#111111]' : 'w-2 bg-[#EAEAEA]'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Question title */}
                    <h3 className="font-display font-semibold text-[22px] sm:text-[26px] text-[#111111] tracking-tight mb-8">
                      {currentStep.question}
                    </h3>

                    {/* Options list */}
                    <div className="space-y-4 mb-10">
                      {currentStep.options.map((option, idx) => {
                        const isSelected = currentStep.type === 'single'
                          ? selectedSingle[currentStep.id] === idx
                          : selectedMultiple.includes(idx);

                        return (
                          <div
                            key={option.label}
                            onClick={() => {
                              if (currentStep.type === 'single') {
                                handleSingleSelect(currentStep.id, idx);
                              } else {
                                handleMultipleToggle(idx);
                              }
                            }}
                            className={`flex items-start justify-between p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none ${
                              isSelected 
                                ? 'bg-white border-[#111111] shadow-xs' 
                                : 'bg-white/40 border-[#EAEAEA] hover:border-neutral-400'
                            }`}
                          >
                            <div className="flex items-start gap-4 pr-4">
                              <div className={`mt-1 w-5 h-5 rounded-md flex items-center justify-center border ${
                                isSelected 
                                  ? 'bg-[#111111] border-[#111111] text-white' 
                                  : 'bg-white border-neutral-300'
                              }`}>
                                {isSelected && <Check size={12} strokeWidth={4} />}
                              </div>
                              <div>
                                <h4 className="font-sans font-bold text-[15px] text-[#111111] leading-tight mb-1">
                                  {option.label}
                                </h4>
                                <p className="font-sans text-[13px] text-[#666666] leading-relaxed">
                                  {option.description}
                                </p>
                              </div>
                            </div>

                            {/* Faint context indicator */}
                            {option.multiplier > 1.0 && (
                              <span className="font-mono text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-sm">
                                +{(option.multiplier - 1).toFixed(1)}x complexity
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Footer */}
                  <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-6 gap-4">
                    <button
                      onClick={prevStep}
                      disabled={currentStepIndex === 0}
                      className="px-6 py-3 rounded-full font-sans font-bold text-[14px] border border-[#EAEAEA] bg-white hover:border-[#111111] transition-all flex items-center gap-2 text-[#666666] hover:text-black disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <ArrowLeft size={16} />
                      Back
                    </button>

                    <button
                      onClick={nextStep}
                      className="px-8 py-3 rounded-full font-sans font-bold text-[14px] bg-[#111111] text-white hover:bg-black/90 transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      Configure Brief
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Submission intake client Brief */}
              {currentStepIndex === ESTIMATOR_STEPS.length && !isSubmitted && (
                <motion.div
                  key="submit-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between h-full"
                  id="estimator-brief-form"
                >
                  <form onSubmit={handleSubmitBrief} className="space-y-6">
                    <div>
                      <span className="font-mono text-[11px] text-neutral-400 block mb-2 uppercase">
                        Configuration Finalized
                      </span>
                      <h3 className="font-display font-semibold text-[24px] text-[#111111] tracking-tight mb-4">
                        Lock in your blueprint & secure a consultation slot
                      </h3>
                      <p className="font-sans text-[14px] text-[#666666] leading-relaxed mb-6">
                        We have prepared your custom budget and scoping configuration. Tell us who you are, and our design director will review your brief with you.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="client-name" className="block font-mono text-[11px] text-[#111111] uppercase tracking-wider mb-2">
                          Your Full Name *
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Figma Founder"
                          className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:border-[#111111] focus:ring-1 focus:ring-black outline-none font-sans text-[14px] transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="client-email" className="block font-mono text-[11px] text-[#111111] uppercase tracking-wider mb-2">
                          Professional Email *
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@startup.co"
                          className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:border-[#111111] focus:ring-1 focus:ring-black outline-none font-sans text-[14px] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="client-brief" className="block font-mono text-[11px] text-[#111111] uppercase tracking-wider mb-2">
                        Project Brief & Requirements (Optional)
                      </label>
                      <textarea
                        id="client-brief"
                        rows={3}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder="Tell us about your product, timeline constraints, or existing codebase..."
                        className="w-full px-4 py-3 bg-white border border-[#EAEAEA] rounded-xl focus:border-[#111111] focus:ring-1 focus:ring-black outline-none font-sans text-[14px] transition-all resize-none"
                      />
                    </div>

                    {/* Form actions */}
                    <div className="flex items-center justify-between border-t border-[#EAEAEA] pt-6 gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 rounded-full font-sans font-bold text-[14px] border border-[#EAEAEA] bg-white hover:border-[#111111] transition-all flex items-center gap-2 text-[#666666] hover:text-black cursor-pointer"
                      >
                        <ArrowLeft size={16} />
                        Review Choices
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting || !name || !email}
                        className="px-8 py-3 rounded-full font-sans font-bold text-[14px] bg-[#111111] text-white hover:bg-black/90 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50 disabled:pointer-events-none w-full sm:w-auto"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw size={15} className="animate-spin" />
                            Establishing Pipeline...
                          </>
                        ) : (
                          <>
                            Submit Configuration
                            <Sparkles size={15} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 5: Success submission screen */}
              {isSubmitted && (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full py-8"
                  id="estimator-success-layout"
                >
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  
                  <h3 className="font-display font-extrabold text-[28px] text-[#111111] leading-tight mb-3">
                    Project pipeline initiated!
                  </h3>
                  
                  <p className="font-sans text-[15px] text-[#666666] leading-relaxed max-w-md mb-8">
                    Thank you <strong className="text-[#111111]">{name}</strong>. We have securely saved your configuration brief (estimated budget: <strong className="text-[#111111]">${estimate.toLocaleString()}</strong>). Our Design Director will reach out to <strong className="text-[#111111]">{email}</strong> within 1 business hour.
                  </p>

                  <div className="bg-neutral-100/50 rounded-xl p-5 border border-[#EAEAEA] text-left w-full max-w-sm mb-8">
                    <p className="font-mono text-[9px] text-[#666666] uppercase tracking-wider mb-2">Intake Receipt</p>
                    <div className="flex justify-between items-center py-1.5 border-b border-[#EAEAEA] text-[13px]">
                      <span className="text-neutral-500">Intake ID:</span>
                      <span className="font-mono text-neutral-800">STUDIO_#{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 text-[13px]">
                      <span className="text-neutral-500">Direct Contact:</span>
                      <span className="text-neutral-800">rajwarbhabesh7@gmail.com</span>
                    </div>
                  </div>

                  <button
                    onClick={resetEstimator}
                    className="px-6 py-2.5 rounded-full font-mono text-[12px] uppercase tracking-widest text-[#666666] hover:text-black border border-neutral-200 bg-white hover:bg-neutral-50 transition-all cursor-pointer"
                  >
                    Start Alternative Scoping
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Dynamic Invoice Calculation / Summary Column (RHS 5 Columns) */}
          <div className="lg:col-span-5 bg-[#111111] text-white rounded-2xl p-6 sm:p-10 flex flex-col justify-between border border-[#111111]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-white animate-pulse" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                    Real-time Estimate
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-white/10 text-white px-2 py-0.5 rounded-sm">
                  v1.2 active
                </span>
              </div>

              {/* Major Cost Value display */}
              <div className="mb-8">
                <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest mb-1">Estimated Budget</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-[24px] text-neutral-400 font-light">$</span>
                  <span className="font-display font-extrabold text-[44px] sm:text-[56px] text-white leading-none tracking-tight">
                    {estimate.toLocaleString()}
                  </span>
                  <span className="font-sans text-[14px] text-neutral-400 ml-1">USD</span>
                </div>
                <p className="font-sans text-[12.5px] text-neutral-400/80 mt-1">
                  *Based on immediate complexity calculations.
                </p>
              </div>

              {/* Invoice lines item summary */}
              <div className="space-y-4 mb-8">
                <p className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">Blueprint Items</p>
                
                {/* Line 1: Objective */}
                <div className="flex justify-between items-start text-[14px] py-2 border-b border-white/5">
                  <div>
                    <p className="text-white font-medium">
                      {ESTIMATOR_STEPS[0].options[selectedSingle[1] ?? 0]?.label}
                    </p>
                    <p className="text-[12px] text-neutral-400">Objective Type</p>
                  </div>
                  <span className="font-mono font-bold text-white/90">
                    ${ESTIMATOR_STEPS[0].options[selectedSingle[1] ?? 0]?.baseValue.toLocaleString()}
                  </span>
                </div>

                {/* Line 2: Scope Items */}
                <div className="flex justify-between items-start text-[14px] py-1 border-b border-white/5">
                  <div className="max-w-[70%]">
                    <p className="text-white font-medium">Platforms Selected</p>
                    <p className="text-[12px] text-neutral-400 line-clamp-1">
                      {selectedMultiple.map(idx => ESTIMATOR_STEPS[1].options[idx]?.label).join(', ')}
                    </p>
                  </div>
                  <span className="font-mono font-bold text-white/90">
                    +${selectedMultiple.reduce((acc, idx) => acc + (ESTIMATOR_STEPS[1].options[idx]?.baseValue || 0), 0).toLocaleString()}
                  </span>
                </div>

                {/* Line 3: Timeline Complexity */}
                <div className="flex justify-between items-start text-[14px] py-1">
                  <div>
                    <p className="text-white font-medium">
                      {ESTIMATOR_STEPS[2].options[selectedSingle[3] ?? 0]?.label}
                    </p>
                    <p className="text-[12px] text-neutral-400">Delivery Speed</p>
                  </div>
                  <span className="font-mono text-emerald-400">
                    x{ESTIMATOR_STEPS[2].options[selectedSingle[3] ?? 0]?.multiplier}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom SLA guarantee banner */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10 mt-6 text-left">
              <h4 className="font-display font-medium text-[14px] text-white flex items-center gap-1.5 mb-2">
                <DollarSign size={14} className="text-emerald-400" />
                Guaranteed Satisfaction
              </h4>
              <p className="font-sans text-[12.5px] text-[#666666] leading-relaxed">
                If the resulting static React scaffold and Figma tokens do not exceed expectation within the first sprint, we revise without caps or offer a 100% money back arrangement.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
