#!/usr/bin/env bash

set -eo pipefail

err() {
  echo "$@"
  exit 1
}

[ -z "$ANALYTICS_URL" ] && err "ANALYTICS_URL is not set"
[ -z "$ANALYTICS_SITE_ID" ] && err "ANALYTICS_SITE_ID is not set"
[ -z "$NOTION_TOKEN" ] && err "NOTION_TOKEN is not set"

export DATA=$(tar -czf - cv/src/data | base64 -w 0)

app_id=$(koyeb app describe nilscox-dev -o json 2>/dev/null | jq -r '.id | select(. != null)' || true)
if [ -n "$app_id" ]; then koyeb app delete "$app_id"; fi

koyeb app init nilscox-dev \
  --git github.com/nilscox/nilscox.dev \
  --git-branch master \
  --git-build-command './build.sh' \
  --ports 8080:http \
  --routes /:8080 \
  --instance-type micro \
  --env HOST="0.0.0.0" \
  --env PORT="8080" \
  --env NODE_ENV="production" \
  --env NODE_OPTIONS="--experimental-specifier-resolution=node" \
  --env DATA="$DATA" \
  --env ANALYTICS_URL="$ANALYTICS_URL" \
  --env ANALYTICS_SITE_ID="$ANALYTICS_SITE_ID" \
  --env NOTION_TOKEN="$NOTION_TOKEN"
