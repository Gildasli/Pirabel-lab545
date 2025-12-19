
export interface SEOAuditResult {
  url: string;
  score: number;
  metaTags: {
    title: string;
    description: string;
    keywords: string;
    canonical?: string;
    robots?: string;
  };
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
    hierarchyScore: number;
  };
  images: {
    total: number;
    missingAlt: number;
  };
  performance: {
    loadSpeed: number;
    pageSize: string;
    requestCount: number;
  };
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  security: {
    https: boolean;
    sslExpiry?: string;
    securityHeaders: string[];
  };
  recommendations: {
    type: 'critical' | 'warning' | 'info';
    category: 'performance' | 'seo' | 'security' | 'content';
    message: string;
    suggestion: string;
    impact: number;
  }[];
}

export interface KeywordMetric {
  keyword: string;
  volume: number;
  kd: number; // Keyword Difficulty 0-100
  cpc: number;
  intent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  trend: number[];
}

export enum UserPlan {
  FREE = 'FREE',
  PRO = 'PRO',
  AGENCY = 'AGENCY'
}

export interface UserProfile {
  id: string;
  email: string;
  plan: UserPlan;
  creditsRemaining: {
    audits: number;
    keywords: number;
    aiWords: number;
  };
  role: 'USER' | 'ADMIN';
  joinedAt: string;
}

export interface AdminStats {
  totalUsers: number;
  mrr: number;
  totalAudits: number;
  conversionRate: number;
  activeSubscriptions: number;
}
