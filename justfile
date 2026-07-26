# caseum

# Docs: start dev server
docs-dev:
    cd docs && bun run dev

# Docs: build static site
docs-build:
    cd docs && bun run build

# Docs: preview production build
docs-preview:
    cd docs && bun run preview

# Docs: install dependencies
docs-install:
    cd docs && bun install

# Docs: check for Astro issues
docs-check:
    cd docs && bunx astro check

# Docs: regenerate the honeycomb favicon + apple-touch-icon from the palette
docs-favicon:
    cd docs && bun run scripts/gen-favicon.mjs

# Docs: clean build artifacts
docs-clean:
    rm -rf docs/dist docs/.astro

# Docs: install the Chromium browser Playwright uses for screenshots
docs-browser:
    cd docs && bunx playwright install chromium

# Docs: build, serve, and screenshot a page (default the landing page) to the
# given file (default out.png). Requires `just docs-browser` once.
docs-screenshot out="out.png" path="/caseum/":
    cd docs && bun run build
    cd docs && bun run preview --port 4321 > /tmp/astro-preview.log 2>&1 & \
      sleep 4 && \
      bunx playwright screenshot --viewport-size=1280,800 "http://localhost:4321{{path}}" "{{out}}"; \
      status=$?; pkill -f "astro preview" || true; exit $status
