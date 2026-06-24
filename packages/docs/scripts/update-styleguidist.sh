#!/bin/bash

# Update react-styleguidist website

git add .

git commit -m "fix: Update react-styleguidist demo application"
git push origin main

npm run build

npm run deploy