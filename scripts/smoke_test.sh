#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${MERGEHUB_BASE_URL:-http://localhost:3001}"
PR_PATH="${MERGEHUB_PR_PATH:-/tornikegomareli/mergehub-conflict-lab/pull/2}"
OUTPUT_FILE="${MERGEHUB_SMOKE_OUTPUT:-/tmp/mergehub-smoke.html}"

wait_for_health() {
  for attempt in $(seq 1 20); do
    curl -fsS "$BASE_URL/healthz" >/dev/null && return 0
    sleep 1
  done
  echo "health check failed for $BASE_URL" >&2
  return 1
}

wait_for_health
curl -fsS "$BASE_URL$PR_PATH" >"$OUTPUT_FILE"
echo "Saved smoke response to $OUTPUT_FILE"
