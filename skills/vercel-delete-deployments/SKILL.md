---
name: vercel-delete-deployments
description: Delete Vercel deployments by status (ERROR), deployment ID range, or bulk cleanup. Use when the user asks to remove failed/error Vercel deployments, clean up deployment history, prune previews, or delete deployments between two dpl_ IDs.
---

# Delete Vercel Deployments

Requires Vercel CLI, `vercel login`, and correct team scope (`vercel whoami`, `vercel teams switch <team>`).

**Scripts:** `skills/vercel-delete-deployments/scripts/` (or `.agents/skills/vercel-delete-deployments/scripts/` after `npx skills add`).

## Choose a workflow first

| User intent | Workflow |
|-------------|----------|
| Delete **failed / error** deployments | [Delete by status (ERROR)](#delete-by-status-error) — **preferred** |
| Delete **all deployments between two IDs** | [Delete by ID range](#delete-by-id-range-inclusive) |
| Delete **one** deployment | [Single delete](#single-delete) |

**Do not** rely on `vercel ls \| grep Error` as the primary method. Output uses ANSI symbols, mixes stderr, and breaks easily on Windows. Use the **API + Node scripts** instead.

---

## Setup (every run)

```bash
vercel whoami
# Note team slug, e.g. tryanon — use -S <team> on all commands below
```

Resolve **project name** (e.g. `aykansal`, `edutype`) from the user. Confirm it is the exact Vercel project, not a sibling (`edutype` ≠ `edutype-frontend`).

### Get `projectId` (`prj_...`)

```bash
vercel api "/v6/deployments?project=<project>&limit=1" -S <team> --raw
```

Read `projectId` from the first deployment object. Alternatively: `vercel project inspect <project> -S <team>` if available.

### Fetch full deployment history (required for bulk work)

```bash
cd <any-writable-dir>
vercel api "/v6/deployments?projectId=prj_xxxxx&limit=100" -S <team> --paginate --raw > vercel-deps.json
```

- **Never** use `--silent` on `vercel api` (suppresses all output).
- On Windows, write to a file in the **current directory**, not `/tmp`.
- Paginated output is usually a **JSON array** of deployments (not `{ deployments: [] }`).

Set `SKILL_SCRIPTS` to the scripts directory if not using the default repo layout:

```bash
SKILL_SCRIPTS=skills/vercel-delete-deployments/scripts   # repo root
# SKILL_SCRIPTS=.agents/skills/vercel-delete-deployments/scripts   # after npx skills add
```

---

## Delete by status (ERROR)

**Use this when the user wants failed deployments removed** (most common).

### 1. Fetch + filter

```bash
vercel api "/v6/deployments?projectId=prj_xxxxx&limit=100" -S <team> --paginate --raw > vercel-deps.json
node "${SKILL_SCRIPTS:-skills/vercel-delete-deployments/scripts}/filter-errors.mjs" vercel-deps.json
```

Optional: include canceled builds: add `--include-canceled`.

### 2. Review

Script prints `uid`, `state`, `target`, `created`, `url`. Confirm no production deployment you need is listed.

### 3. Delete

```bash
vercel rm $(cat vercel-error-ids.txt | tr '\n' ' ') -y -S <team>
```

If only one ID: `vercel rm dpl_xxxxx -y -S <team>`.

### 4. Verify

```bash
node "${SKILL_SCRIPTS:-skills/vercel-delete-deployments/scripts}/filter-errors.mjs" vercel-deps.json
vercel ls <project> -S <team> --non-interactive | head -20
```

Delete temp files when done: `vercel-deps.json`, `vercel-error-ids.txt`, `vercel-delete-ids.txt`.

---

## Delete by ID range (inclusive)

**Use when the user gives two boundary deployment IDs** (`dpl_A` … `dpl_B`). IDs are ordered by **`created` timestamp**, not alphabetically.

### 1. Confirm boundaries

```bash
vercel inspect dpl_START -S <team>
vercel inspect dpl_END -S <team>
```

### 2. List range

```bash
vercel api "/v6/deployments?projectId=prj_xxxxx&limit=100" -S <team> --paginate --raw > vercel-deps.json
node "${SKILL_SCRIPTS:-skills/vercel-delete-deployments/scripts}/list-range.mjs" dpl_START dpl_END vercel-deps.json
```

Writes `vercel-delete-ids.txt`.

### 3. Delete + verify

```bash
vercel rm $(cat vercel-delete-ids.txt | tr '\n' ' ') -y -S <team>
vercel ls <project> -S <team> --non-interactive | head -20
```

Deployments **newer** than the start ID or **older** than the end ID are not removed.

---

## Single delete

```bash
vercel inspect dpl_xxxxx -S <team>
vercel rm dpl_xxxxx -y -S <team>
```

Add `--safe` to skip deployments that still have an active alias.

---

## Safety checklist

- [ ] `-S <team>` on every command
- [ ] Exact project name (avoid similarly named projects in the same team)
- [ ] Inspect ERROR list for unexpected `production` rows before `vercel rm`
- [ ] Use `--safe` if aliased production must not be removed
- [ ] Re-fetch API after delete for verification (cached JSON is stale)

## Common failures

| Mistake | Fix |
|---------|-----|
| `vercel ls \| grep Error` misses old failures | Fetch full history via API + `filter-errors.mjs` |
| `vercel api` returns empty | Remove `--silent`; add `-S <team>`; redirect to `vercel-deps.json` |
| Scripts not found | Set `SKILL_SCRIPTS` or use path under `skills/vercel-delete-deployments/scripts/` |
| `vercel api /v9/projects/...` empty | Use `/v6/deployments?project=<name>&limit=1` for `projectId` |
| Boundary ID "not found" | Increase `limit`, ensure `--paginate`, both IDs exist in dump |
| Windows `execSync` empty stdout | Write API output to a file first, then run Node scripts |

## Quick reference

| Goal | Command |
|------|---------|
| One deployment | `vercel rm dpl_xxxxx -y -S <team>` |
| All ERROR in project | API fetch → `filter-errors.mjs` → `vercel rm $(cat vercel-error-ids.txt …)` |
| Range between two IDs | API fetch → `list-range.mjs` → `vercel rm $(cat vercel-delete-ids.txt …)` |
| Skip aliased prod | `vercel rm … --safe` |

## Install

```bash
npx skills add aykansal/aykansal --skill vercel-delete-deployments
```

Browse: [skills.sh](https://skills.sh)
