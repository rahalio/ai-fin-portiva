# Portiva OpenAPI

Canonical HTTP contracts live under [`packages/openapi-core/src/`](packages/openapi-core/src/).

## Domains

| Domain | Files | `x-domain` |
|--------|-------|------------|
| Identity | `identity.yaml` + `identity.schemas.yaml` | `idn` |
| Initiatives | `initiative.yaml` + `initiative.schemas.yaml` | `ini` |
| Scorecards | `scorecard.yaml` + `scorecard.schemas.yaml` | `scr` |
| Gates | `gate.yaml` + `gate.schemas.yaml` | `gat` |
| Decisions | `decision.yaml` + `decision.schemas.yaml` | `dec` |
| Dependencies | `dependency.yaml` + `dependency.schemas.yaml` | `dep` |
| Policy watch | `policy-watch.yaml` + `policy-watch.schemas.yaml` | `pol` |
| Board packs | `board-pack.yaml` + `board-pack.schemas.yaml` | `brd` |
| Overlaps | `overlap.yaml` + `overlap.schemas.yaml` | `ovl` |

Shared fragments: `common/` (envelopes, parameters, problem, responses, security, primitives).

## Commands

```bash
pnpm --filter @portiva/openapi-core lint
pnpm --filter @portiva/openapi-core bundle
```

Bundled outputs land in `packages/openapi-core/src/.bundled/`. Register domains in `.redocly.yaml` and `.codegen/zero-codegen.json` before generating core.
