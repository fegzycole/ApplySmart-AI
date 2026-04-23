import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "@/shared/components";
import { ProtectedRoute, PublicRoute } from "@/shared/components/guards";

import {
  LandingPage,
  LoginPage,
  SignupPage,
  PasswordResetPage,
  VerifyEmailPage
} from "@/features/authentication";

import { TopNavLayout, DashboardHomePage } from "@/features/dashboard";

import {
  ResumeOptimizerPage,
  ResumeBuilderPageV2,
  ResumesPage
} from "@/features/resume";

import { CoverLetterGeneratorPage } from "@/features/cover-letter";
import { JobTrackerPage } from "@/features/job-tracker";
import { SettingsPage } from "@/features/settings";
import { PricingPage } from "@/features/pricing";
import { AdminDashboardPage } from "@/features/admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupPage />
      </PublicRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <TopNavLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: "resume-optimizer", element: <ResumeOptimizerPage /> },
      { path: "resume-builder", element: <ResumeBuilderPageV2 /> },
      { path: "resumes", element: <ResumesPage /> },
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
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
]);
