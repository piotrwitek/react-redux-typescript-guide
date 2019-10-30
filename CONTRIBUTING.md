# Contributing Guide

## General
1. Make sure you have read and understand the **Goals** section to be aligned with project goals.
2. Before submitting a PR please comment in the relevant issue (or create a new one if it doesn't exist yet) to discuss all the requirements (this will prevent rejecting the PR and wasting your work).
3. All workflow scripts (prettier, linter, tests) must pass successfully (it is run automatically on CI and will fail on github checks).

## Edit `README_SOURCE.md` to generate an updated `README.md`
Don't edit `README.md` directly - it is generated automatically from `README_SOURCE.md` using an automated script.
   - Use `sh ./generate-readme.sh` script to generate updated `README.md` (this will inject code examples using type-checked source files from the `/playground` folder)
   - So to make changes in code examples edit source files in `/playground` folder

**Source code inject directives:**
```
# Inject code block with highlighter
::codeblock='playground/src/components/fc-counter.tsx'::

# Inject code block with highlighter and expander
::expander='playground/src/components/fc-counter.usage.tsx'::
```
