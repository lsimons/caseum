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
- **Link check** (network): `mise run lint-links`
- **Audit workflows** (zizmor + actionlint): `mise run audit`
- **Remove build artifacts**: `mise run docs-clean`
- **Regenerate the favicon**: `mise run docs-favicon`
- **Screenshot a page**: `mise run docs-browser` once, then `mise run docs-screenshot out.png /caseum/guides/stages/`
- **Watch CI for this branch**: `mise run ci-watch`

`mise run lint` deliberately skips the lychee link check and `mise run lint-links`
runs it on its own; the comment in `.mise.toml` explains why.

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
- `.mise.toml` - pinned tools and dev tasks (run with `mise run <task>`).
- `prek.toml` - git hooks (mdformat, markdownlint, lychee, shellcheck, gitleaks,
  commitlint); `prek install -t pre-commit -t commit-msg` once per clone.
  `commitlint` is a `commit-msg` hook, so conventional-commit messages are gated
  **locally only** - CI runs the pre-commit hooks, not this one.
- `docs/agents/` - repository documentation for agents. It sits outside
  `docs/src/content/docs/`, so Astro does not publish it.
- `.github/workflows/ci.yml` runs four jobs on push/PR - build (install, astro
  check, build, base-path check), lint (the pre-commit prek hooks plus
  `mise run audit`), links (lychee), and zizmor. Note zizmor therefore runs
  **twice** per CI run: once as the pinned local binary inside `mise run audit`,
  once as `zizmorcore/zizmor-action`. That is deliberate - the two cross-check
  each other, which is exactly the failure mode where the action's `version:`
  input and the pinned binary drift apart. Do not "tidy" one away.
  `deploy.yml` publishes `docs/dist` to GitHub Pages on push to `main`; it runs
  the build **and the base-path check**, and deliberately does not run the link
  check, so a third-party link outage cannot block a deploy. A base-path
  regression *does* block it, on purpose. The Pages source must be set to
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
   runs. It does not include `mise run lint-links`; run that too if you changed
   any links.

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
