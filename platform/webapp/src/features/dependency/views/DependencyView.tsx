/**
 * Dependency View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { DependencyViewProps } from './types';

export function DependencyView({}: DependencyViewProps) {
  return (
    <div className="stub-note">
      <h1>Dependency (generated stub)</h1>
      <p>
        Use the product console: <Link to="/dependencies">Dependencies</Link>.
      </p>
    </div>
  );
}
