# Recipes

### Baseline tsconfig.json
- Recommended baseline config carefully optimized for strict type-checking and optimal webpack workflow  
- Install [`tslib`](https://www.npmjs.com/package/tslib) to cut on bundle size, by using external runtime helpers instead of adding them inline: `npm i tslib`  
- Example "paths" setup for baseUrl relative imports with Webpack  

```js
{
  "compilerOptions": {
    "baseUrl": "./", // enables project relative paths config
    "paths": { // define paths mappings
      "@src/*": ["src/*"] // will enable import aliases -> import { ... } from '@src/components'
      // WARNING: Add this to your webpack config -> resolve: { alias: { '@src': PATH_TO_SRC } }
      // "redux": ["typings/redux"], // use an alternative type-definitions instead of the included one
    },
    "outDir": "dist/", // target for compiled files
    "allowSyntheticDefaultImports": true, // no errors with commonjs modules interop
    "esModuleInterop": true, // enable to do "import React ..." instead of "import * as React ..."
    "allowJs": true, // include js files
    "checkJs": true, // typecheck js files
    "declaration": false, // don't emit declarations
    "emitDecoratorMetadata": true, // only if using decorators
    "experimentalDecorators": true, // only if using decorators
    "forceConsistentCasingInFileNames": true,
    "importHelpers": true, // importing transpilation helpers from tslib
    "noEmitHelpers": true, // disable inline transpilation helpers in each file
    "jsx": "react", // translate JSX
    "lib": [
      "dom",
      "es2016",
      "es2017.object"
    ],
    "target": "es5", // "es2015" for ES6+ engines
    "module": "commonjs", // "es2015" for tree-shaking
    "moduleResolution": "node",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "strict": true,
    "pretty": true,
    "removeComments": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "src/**/*.spec.*"
  ]
}
```

[⇧ back to top](#table-of-contents)

### Default and Named Module Exports
> Most flexible solution is to use module folder pattern, because you can leverage both named and default import when you see fit.  
Using this solution you'll achieve better encapsulation for internal structure/naming refactoring without breaking your consumer code:  
```ts
// 1. in `components/` folder create component file (`select.tsx`) with default export:

// components/select.tsx
const Select: React.SFC<Props> = (props) => {
...
export default Select;

// 2. in `components/` folder create `index.ts` file handling named imports:

// components/index.ts
export { default as Select } from './select';
...

// 3. now you can import your components in both ways, with named export (better encapsulation) or using default export (internal access):

// containers/container.tsx
import { Select } from '@src/components';
or
import Select from '@src/components/select';
...
```

[⇧ back to top](#table-of-contents)

### Type Augmentation for npm libraries
Strategies to fix issues coming from external type-definitions files (*.d.ts)

#### Augmenting library internal definitions - using relative import resolution
```ts
// added missing autoFocus Prop on Input component in "antd@2.10.0" npm package
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}
```

#### Augmenting library public definitions - using node module import resolution
```ts
// fixed broken public type declaration in "rxjs@5.4.1" npm package
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
```

#### To quick-fix missing type-definitions for vendor modules you can "assert" a module type with `any` using [Shorthand Ambient Modules](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#shorthand-ambient-modules)

::example='../../playground/typings/modules.d.ts'::

> More advanced scenarios for working with vendor type-definitions can be found here [Official TypeScript Docs](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#working-with-other-javascript-libraries)

[⇧ back to top](#table-of-contents)

### Override type-definitions for npm libraries
If you want to use an alternative (customized) type-definitions for some npm library (that usually comes with it's own type definitions), you can do it by adding an override in `paths` compiler option.

```ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "redux": ["typings/redux"], // use an alternative type-definitions instead of the included one
      ...
    },
    ...,
  }
}
```

[⇧ back to top](#table-of-contents)
