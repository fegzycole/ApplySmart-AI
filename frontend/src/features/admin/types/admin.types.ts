// Frontend UI types
export interface StatCardData {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
}

export interface UserGrowthData {
  month: string;
  users: number;
  premium: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface SubscriptionData {
  name: string;
  value: number;
  color: string;
}

export interface AIUsageData {
  feature: string;
  count: number;
}

export interface RecentUser {
  name: string;
  email: string;
  plan: "Free" | "Starter" | "Pro" | "Career Boost";
  status: "Active" | "Trial";
  joined: string;
}

// Backend API response types (matching AdminServiceImpl DTOs)
export interface UserAdminDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  enabled: boolean;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  authProvider: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
  resumeCount: number;
  coverLetterCount: number;
  jobCount: number;
}

export interface AdminUsersResponse {
  content: UserAdminDto[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface OverviewStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  totalResumes: number;
  totalCoverLetters: number;
  totalJobs: number;
}

export interface UserGrowthChartData {
  labels: string[];
  data: number[];
}

export interface SubscriptionDistribution {
  freeUsers: number;
  proUsers: number;
  enterpriseUsers: number;
}

export interface AIUsageStats {
  resumeAnalyses: number;
  resumeOptimizations: number;
  coverLettersGenerated: number;
}

export interface RevenueChartData {
  labels: string[];
  data: number[];
}

export interface AdminAnalyticsResponse {
  overviewStats: OverviewStats;
  userGrowthData: UserGrowthChartData;
  subscriptionData: SubscriptionDistribution;
  aiUsageData: AIUsageStats;
  revenueData: RevenueChartData;
}
