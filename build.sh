#!/usr/bin/env bash

set -euo pipefail

git submodule update --init --recursive
yarn build
echo "$DATA" | base64 -d | tar zx
cd cv
PUBLIC_PATH=/cv/ yarn install --production=false --frozen-lockfile
yarn build
yarn pdf || true
