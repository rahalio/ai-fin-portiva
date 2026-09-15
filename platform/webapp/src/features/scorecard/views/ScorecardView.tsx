/**
 * Scorecard View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { ScorecardViewProps } from './types';

export function ScorecardView({}: ScorecardViewProps) {
  return (
    <div className="stub-note">
      <h1>Scorecard (generated stub)</h1>
      <p>
        Use the product console: <Link to="/scorecards">Scorecards</Link>.
      </p>
    </div>
  );
}
