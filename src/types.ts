export interface NavLink {
  label: string;
  href: string;
}

export interface ClientLogo {
  name: string;
  icon: string;
}

export interface CaseStudy {
  id: string;
  category: string;
  title: string;
  client: string;
  timeline: string;
  scope: string[];
  metrics: { value: string; label: string }[];
  overview: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  bestFor: string;
}

export interface EstimatorStep {
  id: number;
  question: string;
  type: 'single' | 'multiple';
  options: {
    label: string;
    description: string;
    multiplier: number;
    baseValue: number;
  }[];
}
