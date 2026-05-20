import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ErrorBoundary } from "@/shared/components";
import { ProtectedRoute, PublicRoute } from "@/shared/components/guards";
import { ROUTES } from "@/shared/constants";
import { DashboardSkeleton } from "@/features/dashboard/components/skeletons";
import { JobTrackerSkeleton } from "@/features/job-tracker/components/skeletons";
import { DocumentsPageSkeleton } from "@/features/documents/components";
import { ResumeBuilderSkeleton } from "@/features/resume/components/skeletons";
import { AdminDashboardSkeleton } from "@/features/admin/components/skeletons";

// Authentication
const LandingPage = lazy(() => import("@/features/authentication/pages/LandingPage").then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import("@/features/authentication/pages/LoginPage").then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import("@/features/authentication/pages/SignupPage").then(m => ({ default: m.SignupPage })));
const PasswordResetPage = lazy(() => import("@/features/authentication/pages/PasswordResetPage").then(m => ({ default: m.PasswordResetPage })));
const VerifyEmailPage = lazy(() => import("@/features/authentication/pages/VerifyEmailPage").then(m => ({ default: m.VerifyEmailPage })));
const OAuthCallbackPage = lazy(() => import("@/features/authentication/pages/OAuthCallbackPage").then(m => ({ default: m.OAuthCallbackPage })));

// Layout & Dashboard
const AppLayout = lazy(() => import("@/shared/components/layout/AppLayout").then(m => ({ default: m.AppLayout })));
const DashboardHomePage = lazy(() => import("@/features/dashboard/pages/DashboardHomePage").then(m => ({ default: m.DashboardHomePage })));

// Features
const ResumeOptimizerPage = lazy(() => import("@/features/resume").then(m => ({ default: m.ResumeOptimizerPage })));
const ResumeBuilderPageV2 = lazy(() => import("@/features/resume").then(m => ({ default: m.ResumeBuilderPageV2 })));
const CoverLetterGeneratorPage = lazy(() => import("@/features/cover-letter").then(m => ({ default: m.CoverLetterGeneratorPage })));
const DocumentsPage = lazy(() => import("@/features/documents").then(m => ({ default: m.DocumentsPage })));
const JobTrackerPage = lazy(() => import("@/features/job-tracker").then(m => ({ default: m.JobTrackerPage })));
const SettingsPage = lazy(() => import("@/features/settings").then(m => ({ default: m.SettingsPage })));
const PricingPage = lazy(() => import("@/features/pricing").then(m => ({ default: m.PricingPage })));

// Admin
const AdminDashboardPage = lazy(() => import("@/features/admin").then(m => ({ default: m.AdminDashboardPage })));

// Fallback for public routes during JS chunk load
const PublicSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
    {children}
  </Suspense>
);

// Fallback for app pages that don't have a dedicated skeleton
// (form-only pages: optimizer, cover letter, settings)
const AppPageFallback = () => (
  <div className="w-full min-h-screen bg-[#fafafa] dark:bg-zinc-950 animate-pulse" />
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <PublicSuspense>
          <LandingPage />
        </PublicSuspense>
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <PublicSuspense>
          <LoginPage />
        </PublicSuspense>
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.OAUTH_CALLBACK,
    element: (
      <PublicSuspense>
        <OAuthCallbackPage />
      </PublicSuspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <PublicSuspense>
          <SignupPage />
        </PublicSuspense>
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/password-reset",
    element: (
      <PublicSuspense>
        <PasswordResetPage />
      </PublicSuspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/verify-email",
    element: (
      <PublicSuspense>
        <VerifyEmailPage />
      </PublicSuspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/pricing",
    element: (
      <PublicSuspense>
        <PricingPage />
      </PublicSuspense>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        {/* Suspense for the AppLayout shell chunk only */}
        <Suspense fallback={<DashboardSkeleton />}>
          <AppLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardHomePage />
          </Suspense>
        ),
      },
      {
        path: "resume-optimizer",
        element: (
          <Suspense fallback={<AppPageFallback />}>
            <ResumeOptimizerPage />
          </Suspense>
        ),
      },
      {
        path: "resume-builder",
        element: (
          <Suspense fallback={<ResumeBuilderSkeleton />}>
            <ResumeBuilderPageV2 />
          </Suspense>
        ),
      },
      {
        path: "documents",
        element: (
          <Suspense fallback={<DocumentsPageSkeleton />}>
            <DocumentsPage />
          </Suspense>
        ),
      },
      {
        path: "resumes",
        element: <Navigate to={ROUTES.DASHBOARD.DOCUMENTS} replace />,
      },
      {
        path: "cover-letter",
        element: (
          <Suspense fallback={<AppPageFallback />}>
            <CoverLetterGeneratorPage />
          </Suspense>
        ),
      },
      {
        path: "job-tracker",
        element: (
          <Suspense fallback={<JobTrackerSkeleton />}>
            <JobTrackerPage />
          </Suspense>
        ),
      },
      {
        path: "analytics",
        element: (
          <Suspense fallback={<DashboardSkeleton />}>
            <DashboardHomePage />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<AppPageFallback />}>
            <SettingsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<AdminDashboardSkeleton />}>
          <AdminDashboardPage />
        </Suspense>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
]);
