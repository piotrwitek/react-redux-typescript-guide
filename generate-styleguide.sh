#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
npm --prefix playground/styleguide run styleguide:build
