/**
 * Overlap View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { OverlapViewProps } from './types';

export function OverlapView({}: OverlapViewProps) {
  return (
    <div className="stub-note">
      <h1>Overlap (generated stub)</h1>
      <p>
        Use the product console: <Link to="/overlaps">Overlaps</Link>.
      </p>
    </div>
  );
}
