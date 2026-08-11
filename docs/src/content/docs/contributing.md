---
title: "Contributing to Caseum"
---

Thank you for investing your time in contributing to our project!

Any contributions you make are governed by our [License](/LICENSE.txt).

Please follow our [Code of Conduct](/code-of-conduct/) to keep our community approachable and respectable.

You could read the [open source contribution guide](https://opensource.guide/how-to-contribute/) for general advice on how to contribute.

Since this is a small hobby project, your contribution may not be noticed for a while if we are busy elsewhere. Sorry!

## Reporting a security problem

Please do not open a public issue for a security problem. Use the "Report a
vulnerability" button on the [Security tab](https://github.com/lsimons/caseum/security)
instead; private vulnerability reporting is enabled on the repository.

## The site

This site is built with [Astro Starlight](https://starlight.astro.build/).

Tools are exact-pinned in `.mise.toml`; run `mise install` once, then install the
git hooks (once per clone):

```bash
prek install -t pre-commit -t commit-msg
```

Then:

- `mise run docs-install` - Install the site dependencies (bun).
- `mise run docs-dev` - Start the live-reloading docs server.
- `mise run docs-build` - Build the documentation site into `docs/dist`.
- `mise run docs-check` - Run the Astro type and content check.
- `mise run lint` - Run the formatting, Markdown and secret-scanning hooks.
- `mise run lint-links` - Check every Markdown link (needs network).
- `mise run ci` - Run the same checks, in the same order, as CI.

Commit messages follow [Conventional Commits](https://conventionalcommits.org/)
(`type(scope): description`) and are checked by a commit-msg hook.

## Quarto

The [introduction presentation](/presentations/introduction.qmd) is built with [Quarto](https://quarto.org/).

Run `mise run docs-presentation` to render it. That task pins its own Quarto
version, so you do not need Quarto installed or listed in `.mise.toml` `[tools]`.

(The presentation is modified so rarely the outputs are checked into git.)
