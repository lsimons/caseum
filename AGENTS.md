# Agent Instructions for caseum

> This file (`AGENTS.md`) is the canonical agent configuration. `CLAUDE.md` is a symlink to this file.

Documentation for the Caseum software architecture methodology. Combines C4, Actors, Stories, Events, UI, and Models views. Built with [Astro Starlight](https://starlight.astro.build/) (bun) and published to GitHub Pages at <https://lsimons.github.io/caseum/>.

## Quick Reference

Tooling is pinned in `mise.toml` (bun, prek, lychee, gitleaks); run `mise install` once. Then:

- **Install**: `mise run docs-install`
- **Serve locally**: `mise run docs-dev` -> <http://localhost:4321/caseum/>
- **Build**: `mise run docs-build`
- **Type/content check**: `mise run docs-check`
- **Screenshot a page**: `mise run docs-browser` once, then `mise run docs-screenshot out.png /caseum/guides/stages/`

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
- `mise.toml` - pinned tools and dev tasks (run with `mise run <task>`).
- `prek.toml` - git hooks (mdformat, markdownlint, lychee, gitleaks,
  commitlint); `prek install -t pre-commit -t commit-msg` once per clone.
- `.github/workflows/ci.yml` builds + astro-checks on push/PR;
  `deploy.yml` publishes `docs/dist` to GitHub Pages on push to `main`. The
  Pages source must be set to "GitHub Actions" (not "Deploy from a branch").

## Commit Message Convention

Follow [Conventional Commits](https://conventionalcommits.org/):

**Format:** `type(scope): description`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `perf`, `revert`, `improvement`, `chore`

## Session Completion

Work is NOT complete until every change is committed, pushed, and CI passes.

1. **Quality gates** (if docs changed):

   ```bash
   mise run docs-build && mise run docs-check
   ```

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
