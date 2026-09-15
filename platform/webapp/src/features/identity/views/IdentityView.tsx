/**
 * Identity View — codegen stub.
 * Auth UI lives at /login (handwritten pages.tsx).
 */

import { Link } from 'react-router-dom';
import { IdentityViewProps } from './types';

export function IdentityView({}: IdentityViewProps) {
  return (
    <div className="stub-note">
      <h1>Identity (generated stub)</h1>
      <p>
        Use <Link to="/login">operator login</Link> for the Portiva console.
      </p>
    </div>
  );
}
