/**
 * Decision View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { DecisionViewProps } from './types';

export function DecisionView({}: DecisionViewProps) {
  return (
    <div className="stub-note">
      <h1>Decision (generated stub)</h1>
      <p>
        Use the product console: <Link to="/decisions">Decision ledger</Link>.
      </p>
    </div>
  );
}
