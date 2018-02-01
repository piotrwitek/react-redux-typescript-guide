# Tools

## TSLint

> Installation  
`npm i -D tslint`

#### tslint.json
- Recommended setup is to extend build-in preset `tslint:recommended` (use `tslint:all` to enable all rules)  
- Add additional `react` specific rules: `npm i -D tslint-react` https://github.com/palantir/tslint-react  
- Overwritten some defaults for more flexibility  

```js
{
  "extends": ["tslint:recommended", "tslint-react"],
  "rules": {
    "arrow-parens": false,
    "arrow-return-shorthand": [false],
    "comment-format": [true, "check-space"],
    "import-blacklist": [true, "rxjs"],
    "interface-over-type-literal": false,
    "interface-name": false,
    "max-line-length": [true, 120],
    "member-access": false,
    "member-ordering": [true, { "order": "fields-first" }],
    "newline-before-return": false,
    "no-any": false,
    "no-empty-interface": false,
    "no-import-side-effect": [true],
    "no-inferrable-types": [true, "ignore-params", "ignore-properties"],
    "no-invalid-this": [true, "check-function-in-method"],
    "no-null-keyword": false,
    "no-require-imports": false,
    "no-submodule-imports": [true, "@src", "rxjs"],
    "no-this-assignment": [true, { "allow-destructuring": true }],
    "no-trailing-whitespace": true,
    "no-unused-variable": [true, "react"],
    "object-literal-sort-keys": false,
    "object-literal-shorthand": false,
    "one-variable-per-declaration": [false],
    "only-arrow-functions": [true, "allow-declarations"],
    "ordered-imports": [false],
    "prefer-method-signature": false,
    "prefer-template": [true, "allow-single-concat"],
    "quotemark": [true, "single", "jsx-double"],
    "semicolon": [true, "always"],
    "trailing-comma": [true, {
      "singleline": "never",
      "multiline": {
        "objects": "always",
        "arrays": "always",
        "functions": "never",
        "typeLiterals": "ignore"
      },
      "esSpecCompliant": true
    }],
    "triple-equals": [true, "allow-null-check"],
    "type-literal-delimiter": true,
    "typedef": [true,"parameter", "property-declaration"],
    "variable-name": [true, "ban-keywords", "check-format", "allow-pascal-case", "allow-leading-underscore"],
    // tslint-react
    "jsx-no-lambda": false
  }
}
```

[⇧ back to top](#table-of-contents)

## Jest

> Installation  
`npm i -D jest ts-jest @types/jest`

#### jest.config.json
```json
{
  "verbose": true,
  "transform": {
    ".(ts|tsx)": "./node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/spec/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "moduleNameMapper": {
    "^Components/(.*)": "./src/components/$1"
  },
  "globals": {
    "window": {},
    "ts-jest": {
      "tsConfigFile": "./tsconfig.json"
    }
  },
  "setupFiles": [
    "./jest.stubs.js"
  ],
  "setupTestFrameworkScriptFile": "./jest.tests.js"
}
```

#### jest.stubs.js
```js
// Global/Window object Stubs for Jest
window.requestAnimationFrame = function (callback) {
  setTimeout(callback);
};

window.localStorage = {
  getItem: function () { },
  setItem: function () { },
};

Object.values = () => [];
```


[⇧ back to top](#table-of-contents)

## Enzyme

> Installation  
`npm i -D enzyme enzyme-adapter-react-16 @types/enzyme`

#### jest.tests.js
```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

[⇧ back to top](#table-of-contents)

## Living Style Guide
### ["react-styleguidist"](https://github.com/styleguidist/react-styleguidist)

[⟩⟩⟩ styleguide.config.js](/playground/styleguide.config.js)  

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/)

[⇧ back to top](#table-of-contents)

## Common Npm Scripts
> Common TS-related npm scripts shared across projects
```
"lint": "tslint -p ./",
"tsc": "tsc -p ./ --noEmit",
"tsc:watch": "tsc -p ./ --noEmit -w",
"pretest": "npm run lint & npm run tsc",
"test": "jest --config jest.config.json",
"test:watch": "jest --config jest.config.json --watch",
"test:update": "jest --config jest.config.json -u",
```

[⇧ back to top](#table-of-contents)
