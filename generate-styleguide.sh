#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
npx --prefix playground/styleguide styleguidist build --config playground/styleguide/styleguide.config.js
