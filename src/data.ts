import { CaseStudy, PricingTier, EstimatorStep } from "./types";

export const BRANDED_STORIES: CaseStudy[] = [
  {
    id: "linear-redesign",
    client: "Linear",
    category: "Product Strategy & Design",
    title: "Reimagining the world's most performant issue tracker",
    timeline: "6 Months • 2025",
    scope: ["Core UX Architecture", "High-Fidelity Interface Design", "Design Tokens System"],
    metrics: [
      { value: "40%", label: "Faster Task Creation" },
      { value: "99.8%", label: "Client Satisfaction" },
      { value: "2.4M", label: "Active Power Users" }
    ],
    overview: "We collaborated with the Linear engineering team to refine their core workflow navigation, reducing keystroke latency and introducing high-end visual micro-animations built directly for professional teams.",
    challenge: "Power users execute commands in milliseconds without mouse inputs. The interface had to scale to thousands of boards without custom render pipelines choking, while preserving an ultra-aesthetic, zero-noise interface.",
    solution: "A redesigned command menu layout with smart predictive indexing, refined keyboard shortcuts, and highly optimized virtual lists styled with tactile borders, responsive slate scales, and balanced typography.",
    impact: "The new task creation flow is now the benchmark for developer tools, achieving unmatched interactive speeds and widely praised on Awwwards and Twitter for its meticulous detail."
  },
  {
    id: "stripe-interfaces",
    client: "Stripe",
    category: "Interactive Prototyping",
    title: "Designing the next generation of global checkout elements",
    timeline: "4 Months • 2025",
    scope: ["Custom Micro-interactions", "Payment Flow Orchestration", "Accessibility Auditing"],
    metrics: [
      { value: "+18.4%", label: "Mobile Conversions" },
      { value: "135+", label: "Currencies Handled" },
      { value: "0ms", label: "Perceived Delay" }
    ],
    overview: "We worked on designing and prototyping seamless client-side single-click payments (Link) for Stripe, testing dozens of motion ease curves to find the perfect psychological triggers for trustworthy conversions.",
    challenge: "Form interactions often feel tedious. Payment forms, in particular, carry high user anxiety. The design had to reassure users instantly through spatial clarity, smooth text layout shifting, and premium tactile transitions.",
    solution: "A dynamic payment layout that morphs to present autofill details using high-end spring Physics and extremely refined typographic hierarchy. The layout collapses unnecessary fields beautifully.",
    impact: "The optimized Link payment sheet secured higher checkouts globally during beta and became the default element for Stripe's major merchants next quarter."
  },
  {
    id: "framer-canvas",
    client: "Framer",
    category: "Advanced Motion",
    title: "Structuring fluid animation parameters for custom web canvas layouts",
    timeline: "5 Months • 2025",
    scope: ["Motion Specification", "3D WebGL Transitions", "Performance Optimization"],
    metrics: [
      { value: "60 FPS", label: "Interactive Canvas Render" },
      { value: "+45%", label: "Engagement on Layouts" },
      { value: "12", label: "Custom Easings Developed" }
    ],
    overview: "We partnered with Framer to construct and test advanced canvas rendering guidelines and drag-and-drop handles that react in real-time to page resize and snapping guides.",
    challenge: "Snapping alignments require precise, instant feedback that doesn't feel jerky. It needed a sense of physics—rubbery resistance on boundaries, crisp click clicks on snaps, and smooth visual transitions.",
    solution: "Designed visual guide rules that fade softly based on snap proximity and layout hierarchy. Configured responsive custom easing matrices.",
    impact: "Created the standard layout snap feedback model now shipped worldwide in Framer, raising the bar for visual authoring applications."
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: "Design Partner",
    price: "$7,500",
    period: "month",
    description: "Perfect for venture-funded startups seeking ongoing product design, prototyping, and rapid execution.",
    features: [
      "Dedicated UI/UX Designer & Director",
      "Asynchronous collaboration in Slack & Notion",
      "Consistent 48-hour delivery on tasks",
      "Unlimited design revisions & requests",
      "Figma design system tokens & files included",
      "Direct communication & weekly calls"
    ],
    cta: "Secure Partnership",
    bestFor: "Venture-funded SaaS & Web3 startups"
  },
  {
    name: "Product Sprint",
    price: "$14,500",
    period: "project",
    description: "A fast-paced, high-intensity 4-week engagement to define, design, and prototype a brand new MVP.",
    features: [
      "Complete interactive Figma prototype",
      "Full Product strategy & branding guide",
      "Comprehensive design audit of legacy UI",
      "Technical handoff with React code scaffold",
      "2-hour alignment workshop on Week 1",
      "15 days of post-launch deployment support"
    ],
    cta: "Book Sprint Studio",
    bestFor: "Launching new MVPs & major features"
  },
  {
    name: "Enterprise Studio",
    price: "Custom",
    period: "negotiable",
    description: "Deep integrations for scaling companies needing complex digital products, user research, and custom codebases.",
    features: [
      "Full product designers and React developers",
      "Deep structural user research & data analysis",
      "Custom UI kits custom-tailored to tech stack",
      "Tailwind, custom CSS & Motion transitions",
      "Private channels with 15-minute response times",
      "Quarterly onsite alignment workshops"
    ],
    cta: "Inquire Privately",
    bestFor: "Established brands & scaling companies"
  }
];

export const ESTIMATOR_STEPS: EstimatorStep[] = [
  {
    id: 1,
    question: "What is your project's primary objective?",
    type: "single",
    options: [
      { label: "New MVP Launch", description: "Design an exceptional MVP product from zero to one.", multiplier: 1.0, baseValue: 8000 },
      { label: "Redesign & Scale", description: "Audit and overhaul an existing interface for heavy scale.", multiplier: 1.2, baseValue: 10000 },
      { label: "Interactive Prototype", description: "High-end motion and UI to Pitch to investors or board members.", multiplier: 0.8, baseValue: 6000 },
      { label: "Design System & Dev", description: "Establish dynamic token pipelines and clean React boilerplate.", multiplier: 1.4, baseValue: 12000 }
    ]
  },
  {
    id: 2,
    question: "Select the required platforms & scope:",
    type: "multiple",
    options: [
      { label: "Web Application", description: "A complex web-based portal or dashboard system.", multiplier: 1.0, baseValue: 0 },
      { label: "Mobile App (iOS/Android)", description: "Native or cross-platform mobile interfaces.", multiplier: 1.2, baseValue: 0 },
      { label: "Premium Landing Page", description: "Award-winning high-converting marketing presence.", multiplier: 0.7, baseValue: 0 },
      { label: "Motion & Interactions", description: "Advanced animations, micro-interactions, and custom charts.", multiplier: 1.3, baseValue: 0 }
    ]
  },
  {
    id: 3,
    question: "What is your preferred timeline?",
    type: "single",
    options: [
      { label: "Standard Studio Pace", description: "Balanced pacing with thorough testing (6-8 weeks).", multiplier: 1.0, baseValue: 0 },
      { label: "Express Sprint Pace", description: "All-hands-on-deck delivery with rapid workshops (3-4 weeks).", multiplier: 1.4, baseValue: 0 },
      { label: "Phased Retainer Support", description: "Iterative rollouts with monthly alignment.", multiplier: 0.9, baseValue: 0 }
    ]
  }
];
