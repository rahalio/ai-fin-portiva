# Portiva

Executive AI opportunity portfolio and operating-model decision system for financial institutions.

**Specs:** [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md) · [OPENAPI.md](./OPENAPI.md)

Package scope: **`@portiva/*`**

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
                                                                                         platform/webapp
```

Domains: `identity`, `initiative`, `scorecard`, `gate`, `decision`, `dependency`, `policy-watch`, `board-pack`, `overlap`.

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths   # requires local .codegen/ (gitignored — copy from zero-apps-codegen-scaffold)
pnpm build
pnpm dev:api         # http://127.0.0.1:4000/health
pnpm dev:web         # Vite console
```

Demo login (web): `admin@demo.local` / `sandbox-admin-8`  
Demo API key: `X-API-Key: ddd_demo_local_dev_key` (scaffold default)

## Codegen rules

1. **New domain** → full multi-layer generate once (Mode A).
2. **YAML edit on existing domain** → regenerate **core only**, handwrite below (Mode B).
3. **Never commit or push `.codegen/`** — local toolchain only (see `.cursor/rules/codegen-never-commit.mdc`).

See `.cursor/skills/` and `docs/CODEGEN.md`.
