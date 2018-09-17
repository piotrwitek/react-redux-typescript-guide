# Contributing Guide
1. Make sure you have read and understand the **Goals** section to be aligned with project goals.
2. Before submitting a PR please comment in the relevant issue (or create a new one if it doesn't exist yet) to discuss all the requirements (this will prevent rejecting the PR and wasting your work).
3. All workflow scripts (prettier, linter, tests) must pass successfully.
4. Don't edit `README.md` directly - it is built using `sh ./generate.sh` script to inject code snippets from the sources in the `/playground` folder (this will make sure all code examples are nicely formatted and working)
   - To make changes in `README.md` edit `.md` files that are located in the `/docs/markdown` folder
   - To make changes in code snippets edit source files in `/playground` folder
   - include directives look like this: `::[example|usage]='../../playground/src/components/sfc-counter.tsx'::`
5. When submitting a PR please make sure that you run the following:
```bash
# run linter in `/playground` folder
npm run lint

# run type-checking in `/playground` folder
npm run tsc

# always re-generate `README.md` from root folder
sh ./generate.sh
# don't like bash scripts? simply use node.js script
# node ./generator/bin/generate-readme.js
```
