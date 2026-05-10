import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { ErrorBoundary } from "@/shared/components";
import { ProtectedRoute, PublicRoute } from "@/shared/components/guards";
import { ROUTES } from "@/shared/constants";
import { DashboardSkeleton } from "@/features/dashboard/components/skeletons";

// Authentication
const LandingPage = lazy(() => import("@/features/authentication").then(m => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import("@/features/authentication").then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import("@/features/authentication").then(m => ({ default: m.SignupPage })));
const PasswordResetPage = lazy(() => import("@/features/authentication").then(m => ({ default: m.PasswordResetPage })));
const VerifyEmailPage = lazy(() => import("@/features/authentication").then(m => ({ default: m.VerifyEmailPage })));
const OAuthCallbackPage = lazy(() => import("@/features/authentication").then(m => ({ default: m.OAuthCallbackPage })));

// Layout & Dashboard
const AppLayout = lazy(() => import("@/features/dashboard").then(m => ({ default: m.AppLayout })));
const DashboardHomePage = lazy(() => import("@/features/dashboard").then(m => ({ default: m.DashboardHomePage })));

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

const SuspenseLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<DashboardSkeleton />}>
    {children}
  </Suspense>
);

const PublicSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<div className="min-h-screen bg-background animate-pulse" />}>
    {children}
  </Suspense>
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
        <SuspenseLayout>
          <AppLayout />
        </SuspenseLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: "resume-optimizer", element: <ResumeOptimizerPage /> },
      { path: "resume-builder", element: <ResumeBuilderPageV2 /> },
      { path: "documents", element: <DocumentsPage /> },
      { path: "resumes", element: <Navigate to={ROUTES.DASHBOARD.DOCUMENTS} replace /> },
      { path: "cover-letter", element: <CoverLetterGeneratorPage /> },
      { path: "job-tracker", element: <JobTrackerPage /> },
      { path: "analytics", element: <DashboardHomePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <SuspenseLayout>
          <AdminDashboardPage />
        </SuspenseLayout>
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
]);
