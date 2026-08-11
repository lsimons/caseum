#!/usr/bin/env bash
#
# Assert that every internal link in the built site points at something that
# actually exists in the build output.
#
# Why this exists
# ---------------
# Before this script, a broken internal link was caught by *nothing*. Verified,
# not assumed: adding `[nope](/guides/this-page-does-not-exist/)` to a content
# page produced
#
#   astro build              -> "Complete!", exit 0
#   astro check              -> 0 errors
#   verify-base-path.sh      -> "OK - 876 base-prefixed content links"
#   lychee (mise run lint-links) -> "0 Errors"
#
# Each of those is working as designed:
#
#   * Astro 7 does not validate Markdown links, and `starlight-links-validator`
#     is not installed. Starlight validates sidebar `slug:` entries only.
#   * `verify-base-path.sh` checks that the `/caseum` prefix was *applied*. A
#     link to a page that does not exist still gets prefixed, so it counts as a
#     success there - it was one of the 876.
#   * lychee resolves root-relative links against `base_url`
#     (https://lsimons.github.io/caseum/) and `.lychee.toml` then *excludes* that
#     domain, so internal links are never actually requested.
#
# So the links most likely to break from a change in this repository - its own -
# were the only ones nothing checked. This script closes that.
#
# It checks the built output rather than the Markdown source deliberately: what
# matters is whether the published URL resolves, after base prefixing, redirects
# and Starlight's own route generation have all had their say.

set -euo pipefail

dist="${1:-dist}"
base="${2:-/caseum}"

if [ ! -d "$dist" ]; then
	echo "verify-internal-links: '$dist' not found; run 'mise run docs-build' first" >&2
	exit 1
fi

# Every internal reference in every generated page, including the hand-written
# redirect stubs copied from `public/` - those point at real pages too, and a
# stale stub is exactly as broken as a stale content link.
links=$({ grep -rhoE "(href|src)=\"$base/[^\"#?]*" --include='*.html' "$dist" || true; } |
	sed -E 's/^(href|src)="//' |
	sort -u)

checked=0
missing=0
missing_list=""

for link in $links; do
	# Strip the base prefix to get a path relative to the build output.
	rel="${link#"$base"}"
	rel="${rel#/}"

	# Hashed build assets are emitted by Astro itself; if one of those were
	# missing the build would already be broken in a louder way.
	case "$rel" in
	_astro/*) continue ;;
	esac

	checked=$((checked + 1))

	# A trailing slash (or the bare base) is a directory route -> index.html.
	# Anything else may be a file, a directory route written without its slash,
	# or an extensionless page.
	if [ -z "$rel" ] || [ "${link: -1}" = "/" ]; then
		[ -f "$dist/$rel/index.html" ] && continue
	else
		[ -e "$dist/$rel" ] && continue
		[ -f "$dist/$rel/index.html" ] && continue
		[ -f "$dist/$rel.html" ] && continue
	fi

	missing=$((missing + 1))
	missing_list="${missing_list}  ${link}"$'\n'
done

if [ "$checked" -eq 0 ]; then
	echo "verify-internal-links: FAIL - no internal links found at all in '$dist'." >&2
	echo "Either the build produced nothing, or the base path is not '$base'." >&2
	exit 1
fi

if [ "$missing" -ne 0 ]; then
	echo "verify-internal-links: FAIL - $missing of $checked internal link(s) point at nothing:" >&2
	printf '%s' "$missing_list" >&2
	echo "Each of these is a 404 on the published site." >&2
	exit 1
fi

echo "verify-internal-links: OK - $checked internal links, all resolve."
