# Contribution Guide
- Before submitting a PR please create an issue to discuss it first (also make sure you have read **Goals** section)
- Don't edit `README.md` directly - it is built using `sh ./generate.sh` script to inject code snippets from the sources in the `/playground` folder (this will make sure all code examples are nicely formatted and working)
  - To make changes in `README.md` edit `.md` files that are located in the `/docs/markdown` folder
  - To make changes in code snippets edit source files in `/playground` folder
  - include directives look like this: `::[example|usage]='../../playground/src/components/sfc-counter.tsx'::`

When submitting a PR please make sure that you run:
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
