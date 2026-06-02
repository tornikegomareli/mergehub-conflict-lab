#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${MERGEHUB_BASE_URL:-http://localhost:3001}"
PR_PATH="${MERGEHUB_PR_PATH:-/tornikegomareli/mergehub-conflict-lab/pull/2}"

wait_for_health() {
  for attempt in {1..30}; do
    if curl -fsS "$BASE_URL/healthz" >/dev/null; then
      return 0
    fi
    sleep 1
  done
  echo "MergeHub did not become healthy" >&2
  return 1
}

wait_for_health
curl -fsS "$BASE_URL$PR_PATH" >/tmp/mergehub-smoke.html
printf 'Smoke test passed for %s%s\n' "$BASE_URL" "$PR_PATH"
