# Contributing Guide

## General
1. Make sure you have read and understand the **Goals** section to be aligned with project goals.
2. Before submitting a PR please comment in the relevant issue (or create a new one if it doesn't exist yet) to discuss all the requirements (this will prevent rejecting the PR and wasting your work). Additionally, ensure that you don’t work on issues that have already been assigned to the maintainers. You’ll be free to take up unassigned ones.
3. All workflow scripts (prettier, linter, tests) must pass successfully (it is run automatically on CI and will fail on github checks).

## Edit `README_SOURCE.md` to generate an updated `README.md
```markdown
# React Redux TypeScript Guide

... (existing content)

## Examples

The repository contains several examples demonstrating different patterns:

- [Generic Components](examples/generic-component/) - How to create reusable generic components.
- [Connected Components](examples/connected-component/) - How to connect standard components to Redux.
- [Connected Generic Components](examples/connected-generic-component/) - **NEW**: How to combine generics with `connect` for type-safe, reusable connected components.

... (rest of existing content)
````
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
