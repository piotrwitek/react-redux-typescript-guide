# Contribution Guide
- Don't edit `README.md` - it is built with `generator` script from  separate `.md` files located in the `/docs/markdown` folder, edit them instead
- For code snippets, they are also injected by `generator` script from the source files located in the playground folder (this step make sure all examples are type-checked and linted), edit them instead
> look for include directives in `.md` files that look like this: `::[example|usage]='../../playground/src/components/sfc-counter.tsx'::`

Before opening PR please make sure to check:
```bash
# run linter in playground
yarn run lint

# run type-checking in playground
yarn run tsc

# re-generate `README.md` from repo root
sh ./generate.sh
# or
node ./generator/bin/generate-readme.js
```

[⇧ back to top](#table-of-contents)
