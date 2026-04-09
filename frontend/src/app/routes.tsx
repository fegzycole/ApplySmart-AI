import { createBrowserRouter } from "react-router";
import { ErrorBoundary } from "@/shared/components";

import {
  LandingPage,
  LoginPage,
  SignupPage,
  PasswordResetPage
} from "@/features/authentication";

import { DashboardLayout, DashboardHomePage } from "@/features/dashboard";

import {
  ResumeOptimizerPage,
  ResumeBuilderPage,
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
    element: <LandingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/password-reset",
    element: <PasswordResetPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/pricing",
    element: <PricingPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <DashboardHomePage /> },
      { path: "resume-optimizer", element: <ResumeOptimizerPage /> },
      { path: "resume-builder", element: <ResumeBuilderPage /> },
      { path: "resumes", element: <ResumesPage /> },
      { path: "cover-letter", element: <CoverLetterGeneratorPage /> },
      { path: "job-tracker", element: <JobTrackerPage /> },
      { path: "analytics", element: <DashboardHomePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboardPage />,
    errorElement: <ErrorBoundary />,
  },
]);
