This folder is a playground project for testing the code examples that can be found in the guide. They are all tested with the most recent supported version of TypeScript and third-party type-definitions (like `@types/react` or `@types/react-redux`) to ensure the examples are still working when new third-party type-definitions are released.

The playground app and the style guide are two different ways of browsing the same examples:

- `src/routes/home.tsx` renders the example `*.usage.tsx` files into the app home page.
- `styleguide/styleguide.config.js` organizes selected components and markdown docs into the Styleguidist site.

If the browser output looks different between those two views, that is expected. They share source files, but they assemble and present them differently.
