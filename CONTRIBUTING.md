# Contributing Guide
1. Make sure you have read and understand the **Goals** section to be aligned with project goals.
2. Before submitting a PR please comment in the relevant issue (or create a new one if it doesn't exist yet) to discuss all the requirements (this will prevent rejecting the PR and wasting your work).
3. All workflow scripts (prettier, linter, tests) must pass successfully.
4. Don't edit `README.md` directly - it is built using generator from `README_SOURCE.md`.
   - Use `sh ./generate-readme.sh` script to generate `README.md` (this will inject code examples using type-checked source files from the `/playground` folder)
   - include directives look like this: `::[example|usage]='playground/src/components/sfc-counter.tsx'::`
   - To make changes in code examples edit source files in `/playground` folder

**Mandatory PR checklist**:
- generate a new `README.md` from `README_SOURCE.md` using command:
```
sh ./generate-readme.sh

# or if you don't like bash, simply use node.js
# node ./generate-readme.js
```
