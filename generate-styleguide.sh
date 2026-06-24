#!/bin/bash
cd "$(dirname "$0")"
npm --prefix playground/styleguide run styleguide:build
