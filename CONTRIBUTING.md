Thank you for investing your time in contributing to our project!

Any contributions you make are governed by our [License](LICENSE.txt).

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

You could read the [GitHub Docs Contributing Guide](https://github.com/github/docs/blob/main/CONTRIBUTING.md) for general advice on how to contribute.

Since this is a small hobby project, your contribution may not be noticed for a while if we are busy elsewhere. Sorry!

## MkDocs

This site is built with [MkDocs](https://www.mkdocs.org/).

That's a python tool. Python is managed with [uv](https://docs.astral.sh/uv/).

Run `uv sync` to install the dependencies.

Then:

* `uv run publish_index.py` - Sync over some files.
* `uv run mkdocs serve` - Start the live-reloading docs server. 
* `uv run mkdocs build` - Build the documentation site.
