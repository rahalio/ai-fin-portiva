import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import { clearSession, getDisplayName, getRole, getToken } from './api';

const NAV: Array<{ to: string; label: string }> = [
  { to: '/', label: 'Portfolio' },
  { to: '/initiatives', label: 'Initiatives' },
  { to: '/scorecards', label: 'Scorecards' },
  { to: '/overlaps', label: 'Overlaps' },
  { to: '/dependencies', label: 'Dependencies' },
  { to: '/policy', label: 'Policy watch' },
  { to: '/gates', label: 'Stage gates' },
  { to: '/decisions', label: 'Decisions' },
  { to: '/board-packs', label: 'Board packs' },
];

/** Product role → default home (WEBAPP.md). Sandbox roles fall through to portfolio. */
export function roleHome(role: string) {
  switch (role) {
    case 'cio':
      return '/dependencies';
    case 'sponsor':
      return '/initiatives';
    case 'pmo':
      return '/gates';
    case 'conduct':
      return '/policy';
    case 'board':
      return '/board-packs';
    case 'cso':
    case 'cfo':
    case 'admin':
    case 'analyst':
    case 'viewer':
    case 'ops':
    default:
      return '/';
  }
}

export function RequireAuth() {
  if (!getToken()) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export function Shell() {
  const role = getRole();
  const loc = useLocation();
  return (
    <div className="shell">
      <nav className="nav">
        <div className="brand">Portiva</div>
        {NAV.map((l) => {
          const active =
            l.to === '/' ? loc.pathname === '/' : loc.pathname.startsWith(l.to);
          return (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={active ? 'active' : ''}>
              {l.label}
            </NavLink>
          );
        })}
        <div className="nav-meta">
          {getDisplayName()} · {role}
        </div>
        <button
          type="button"
          className="nav-signout"
          onClick={() => {
            clearSession();
            window.location.href = '/login';
          }}
        >
          Sign out
        </button>
      </nav>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
