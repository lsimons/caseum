#!/usr/bin/env bash
#
# Assert that the deploy base path was applied to content links in the built
# site.
#
# Why this exists
# ---------------
# Content links and image sources are written root-relative in Markdown
# (`/guides/foo/`, `/guides/foo.png`). The `rehypeBaseLinks` plugin in
# `astro.config.mjs` prefixes them with `/caseum` at render time. That plugin is
# wired in through `markdown.rehypePlugins`, which Astro 7 has deprecated:
#
#   `markdown.remarkPlugins`, `markdown.rehypePlugins`, and
#   `markdown.remarkRehype` are deprecated. Pass them to `unified({...})` from
#   `@astrojs/markdown-remark` directly instead.
#
# When that option is finally removed, the plugin stops running. The build still
# succeeds, `astro check` still passes, and every in-content link on the
# published site quietly becomes a 404, because GitHub Pages serves this project
# under `/caseum/`. That is a silent failure with no natural alarm, so this
# script is the alarm.
#
# It is deliberately a grep over the built HTML rather than a unit test of the
# plugin: the thing worth protecting is the output, and a unit test of the
# plugin function would keep passing while Astro stopped calling it.

set -euo pipefail

dist="${1:-dist}"

if [ ! -d "$dist" ]; then
	echo "verify-base-path: '$dist' not found; run 'mise run docs-build' first" >&2
	exit 1
fi

# The top-level content sections are the directories under `src/content/docs/`.
# A root-relative link into any of them must come out base-prefixed.
#
# Derived at runtime rather than hardcoded. A hardcoded list silently stops
# guarding any section added later, which is the one way this check could quietly
# become weaker over time rather than louder.
content_src="${2:-src/content/docs}"

if [ ! -d "$content_src" ]; then
	echo "verify-base-path: '$content_src' not found; cannot determine the content sections." >&2
	exit 1
fi

sections=$(find "$content_src" -mindepth 1 -maxdepth 1 -type d -exec basename {} \; | sort | paste -sd '|' -)

if [ -z "$sections" ]; then
	echo "verify-base-path: no content sections found under '$content_src'." >&2
	exit 1
fi

# Only Astro-rendered pages: `index.html` for every route, plus the generated
# `404.html`. `public/` also contains hand-written `*.html` redirect stubs that
# already hardcode `/caseum/...` and are copied verbatim, so a blanket `*.html`
# would scan files this check has no business judging.
pages=(--include=index.html --include=404.html)

# `|| true` on each grep is load-bearing: grep exits 1 when it matches nothing,
# and under `set -o pipefail` that aborts the script. For `bare`, matching
# nothing is exactly the success case, so without this the check can only ever
# fail or crash.
prefixed=$({ grep -rhoE "href=\"/caseum/($sections)/" "${pages[@]}" "$dist" || true; } | wc -l | tr -d ' ')
bare=$({ grep -rhoE "(href|src)=\"/($sections)/" "${pages[@]}" "$dist" || true; } | wc -l | tr -d ' ')

if [ "$bare" -ne 0 ]; then
	echo "verify-base-path: FAIL - found $bare content link(s) missing the /caseum base path." >&2
	echo "The rehypeBaseLinks plugin in docs/astro.config.mjs is probably no longer running." >&2
	echo "Examples:" >&2
	grep -rnoE "(href|src)=\"/($sections)/[^\"]*\"" "${pages[@]}" "$dist" | head -10 >&2
	exit 1
fi

if [ "$prefixed" -eq 0 ]; then
	echo "verify-base-path: FAIL - found no base-prefixed content links at all." >&2
	echo "Either the build produced nothing, or every content section is now empty." >&2
	exit 1
fi

echo "verify-base-path: OK - $prefixed base-prefixed content links, 0 unprefixed."
echo "verify-base-path: sections guarded: ${sections//|/, }"
