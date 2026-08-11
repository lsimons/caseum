# Agent Instructions for caseum

> This file (`AGENTS.md`) is the canonical agent configuration. `CLAUDE.md` is a symlink to this file.

Documentation for the Caseum software architecture methodology. Combines C4, Actors, Stories, Events, UI, and Models views. Built with [Astro Starlight](https://starlight.astro.build/) (bun) and published to GitHub Pages at <https://lsimons.github.io/caseum/>.

## Quick Reference

Tooling is exact-pinned in `.mise.toml` (actionlint, bun, gitleaks, lychee, prek,
shellcheck, zizmor); run `mise install` once. Then:

- **Everything CI runs**: `mise run ci`
- **Install**: `mise run docs-install`
- **Serve locally**: `mise run docs-dev` -> <http://localhost:4321/caseum/>
- **Build**: `mise run docs-build` (into `docs/dist`)
- **Preview the built site**: `mise run docs-preview`
- **Type/content check**: `mise run docs-check`
- **Lint** (prek hooks: formatting, markdown, secrets): `mise run lint`
- **External link check** (network, not a PR gate): `mise run lint-links`
- **Audit workflows** (zizmor + actionlint): `mise run audit`
- **Remove build artifacts**: `mise run docs-clean`
- **Regenerate the favicon**: `mise run docs-favicon`
- **Screenshot a page**: `mise run docs-browser` once, then `mise run docs-screenshot out.png /caseum/guides/stages/`
- **Watch CI for this branch**: `mise run ci-watch`

`mise run lint` deliberately skips the lychee link check and `mise run lint-links`
runs it on its own; the comment in `.mise.toml` explains why.

Internal links are checked by `mise run docs-verify` and gate every PR.
**External** links are checked only by `mise run lint-links`, which runs weekly
via `.github/workflows/links.yml` and on demand - never on a PR.

## Agent skills

### Git remote

Use GitHub with the `gh` CLI. The remote is <https://github.com/lsimons/caseum>.

### Issue tracker

Use GitHub issues via `gh`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use needs-triage, needs-info, ready-for-agent, ready-for-human. See
`docs/agents/issue-tracker.md`, which also covers `wontfix` as a closing label.

## Structure

This is a *project* site served under the `/caseum` base path (set in
`docs/astro.config.mjs`), so content links and image sources are written
root-relative (`/guides/foo/`, `/guides/foo.png`) and a small rehype plugin in
the config prepends the base at render time. Raw HTML `<img>` tags keep a
hardcoded `/caseum/...` src because that plugin does not visit raw HTML nodes.

- `docs/` - Astro Starlight site.
  - `src/content/docs/` - the Markdown pages (`components/`, `actors/`,
    `stories/`, `events/`, `ui/`, `models/`, `guides/`, `design/`, plus
    `index.md`, `contributing.md`, `code-of-conduct.md`). Each page needs a
    `title` in frontmatter.
  - `public/` - all non-Markdown assets (images, `.drawio`/`.xml` downloads,
    the reveal.js deck under `presentations/introduction/`, `LICENSE.txt`)
    served at the same URLs the old MkDocs site used, plus meta-refresh
    redirect stubs (`*.html`) mapping the old MkDocs page URLs to the new
    trailing-slash ones.
  - `public/favicon.svg` + `apple-touch-icon.png` - a honeycomb favicon
    generated from the logo palette (see `README.md`).
  - `astro.config.mjs` - site/base, the sidebar, and the rehype base-link
    plugin. `src/styles/custom.css` - brand accent color and floated-image
    styling.
  - `scripts/verify-base-path.sh` - guards the base-link plugin above. The
    plugin is wired in via `markdown.rehypePlugins`, which **Astro 7 has
    deprecated** in favour of passing plugins to `unified({...})` from
    `@astrojs/markdown-remark`. When that option is removed the plugin stops
    running, the build still succeeds, and every in-content link becomes a 404
    under `/caseum/`. Confirmed by disabling the plugin: the build reported
    "Complete!" while 117 links lost their prefix. `mise run docs-verify` fails
    on exactly that, and runs in both CI and the deploy workflow. **Migrating
    off the deprecated option is still to do.**
  - `scripts/verify-internal-links.sh` - resolves every internal link in the
    built site against the built site. Until this existed, a broken internal
    link was caught by **nothing**: `astro build` and `astro check` both pass
    (Astro 7 does not validate Markdown links and `starlight-links-validator` is
    not installed), `verify-base-path.sh` passes (a link to a missing page still
    gets its prefix), and lychee never requests internal links because
    `.lychee.toml` resolves them against the published domain and then excludes
    it. Also runs under `mise run docs-verify`.
- `.mise.toml` - pinned tools and dev tasks (run with `mise run <task>`).
- `prek.toml` - git hooks (mdformat, markdownlint, lychee, shellcheck, gitleaks,
  commitlint); `prek install -t pre-commit -t commit-msg` once per clone.
  `commitlint` is a `commit-msg` hook, so conventional-commit messages are gated
  **locally only** - CI runs the pre-commit hooks, not this one.
- `docs/agents/` - repository documentation for agents. It sits outside
  `docs/src/content/docs/`, so Astro does not publish it.
- `.github/workflows/ci.yml` runs three jobs on push/PR - build (install, astro
  check, build, then `mise run docs-verify` = base-path check + internal-link
  check), lint (the pre-commit prek hooks plus `mise run audit`), and zizmor.
  Note zizmor therefore runs **twice** per CI run: once as the pinned local
  binary inside `mise run audit`, once as `zizmorcore/zizmor-action`. That is
  deliberate - the two cross-check each other, which is exactly the failure mode
  where the action's `version:` input and the pinned binary drift apart. Do not
  "tidy" one away.
- `.github/workflows/links.yml` runs the **external** link check (lychee) weekly
  and on demand, **not** on pull requests. It was a PR gate and had to stop being
  one: it blocked PR #23 on four `agilealliance.org` links that time out from
  GitHub runner IPs while returning 301 in ~1.2s from anywhere else. A merge
  should not depend on a third party's rate limiter. Everything a change in this
  repository can actually break is still gated, by `docs-verify`.
- `deploy.yml` publishes `docs/dist` to GitHub Pages on push to `main`; it runs
  the build **and `docs-verify`**, and deliberately does not run the external
  link check, so a third-party outage cannot block a deploy. A base-path or
  internal-link regression *does* block it, on purpose - both are offline,
  deterministic, and about this repository's own content. The Pages source must be set to
  "GitHub Actions" (not "Deploy
  from a branch").

## Commit Message Convention

Follow [Conventional Commits](https://conventionalcommits.org/):

**Format:** `type(scope): description`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `perf`, `revert`, `improvement`, `chore`

## Session Completion

Work is NOT complete until every change is committed, pushed, and CI passes.

1. **Quality gates**:

   ```bash
   mise run ci
   ```

   This is the same set of checks, in the same order, that `.github/workflows/ci.yml`
   runs. It does not include `mise run lint-links` (external links, weekly job);
   run that too if you added or changed an external link.

2. **Commit**: stage and commit every change from this session. Do not leave the working tree dirty.

   ```bash
   git status              # review untracked and unstaged files
   git add <files>
   git commit -m "<type>(<scope>): <description>"
   ```

3. **Push**:

   ```bash
   git pull --rebase && git push
   git status  # must show "up to date with origin"
   ```

4. **Verify CI**:

   ```bash
   mise run ci-watch
   ```

   On failure, inspect with `gh run view --log-failed`, fix, commit, push, and re-watch.

Never stop before CI is green. If anything fails, resolve and retry.
