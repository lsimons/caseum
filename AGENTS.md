# Agent Instructions for caseum

> This file (`AGENTS.md`) is the canonical agent configuration. `CLAUDE.md` is a symlink to this file.

Documentation for the Caseum software architecture methodology. Combines C4, Actors, Stories, Events, UI, and Models views.

## Quick Reference

- **Build docs**: `uv run mkdocs build`
- **Serve locally**: `uv run mkdocs serve`
- **Deploy**: `uv run python publish_index.py`

## Structure

- `docs/` - MkDocs documentation source
  - `components/` - C4 component views
  - `actors/` - Role definitions
  - `stories/` - User stories and Gherkin
  - `events/` - Event storming
  - `ui/` - Wireframes
  - `models/` - TLM diagrams
  - `guides/` - Usage guides

## Commit Message Convention

Follow [Conventional Commits](https://conventionalcommits.org/):

**Format:** `type(scope): description`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `perf`, `revert`, `improvement`, `chore`

## Session Completion

Work is NOT complete until `git push` succeeds.

1. **Quality gates** (if docs changed):
   ```bash
   uv run mkdocs build
   ```

2. **Push**:
   ```bash
   git pull --rebase && git push
   git status  # must show "up to date with origin"
   ```

Never stop before pushing. If push fails, resolve and retry.
