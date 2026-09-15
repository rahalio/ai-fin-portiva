import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, Envelope, getUserId, ListEnvelope, setSession } from './api';
import { roleHome } from './shell';

const ARCS = ['value_creation', 'operating_model', 'competition', 'public_policy'] as const;
type Arc = (typeof ARCS)[number];

type Initiative = {
  initiativeId: string;
  name: string;
  arcs: Arc[];
  economicBuyer: string;
  ownerUserId: string;
  sponsorUserId?: string;
  stage: string;
  status: string;
  outcomeMetric?: string;
  thesis?: string;
  overlapClusterId?: string;
  overlapFlag?: boolean;
  createdAt: string;
  updatedAt: string;
};

type Scorecard = {
  scorecardId: string;
  initiativeId: string;
  moatScore: number;
  talentScore: number;
  vendorRiskScore: number;
  policyRiskScore: number;
  competitivePosture: string;
  moatDeclaration: string;
  nicheLabel?: string;
  midTierWarning: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

type StageGate = {
  gateId: string;
  initiativeId: string;
  fromStage: string;
  toStage: string;
  killMetrics: string[];
  status: string;
  dueAt?: string;
  createdAt: string;
  updatedAt: string;
};

type FundingDecision = {
  decisionId: string;
  initiativeId: string;
  decision: string;
  rationale: string;
  amount?: number;
  currency?: string;
  decidedByUserId: string;
  dissentNotes?: string[];
  lockedAt: string;
  createdAt: string;
};

type OverlapCluster = {
  overlapClusterId: string;
  sharedOutcomeLabel: string;
  memberInitiativeIds: string[];
  capitalAtRisk: number;
  status: string;
  resolutionNotes?: string;
  createdAt: string;
  updatedAt: string;
};

type VendorDependency = {
  dependencyId: string;
  vendorName: string;
  capability: string;
  criticality: string;
  initiativeId: string;
  mitigationNotes?: string;
  createdAt: string;
  updatedAt: string;
};

type Concentration = {
  vendors: Array<{
    vendorName: string;
    dependencyCount: number;
    highCriticalityCount: number;
    initiativeIds: string[];
    capabilities?: string[];
  }>;
  totalDependencies?: number;
  generatedAt: string;
};

type PolicyWatchItem = {
  policyWatchId: string;
  topic: string;
  blocksScale: boolean;
  status: string;
  thresholdDays: number;
  initiativeIds: string[];
  openedAt?: string;
  waiverRationale?: string;
  createdAt: string;
  updatedAt: string;
};

type BoardPack = {
  boardPackId: string;
  period: string;
  spendTotal: number;
  expectedValue: number;
  riskSummary: string;
  stageDistribution: {
    explore: number;
    pilot: number;
    scale: number;
    coe_service: number;
  };
  status: string;
  publishedAt?: string;
  killCount?: number;
  openPolicyBlockers?: number;
  downloadUrl?: string;
  createdAt: string;
  updatedAt: string;
};

function errMsg(e: unknown) {
  return e instanceof Error ? e.message : String(e);
}

function actionUnavailable(e: unknown) {
  const status = (e as Error & { status?: number })?.status;
  if (status === 501) return 'This action is not implemented in the demo API yet (501).';
  return errMsg(e);
}

export function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState('admin@demo.local');
  const [password, setPassword] = useState('sandbox-admin-8');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const res = await api<
        Envelope<{
          accessToken: string;
          operator: { role: string; displayName: string; userId: string };
        }>
      >('/v0/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      setSession(
        res.data.accessToken,
        res.data.operator.role,
        res.data.operator.displayName,
        res.data.operator.userId,
      );
      nav(roleHome(res.data.operator.role));
    } catch (err) {
      setError(errMsg(err));
    }
  }

  return (
    <form className="login" onSubmit={onSubmit}>
      <div className="login-brand">Portiva</div>
      <h1>Fund, kill, and scale AI bets on evidence</h1>
      <p className="login-sub">Capital allocation chamber — not a pilot poster wall.</p>
      <label>
        Email
        <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="primary" type="submit">
        Sign in
      </button>
    </form>
  );
}

