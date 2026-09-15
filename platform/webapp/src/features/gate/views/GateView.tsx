/**
 * Gate View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { GateViewProps } from './types';

export function GateView({}: GateViewProps) {
  return (
    <div className="stub-note">
      <h1>Gate (generated stub)</h1>
      <p>
        Use the product console: <Link to="/gates">Stage gates</Link>.
      </p>
    </div>
  );
}
