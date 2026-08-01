import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { DemoPage } from "./pages/DemoPage";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage, TermsPage } from "./pages/LegalPages";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SolutionPage } from "./pages/SolutionPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="solutions/appointment-booking" element={<SolutionPage solutionKey="appointment-booking" />} />
        <Route path="solutions/lead-qualification" element={<SolutionPage solutionKey="lead-qualification" />} />
        <Route path="solutions/human-takeover" element={<SolutionPage solutionKey="human-takeover" />} />
        <Route path="solutions/ai-customer-service" element={<SolutionPage solutionKey="ai-customer-service" />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
