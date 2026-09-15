---
name: portiva-codegen-hygiene
description: >-
  Portiva rule: never commit or push .codegen to GitHub. Use when committing,
  staging files, preparing PRs, or touching zero-codegen / .codegen paths.
---

# Portiva — `.codegen` must not be committed

## Rule

**Never commit or push `.codegen/` to GitHub.**

`.codegen/` holds the local `zero-codegen` toolchain and merged config for this machine. It is listed in `.gitignore` and must stay out of the remote history.

## Do

- Keep `.codegen/` on disk for `pnpm codegen:*` / Mode A–B generate locally.
- Document workflow in `docs/CODEGEN.md` and OpenAPI under `packages/openapi-core/`.
- Verify with `git status` / `git check-ignore -v .codegen` before commits.

## Do not

- `git add .codegen` or force-add ignored codegen paths.
- Remove `.codegen/` from `.gitignore`.
- Assume teammates have the same absolute paths in `.zero-codegen-merged.json` — run `pnpm codegen:paths` after copying the tool locally.
