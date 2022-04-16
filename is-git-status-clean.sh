#!/bin/bash
if output=$(git status --porcelain) && [ -z "$output" ]; then echo "Success!"; else (echo ">>> Please check CONTRIBUTING.md to learn how to properly amend README.md <<<\n" && false); fi
