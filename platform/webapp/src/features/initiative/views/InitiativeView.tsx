/**
 * Initiative View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { InitiativeViewProps } from './types';

export function InitiativeView({}: InitiativeViewProps) {
  return (
    <div className="stub-note">
      <h1>Initiative (generated stub)</h1>
      <p>
        Use the product console: <Link to="/initiatives">Initiatives</Link>.
      </p>
    </div>
  );
}
