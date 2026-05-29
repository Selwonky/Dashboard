import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { CommonsProvider } from "@/lib/store";
import { CommonsShell } from "@/components/CommonsShell";
import { WelcomePage } from "@/pages/WelcomePage";
import { OnboardingPage } from "@/pages/OnboardingPage";
import { HomePage } from "@/pages/HomePage";
import { InboxPage } from "@/pages/InboxPage";
import { QueuePage } from "@/pages/QueuePage";
import { RecentPage } from "@/pages/RecentPage";
import { ObjectsPage } from "@/pages/ObjectsPage";
import { ObjectDetailPage } from "@/pages/ObjectDetailPage";
import { DepartmentPage } from "@/pages/DepartmentPage";
import { OrgChartPage } from "@/pages/OrgChartPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { EmailPage, CalendarPage, TasksPage, NotesPage } from "@/pages/ToolPages";

export default function App() {
  return (
    <CommonsProvider>
      <Toaster position="bottom-right" richColors closeButton />
      <BrowserRouter>
        <Routes>
          {/* Entry points (no shell). */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Every workspace page lives at /{page} under the Commons shell. */}
          <Route element={<CommonsShell />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/recent" element={<RecentPage />} />
            <Route path="/orgchart" element={<OrgChartPage />} />
            <Route path="/email" element={<EmailPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/objects/detail/:id" element={<ObjectDetailPage />} />
            <Route path="/objects/:type" element={<ObjectsPage />} />
            <Route path="/departments/:dept" element={<DepartmentPage />} />
            <Route path="/settings/:setting" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </CommonsProvider>
  );
}
