
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import PricingPlanPage from './pages/PricingPlanPage.tsx';
import Signup from './pages/Signup.tsx';
import FAQ from './pages/FAQ.tsx';
import CGV from './pages/CGV.tsx';
import Mentions from './pages/Mentions.tsx';
import Privacy from './pages/Privacy.tsx';
import Admin from './pages/Admin.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pricing/:planSlug" element={<PricingPlanPage />} />
        <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/faq" element={<FAQ />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/mentions-legales" element={<Mentions />} />
        <Route path="/confidentialite" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
