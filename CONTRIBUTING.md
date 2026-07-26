Thank you for investing your time in contributing to our project!

Any contributions you make are governed by our [License](LICENSE.txt).

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

You could read the [open source contribution guide](https://opensource.guide/how-to-contribute/) for general advice on how to contribute.

Since this is a small hobby project, your contribution may not be noticed for a while if we are busy elsewhere. Sorry!

## Quarto

The [introduction presentation](docs/public/presentations/introduction.qmd) is built with [Quarto](https://quarto.org/).

Run `quarto render docs/public/presentations/introduction.qmd` to render.

(The presentation is modified so rarely the outputs are checked into git.)

## The site

This site is built with [Astro Starlight](https://starlight.astro.build/).

Tools are pinned in `.mise.toml`; run `mise install` once. Then:

- `mise run docs-install` - Install the site dependencies (bun).
- `mise run docs-dev` - Start the live-reloading docs server.
- `mise run docs-build` - Build the documentation site into `docs/dist`.
