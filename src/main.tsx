import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import App from './App.tsx';
import './index.css';

import PricingPlanPage from './pages/PricingPlanPage.tsx';
import Signup from './pages/Signup.tsx';
import FAQ from './pages/FAQ.tsx';
import CGV from './pages/CGV.tsx';
import Mentions from './pages/Mentions.tsx';
import Privacy from './pages/Privacy.tsx';
import Admin from './pages/Admin.tsx';

// 👇 nouvelles pages packs
import Basics from './pages/Basics.tsx';
import Standard from './pages/Standard.tsx';
import Premium from './pages/Premium.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Accueil */}
        <Route path="/" element={<App />} />

        {/* Packs : versions dédiées */}
        <Route path="/pricing/basics" element={<Basics />} />
        <Route path="/pricing/standard" element={<Standard />} />
        <Route path="/pricing/premium" element={<Premium />} />

        {/* Pack : route dynamique (conservée pour compat / SEO) */}
        <Route path="/pricing/:planSlug" element={<PricingPlanPage />} />

        {/* Compte / Admin */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />

        {/* Légal & FAQ */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/mentions-legales" element={<Mentions />} />
        <Route path="/confidentialite" element={<Privacy />} />

        {/* Fallback: redirige vers l'accueil si route inconnue */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
