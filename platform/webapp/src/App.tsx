import { Navigate, Route, Routes } from 'react-router-dom';
import { RequireAuth, Shell } from './shell';
import {
  BoardPacksPage,
  DecisionsPage,
  DependenciesPage,
  GatesPage,
  InitiativeDetailPage,
  InitiativesPage,
  LoginPage,
  OverlapsPage,
  PolicyPage,
  PortfolioHome,
  ScorecardsPage,
} from './pages';

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<Shell />}>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/initiatives/:initiativeId" element={<InitiativeDetailPage />} />
          <Route path="/scorecards" element={<ScorecardsPage />} />
          <Route path="/overlaps" element={<OverlapsPage />} />
          <Route path="/dependencies" element={<DependenciesPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/gates" element={<GatesPage />} />
          <Route path="/decisions" element={<DecisionsPage />} />
          <Route path="/board-packs" element={<BoardPacksPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
