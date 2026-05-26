import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CommonsProvider } from "@/lib/commons/store";
import { CommonsShell } from "@/components/commons/CommonsShell";
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

export default function App() {
  return (
    <CommonsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/commons" element={<CommonsShell />}>
            <Route index element={<HomePage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="queue" element={<QueuePage />} />
            <Route path="recent" element={<RecentPage />} />
            <Route path="orgchart" element={<OrgChartPage />} />
            <Route path="objects/detail/:id" element={<ObjectDetailPage />} />
            <Route path="objects/:type" element={<ObjectsPage />} />
            <Route path="departments/:dept" element={<DepartmentPage />} />
            <Route path="settings/:setting" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CommonsProvider>
  );
}