export function PortfolioHome() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [overlaps, setOverlaps] = useState<OverlapCluster[]>([]);
  const [policies, setPolicies] = useState<PolicyWatchItem[]>([]);
  const [gates, setGates] = useState<StageGate[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      api<ListEnvelope<Initiative>>('/v1/initiatives').catch(() => ({ data: { items: [] as Initiative[] } })),
      api<ListEnvelope<OverlapCluster>>('/v1/overlaps').catch(() => ({ data: { items: [] as OverlapCluster[] } })),
      api<ListEnvelope<PolicyWatchItem>>('/v1/policy-watch').catch(() => ({
        data: { items: [] as PolicyWatchItem[] },
      })),
      api<ListEnvelope<StageGate>>('/v1/gates').catch(() => ({ data: { items: [] as StageGate[] } })),
    ])
      .then(([ini, ovl, pol, gat]) => {
        setInitiatives(ini.data.items);
        setOverlaps(ovl.data.items.filter((o) => o.status === 'open'));
        setPolicies(pol.data.items.filter((p) => p.status === 'open' && p.blocksScale));
        setGates(gat.data.items.filter((g) => g.status === 'open'));
      })
      .catch((e) => setError(errMsg(e)));
  }, []);

  const arcHeat = useMemo(() => {
    return ARCS.map((arc) => ({
      arc,
      count: initiatives.filter((i) => i.arcs?.includes(arc)).length,
      active: initiatives.filter((i) => i.arcs?.includes(arc) && i.status === 'active').length,
    }));
  }, [initiatives]);

  const top = initiatives.slice(0, 8);

  return (
    <div>
      <h1 className="page-title">Portfolio</h1>
      <p className="page-lede">Where is AI capital, and which bets should die or scale this quarter?</p>
      {error ? <div className="banner kill">{error}</div> : null}

      <div className="arc-heat">
        {arcHeat.map((cell) => (
          <div key={cell.arc} className="arc-cell">
            <div className="arc-label">{cell.arc.replace(/_/g, ' ')}</div>
            <div className="arc-n">{cell.count}</div>
            <div className="muted">{cell.active} active</div>
          </div>
        ))}
      </div>

      <div className="kpis">
        <div className="kpi panel">
          <div className="muted">Open gates</div>
          <div className="n">{gates.length}</div>
        </div>
        <div className="kpi panel">
          <div className="muted">Policy blockers</div>
          <div className="n warn">{policies.length}</div>
        </div>
        <div className="kpi panel">
          <div className="muted">Open overlaps</div>
          <div className="n">{overlaps.length}</div>
        </div>
        <div className="kpi panel">
          <div className="muted">Initiatives</div>
          <div className="n">{initiatives.length}</div>
        </div>
      </div>

      <div className="home-grid">
        <div className="panel">
          <h2>Top initiatives</h2>
          {top.length === 0 && !error ? (
            <p className="muted">
              File first initiative with arc + buyer — <Link to="/initiatives">open initiatives</Link>
            </p>
          ) : null}
          {top.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Arc</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Buyer</th>
                </tr>
              </thead>
              <tbody>
                {top.map((i) => (
                  <tr key={i.initiativeId}>
                    <td>
                      <Link to={`/initiatives/${i.initiativeId}`}>{i.name}</Link>
                    </td>
                    <td>{(i.arcs ?? []).join(', ')}</td>
                    <td>
                      <span className="chip">{i.stage}</span>
                    </td>
                    <td>
                      <span className={`chip ${i.status === 'killed' ? 'kill' : i.status === 'scaled' ? 'pass' : ''}`}>
                        {i.status}
                      </span>
                    </td>
                    <td>{i.economicBuyer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>

        <div className="panel alerts-rail">
          <h2>Alerts</h2>
          {overlaps.length === 0 && policies.length === 0 && gates.length === 0 ? (
            <p className="muted">No unresolved overlaps or blockers.</p>
          ) : null}
          {overlaps.slice(0, 4).map((o) => (
            <div key={o.overlapClusterId} className="alert-item">
              <Link to="/overlaps">Overlap</Link> · {o.sharedOutcomeLabel}
              <div className="muted mono">at risk {o.capitalAtRisk}</div>
            </div>
          ))}
          {policies.slice(0, 4).map((p) => (
            <div key={p.policyWatchId} className="alert-item banner policy">
              <Link to="/policy">Policy</Link> · {p.topic}
            </div>
          ))}
          {gates.slice(0, 4).map((g) => (
            <div key={g.gateId} className="alert-item">
              <Link to="/gates">Gate due</Link> · <span className="mono">{g.gateId}</span>
            </div>
          ))}
          <div className="row-actions" style={{ marginTop: 12 }}>
            <Link className="btn-link" to="/board-packs">
              Generate board pack
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InitiativesPage() {
  const [rows, setRows] = useState<Initiative[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [arcFilter, setArcFilter] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [name, setName] = useState('');
  const [arc, setArc] = useState<Arc>('value_creation');
  const [buyer, setBuyer] = useState('');
  const [thesis, setThesis] = useState('');

  const load = useCallback(() => {
    api<ListEnvelope<Initiative>>('/v1/initiatives')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = rows.filter((r) => {
    if (arcFilter && !(r.arcs ?? []).includes(arcFilter as Arc)) return false;
    if (stageFilter && r.stage !== stageFilter) return false;
    return true;
  });

  async function create(e: FormEvent) {
    e.preventDefault();
    setMsg('');
    setError('');
    if (!arc || !buyer.trim()) {
      setError('Arc and economic buyer are mandatory.');
      return;
    }
    const ownerUserId = getUserId();
    if (!ownerUserId) {
      setError('Missing session user — sign in again.');
      return;
    }
    try {
      await api('/v1/initiatives', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          arcs: [arc],
          economicBuyer: buyer.trim(),
          ownerUserId,
          thesis: thesis.trim() || undefined,
          stage: 'explore',
        }),
      });
      setName('');
      setBuyer('');
      setThesis('');
      setMsg('Initiative filed.');
      load();
    } catch (err) {
      setError(errMsg(err));
    }
  }

  return (
    <div>
      <h1 className="page-title">Initiatives</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner pass">{msg}</div> : null}

      <form className="panel create-form" onSubmit={create}>
        <h2>File a bet</h2>
        <div className="form-grid">
          <label>
            Name
            <input required value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Strategic arc
            <select value={arc} onChange={(e) => setArc(e.target.value as Arc)} required>
              {ARCS.map((a) => (
                <option key={a} value={a}>
                  {a.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </label>
          <label>
            Economic buyer
            <input required value={buyer} onChange={(e) => setBuyer(e.target.value)} />
          </label>
          <label>
            Thesis
            <input value={thesis} onChange={(e) => setThesis(e.target.value)} />
          </label>
        </div>
        <button className="primary" type="submit">
          Create
        </button>
      </form>

      <div className="panel">
        <div className="row-actions filters">
          <label>
            Arc
            <select value={arcFilter} onChange={(e) => setArcFilter(e.target.value)}>
              <option value="">All</option>
              {ARCS.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label>
            Stage
            <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)}>
              <option value="">All</option>
              <option value="explore">explore</option>
              <option value="pilot">pilot</option>
              <option value="scale">scale</option>
              <option value="coe_service">coe_service</option>
            </select>
          </label>
        </div>
        {filtered.length === 0 && !error ? <p className="muted">No initiatives match.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Arcs</th>
              <th>Stage</th>
              <th>Status</th>
              <th>Buyer</th>
              <th>Overlap</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((i) => (
              <tr key={i.initiativeId}>
                <td>
                  <Link to={`/initiatives/${i.initiativeId}`}>{i.name}</Link>
                </td>
                <td>{(i.arcs ?? []).join(', ')}</td>
                <td>{i.stage}</td>
                <td>{i.status}</td>
                <td>{i.economicBuyer}</td>
                <td>{i.overlapFlag ? <span className="chip amber">flagged</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function InitiativeDetailPage() {
  const { initiativeId = '' } = useParams();
  const [row, setRow] = useState<Initiative | null>(null);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [decisions, setDecisions] = useState<FundingDecision[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    api<Envelope<Initiative>>(`/v1/initiatives/${initiativeId}`)
      .then((r) => setRow(r.data))
      .catch((e) => setError(errMsg(e)));
    api<Envelope<Scorecard>>(`/v1/initiatives/${initiativeId}/scorecard`)
      .then((r) => setScorecard(r.data))
      .catch(() => setScorecard(null));
    api<ListEnvelope<FundingDecision>>('/v1/decisions')
      .then((r) => setDecisions(r.data.items.filter((d) => d.initiativeId === initiativeId)))
      .catch(() => setDecisions([]));
  }, [initiativeId]);

  if (error) return <div className="banner kill">{error}</div>;
  if (!row) return <p className="muted">Loading…</p>;

  return (
    <div>
      <h1 className="page-title">{row.name}</h1>
      <div className="row-actions">
        {(row.arcs ?? []).map((a) => (
          <span key={a} className="chip brass">
            {a}
          </span>
        ))}
        <span className="chip">{row.stage}</span>
        <span className={`chip ${row.status === 'killed' ? 'kill' : ''}`}>{row.status}</span>
      </div>
      <div className="panel">
        <p>
          <strong>Economic buyer:</strong> {row.economicBuyer}
        </p>
        <p>{row.thesis || 'No thesis recorded.'}</p>
        <p className="muted mono">{row.initiativeId}</p>
      </div>
      <div className="panel">
        <h2>Scorecard</h2>
        {!scorecard ? (
          <p className="muted">
            Incomplete — <Link to="/scorecards">upsert scorecard</Link>
          </p>
        ) : (
          <div className="kpis">
            <div className="kpi">
              <div className="muted">Moat</div>
              <div className="n">{scorecard.moatScore}</div>
              <div className="mono">{scorecard.moatDeclaration}</div>
            </div>
            <div className="kpi">
              <div className="muted">Talent</div>
              <div className="n">{scorecard.talentScore}</div>
            </div>
            <div className="kpi">
              <div className="muted">Vendor risk</div>
              <div className="n">{scorecard.vendorRiskScore}</div>
            </div>
            <div className="kpi">
              <div className="muted">Policy risk</div>
              <div className="n">{scorecard.policyRiskScore}</div>
            </div>
          </div>
        )}
        {scorecard?.midTierWarning ? (
          <div className="banner amber">Mid-tier warning: scale-copy play without data moat (BR-7).</div>
        ) : null}
      </div>
      <div className="panel">
        <h2>Decision history</h2>
        {decisions.length === 0 ? <p className="muted">No locked decisions.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Decision</th>
              <th>Rationale</th>
              <th>Locked</th>
            </tr>
          </thead>
          <tbody>
            {decisions.map((d) => (
              <tr key={d.decisionId}>
                <td>
                  <span className={`chip ${d.decision === 'kill' ? 'kill' : d.decision === 'scale' ? 'pass' : ''}`}>
                    {d.decision}
                  </span>
                </td>
                <td>{d.rationale}</td>
                <td className="mono">{d.lockedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ScorecardsPage() {
  const [rows, setRows] = useState<Scorecard[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [initiativeId, setInitiativeId] = useState('');
  const [moatScore, setMoatScore] = useState(50);
  const [talentScore, setTalentScore] = useState(50);
  const [vendorRiskScore, setVendorRiskScore] = useState(50);
  const [policyRiskScore, setPolicyRiskScore] = useState(50);
  const [competitivePosture, setCompetitivePosture] = useState('niche');
  const [moatDeclaration, setMoatDeclaration] = useState('unique_data');
  const [nicheLabel, setNicheLabel] = useState('');
  const [midTierWarning, setMidTierWarning] = useState(false);

  const load = useCallback(() => {
    api<ListEnvelope<Scorecard>>('/v1/scorecards')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function upsert(e: FormEvent) {
    e.preventDefault();
    setError('');
    setMsg('');
    if (moatDeclaration === 'none' && !nicheLabel.trim()) {
      setError('Moat “none” requires a niche label (BR-2).');
      return;
    }
    try {
      await api('/v1/scorecards', {
        method: 'PUT',
        body: JSON.stringify({
          initiativeId: initiativeId.trim(),
          moatScore,
          talentScore,
          vendorRiskScore,
          policyRiskScore,
          competitivePosture,
          moatDeclaration,
          nicheLabel: nicheLabel.trim() || undefined,
          midTierWarning:
            midTierWarning || competitivePosture === 'mid_tier_risk',
        }),
      });
      setMsg('Scorecard saved.');
      load();
    } catch (err) {
      setError(errMsg(err));
    }
  }

  return (
    <div>
      <h1 className="page-title">Scorecards</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner pass">{msg}</div> : null}

      <form className="panel create-form" onSubmit={upsert}>
        <h2>Upsert scorecard</h2>
        <div className="form-grid">
          <label>
            Initiative id
            <input
              className="mono"
              required
              value={initiativeId}
              onChange={(e) => setInitiativeId(e.target.value)}
              placeholder="ini_…"
            />
          </label>
          <label>
            Moat declaration
            <select value={moatDeclaration} onChange={(e) => setMoatDeclaration(e.target.value)}>
              <option value="unique_data">unique_data</option>
              <option value="virtuous_cycle">virtuous_cycle</option>
              <option value="none">none</option>
            </select>
          </label>
          <label>
            Niche label
            <input value={nicheLabel} onChange={(e) => setNicheLabel(e.target.value)} />
          </label>
          <label>
            Competitive posture
            <select
              value={competitivePosture}
              onChange={(e) => {
                setCompetitivePosture(e.target.value);
                if (e.target.value === 'mid_tier_risk') setMidTierWarning(true);
              }}
            >
              <option value="scale">scale</option>
              <option value="niche">niche</option>
              <option value="mid_tier_risk">mid_tier_risk</option>
            </select>
          </label>
          <label>
            Moat score
            <input type="number" min={0} max={100} value={moatScore} onChange={(e) => setMoatScore(Number(e.target.value))} />
          </label>
          <label>
            Talent score
            <input
              type="number"
              min={0}
              max={100}
              value={talentScore}
              onChange={(e) => setTalentScore(Number(e.target.value))}
            />
          </label>
          <label>
            Vendor risk
            <input
              type="number"
              min={0}
              max={100}
              value={vendorRiskScore}
              onChange={(e) => setVendorRiskScore(Number(e.target.value))}
            />
          </label>
          <label>
            Policy risk
            <input
              type="number"
              min={0}
              max={100}
              value={policyRiskScore}
              onChange={(e) => setPolicyRiskScore(Number(e.target.value))}
            />
          </label>
        </div>
        <label className="check">
          <input type="checkbox" checked={midTierWarning} onChange={(e) => setMidTierWarning(e.target.checked)} />
          Mid-tier warning
        </label>
        {midTierWarning || competitivePosture === 'mid_tier_risk' ? (
          <div className="banner amber">Copying scale plays without data scale will flag at review (BR-7).</div>
        ) : null}
        <button className="primary" type="submit">
          Save scorecard
        </button>
      </form>

      <div className="panel">
        {rows.length === 0 && !error ? <p className="muted">No scorecards yet.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Initiative</th>
              <th>Moat</th>
              <th>Declaration</th>
              <th>Posture</th>
              <th>Warning</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.scorecardId}>
                <td>
                  <Link className="mono" to={`/initiatives/${s.initiativeId}`}>
                    {s.initiativeId}
                  </Link>
                </td>
                <td>{s.moatScore}</td>
                <td>
                  {s.moatDeclaration}
                  {s.nicheLabel ? ` · ${s.nicheLabel}` : ''}
                </td>
                <td>{s.competitivePosture}</td>
                <td>{s.midTierWarning ? <span className="chip amber">mid-tier</span> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function GatesPage() {
  const [rows, setRows] = useState<StageGate[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(() => {
    api<ListEnvelope<StageGate>>('/v1/gates')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function act(gateId: string, action: 'pass' | 'kill' | 'pause') {
    setMsg('');
    setError('');
    try {
      await api(`/v1/gates/${gateId}/${action}`, { method: 'POST', body: JSON.stringify({}) });
      setMsg(`Gate ${action} recorded.`);
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  const open = rows.filter((g) => g.status === 'open');

  return (
    <div>
      <h1 className="page-title">Stage gates</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner amber">{msg}</div> : null}
      <div className="panel">
        <h2>Queue</h2>
        {open.length === 0 && !error ? <p className="muted">No open gates.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Gate</th>
              <th>Initiative</th>
              <th>Path</th>
              <th>Kill metrics</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(open.length ? open : rows).map((g) => (
              <tr key={g.gateId}>
                <td className="mono">{g.gateId}</td>
                <td>
                  <Link className="mono" to={`/initiatives/${g.initiativeId}`}>
                    {g.initiativeId}
                  </Link>
                </td>
                <td>
                  {g.fromStage} → {g.toStage}
                </td>
                <td>
                  <ul className="compact-list">
                    {(g.killMetrics ?? []).map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {g.status === 'open' ? (
                    <div className="row-actions">
                      <button className="primary" type="button" onClick={() => act(g.gateId, 'pass')}>
                        Pass
                      </button>
                      <button className="danger" type="button" onClick={() => act(g.gateId, 'kill')}>
                        Kill
                      </button>
                      <button type="button" onClick={() => act(g.gateId, 'pause')}>
                        Pause
                      </button>
                    </div>
                  ) : (
                    <span className="chip">{g.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function DecisionsPage() {
  const [rows, setRows] = useState<FundingDecision[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api<ListEnvelope<FundingDecision>>('/v1/decisions')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  return (
    <div>
      <h1 className="page-title">Decision ledger</h1>
      <p className="page-lede">Append-only fund / kill / scale / pause — no edit affordance.</p>
      {error ? <div className="banner kill">{error}</div> : null}
      <div className="panel">
        {rows.length === 0 && !error ? <p className="muted">Ledger empty.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Initiative</th>
              <th>Decision</th>
              <th>Rationale</th>
              <th>Dissent</th>
              <th>Locked</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.decisionId} className="locked-row">
                <td className="mono">{d.decisionId}</td>
                <td>
                  <Link className="mono" to={`/initiatives/${d.initiativeId}`}>
                    {d.initiativeId}
                  </Link>
                </td>
                <td>
                  <span className={`chip locked ${d.decision === 'kill' ? 'kill' : d.decision === 'scale' ? 'pass' : ''}`}>
                    🔒 {d.decision}
                  </span>
                </td>
                <td>{d.rationale}</td>
                <td>{(d.dissentNotes ?? []).join('; ') || '—'}</td>
                <td className="mono">{d.lockedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function OverlapsPage() {
  const [rows, setRows] = useState<OverlapCluster[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(() => {
    api<ListEnvelope<OverlapCluster>>('/v1/overlaps')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function merge(cluster: OverlapCluster) {
    setMsg('');
    const surviving = cluster.memberInitiativeIds[0];
    try {
      await api(`/v1/overlaps/${cluster.overlapClusterId}/merge`, {
        method: 'POST',
        body: JSON.stringify({ survivingInitiativeId: surviving, notes: 'Merged via console' }),
      });
      setMsg('Cluster merged.');
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  async function killMember(cluster: OverlapCluster) {
    setMsg('');
    const initiativeId = cluster.memberInitiativeIds[1] ?? cluster.memberInitiativeIds[0];
    try {
      await api(`/v1/overlaps/${cluster.overlapClusterId}/kill-member`, {
        method: 'POST',
        body: JSON.stringify({ initiativeId, notes: 'Killed overlapping member' }),
      });
      setMsg('Member killed.');
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  async function keep(cluster: OverlapCluster) {
    setMsg('');
    try {
      await api(`/v1/overlaps/${cluster.overlapClusterId}/keep-differentiated`, {
        method: 'POST',
        body: JSON.stringify({ differentiationNotes: 'Documented differentiation retained.' }),
      });
      setMsg('Kept with differentiation.');
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  const open = rows.filter((r) => r.status === 'open');

  return (
    <div>
      <h1 className="page-title">Overlap clusters</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner amber">{msg}</div> : null}
      {open.length === 0 && !error ? <p className="muted">No unresolved overlaps.</p> : null}
      <div className="cluster-grid">
        {rows.map((c) => (
          <div key={c.overlapClusterId} className="panel cluster-card">
            <h2>{c.sharedOutcomeLabel}</h2>
            <p className="mono muted">{c.overlapClusterId}</p>
            <p>
              Capital at risk: <strong>{c.capitalAtRisk}</strong>
            </p>
            <p className="chip">{c.status}</p>
            <ul className="compact-list">
              {c.memberInitiativeIds.map((id) => (
                <li key={id}>
                  <Link className="mono" to={`/initiatives/${id}`}>
                    {id}
                  </Link>
                </li>
              ))}
            </ul>
            {c.status === 'open' ? (
              <div className="row-actions">
                <button className="primary" type="button" onClick={() => merge(c)}>
                  Merge
                </button>
                <button className="danger" type="button" onClick={() => killMember(c)}>
                  Kill member
                </button>
                <button type="button" onClick={() => keep(c)}>
                  Keep differentiated
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DependenciesPage() {
  const [rows, setRows] = useState<VendorDependency[]>([]);
  const [conc, setConc] = useState<Concentration | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<ListEnvelope<VendorDependency>>('/v1/dependencies')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
    api<Envelope<Concentration>>('/v1/dependencies/concentration')
      .then((r) => setConc(r.data))
      .catch(() => setConc(null));
  }, []);

  return (
    <div>
      <h1 className="page-title">Vendor concentration</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {!conc && rows.some((r) => !r.criticality) ? (
        <div className="banner amber">Unscored dependencies — concentration incomplete (BR-4).</div>
      ) : null}

      <div className="panel">
        <h2>Concentration</h2>
        {!conc || conc.vendors.length === 0 ? <p className="muted">No concentration rollup yet.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Deps</th>
              <th>High criticality</th>
              <th>Initiatives</th>
            </tr>
          </thead>
          <tbody>
            {(conc?.vendors ?? []).map((v) => (
              <tr key={v.vendorName}>
                <td>{v.vendorName}</td>
                <td>{v.dependencyCount}</td>
                <td className={v.highCriticalityCount ? 'error' : ''}>{v.highCriticalityCount}</td>
                <td className="mono">{v.initiativeIds.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="panel">
        <h2>Dependencies</h2>
        {rows.length === 0 && !error ? <p className="muted">No vendor dependencies recorded.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Capability</th>
              <th>Criticality</th>
              <th>Initiative</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.dependencyId}>
                <td>{d.vendorName}</td>
                <td>{d.capability}</td>
                <td>
                  <span className={`chip ${d.criticality === 'high' ? 'kill' : d.criticality === 'medium' ? 'amber' : ''}`}>
                    {d.criticality}
                  </span>
                </td>
                <td>
                  <Link className="mono" to={`/initiatives/${d.initiativeId}`}>
                    {d.initiativeId}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PolicyPage() {
  const [rows, setRows] = useState<PolicyWatchItem[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');

  const load = useCallback(() => {
    api<ListEnvelope<PolicyWatchItem>>('/v1/policy-watch')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function waive(id: string) {
    setMsg('');
    try {
      await api(`/v1/policy-watch/${id}/waive`, {
        method: 'POST',
        body: JSON.stringify({ rationale: 'Dual-control waiver from console' }),
      });
      setMsg('Waiver recorded.');
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  async function resolve(id: string) {
    setMsg('');
    try {
      await api(`/v1/policy-watch/${id}/resolve`, {
        method: 'POST',
        body: JSON.stringify({ notes: 'Cleared before scale' }),
      });
      setMsg('Blocker resolved.');
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  return (
    <div>
      <h1 className="page-title">Policy watch</h1>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner amber">{msg}</div> : null}
      <div className="panel">
        {rows.length === 0 && !error ? <p className="muted">Watchlist clear.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Topic</th>
              <th>Blocks scale</th>
              <th>Status</th>
              <th>Threshold</th>
              <th>Initiatives</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.policyWatchId}>
                <td>
                  {p.blocksScale && p.status === 'open' ? (
                    <span className="banner policy inline">{p.topic}</span>
                  ) : (
                    p.topic
                  )}
                </td>
                <td>{p.blocksScale ? 'yes' : 'no'}</td>
                <td>
                  <span className={`chip ${p.status === 'open' && p.blocksScale ? 'kill' : ''}`}>{p.status}</span>
                </td>
                <td>{p.thresholdDays}d</td>
                <td className="mono">{(p.initiativeIds ?? []).join(', ')}</td>
                <td>
                  {p.status === 'open' ? (
                    <div className="row-actions">
                      <button type="button" onClick={() => waive(p.policyWatchId)}>
                        Waive
                      </button>
                      <button className="primary" type="button" onClick={() => resolve(p.policyWatchId)}>
                        Resolve
                      </button>
                    </div>
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BoardPacksPage() {
  const [rows, setRows] = useState<BoardPack[]>([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const [period, setPeriod] = useState('2026-Q3');
  const [spendTotal, setSpendTotal] = useState(0);
  const [expectedValue, setExpectedValue] = useState(0);
  const [riskSummary, setRiskSummary] = useState('');

  const load = useCallback(() => {
    api<ListEnvelope<BoardPack>>('/v1/board-packs')
      .then((r) => setRows(r.data.items))
      .catch((e) => setError(errMsg(e)));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function create(e: FormEvent) {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      await api('/v1/board-packs', {
        method: 'POST',
        body: JSON.stringify({
          period: period.trim(),
          spendTotal,
          expectedValue,
          riskSummary: riskSummary.trim() || 'Risk summary pending concentration + policy excerpts.',
          stageDistribution: { explore: 0, pilot: 0, scale: 0, coe_service: 0 },
        }),
      });
      setMsg('Draft pack created.');
      load();
    } catch (err) {
      setError(errMsg(err));
    }
  }

  async function publish(id: string) {
    setMsg('');
    try {
      await api(`/v1/board-packs/${id}/publish`, { method: 'POST', body: JSON.stringify({}) });
      setMsg('Pack published.');
      load();
    } catch (e) {
      setMsg(actionUnavailable(e));
    }
  }

  return (
    <div>
      <h1 className="page-title">Board packs</h1>
      <p className="page-lede">One pack: spend, expected value, risk, stage — not split innovation/risk decks.</p>
      {error ? <div className="banner kill">{error}</div> : null}
      {msg ? <div className="banner pass">{msg}</div> : null}

      <form className="panel create-form" onSubmit={create}>
        <h2>Compose pack</h2>
        <div className="form-grid">
          <label>
            Period
            <input required value={period} onChange={(e) => setPeriod(e.target.value)} />
          </label>
          <label>
            Spend total
            <input type="number" min={0} value={spendTotal} onChange={(e) => setSpendTotal(Number(e.target.value))} />
          </label>
          <label>
            Expected value
            <input
              type="number"
              value={expectedValue}
              onChange={(e) => setExpectedValue(Number(e.target.value))}
            />
          </label>
          <label>
            Risk summary
            <input value={riskSummary} onChange={(e) => setRiskSummary(e.target.value)} />
          </label>
        </div>
        <button className="primary" type="submit">
          Create draft
        </button>
      </form>

      <div className="panel">
        {rows.length === 0 && !error ? <p className="muted">No packs yet.</p> : null}
        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Status</th>
              <th>Spend</th>
              <th>EV</th>
              <th>Kill / blockers</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.boardPackId}>
                <td>
                  <span className="display">{p.period}</span>
                  <div className="mono muted">{p.boardPackId}</div>
                </td>
                <td>
                  <span className={`chip ${p.status === 'published' ? 'pass' : ''}`}>{p.status}</span>
                </td>
                <td>{p.spendTotal}</td>
                <td>{p.expectedValue}</td>
                <td>
                  {p.killCount ?? 0} / {p.openPolicyBlockers ?? 0}
                </td>
                <td>
                  {p.status === 'draft' ? (
                    <button className="primary" type="button" onClick={() => publish(p.boardPackId)}>
                      Publish
                    </button>
                  ) : p.downloadUrl ? (
                    <a href={p.downloadUrl}>Download</a>
                  ) : (
                    <span className="muted">Published {p.publishedAt}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
