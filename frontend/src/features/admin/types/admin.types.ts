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
