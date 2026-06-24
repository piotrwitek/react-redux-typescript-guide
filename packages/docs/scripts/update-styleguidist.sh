#!/bin/bash
set -e
set -u

# Update react-styleguidist website

if [ -n "$(git status --porcelain)" ]; then
  git add .
  if ! git commit -m "fix: Update react-styleguidist demo application"; then
    echo "Git commit failed, exiting"
    exit 1
  fi
  if ! git push origin main; then
    echo "Git push failed, exiting"
    exit 1
  fi
fi

npm run build
if ! npm run deploy; then
  echo "npm run deploy failed, exiting"
  exit 1
fi