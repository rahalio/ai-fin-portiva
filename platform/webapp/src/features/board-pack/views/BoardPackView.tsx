/**
 * BoardPack View — codegen stub.
 * Product UI lives at handwritten routes in App.tsx / pages.tsx.
 */

import { Link } from 'react-router-dom';
import { BoardPackViewProps } from './types';

export function BoardPackView({}: BoardPackViewProps) {
  return (
    <div className="stub-note">
      <h1>Board pack (generated stub)</h1>
      <p>
        Use the product console: <Link to="/board-packs">Board packs</Link>.
      </p>
    </div>
  );
}
