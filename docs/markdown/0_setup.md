# Setup

### Installing types
```
npm i -D @types/react @types/react-dom @types/react-redux
```

"react" - `@types/react`  
"react-dom" - `@types/react-dom`  
"redux" - (types included with npm package)*  
"react-redux" - `@types/react-redux`  

> `redux` has improved types on a `next` branch in it's official github repo, use below instructions to add it to your project:
- in `package.json > devDependencies` add:  
  `"redux-next": "reactjs/redux#next"`  
- in `tsconfig.json > compilerOptions > paths` add:  
  `"redux": ["node_modules/redux-next"]`  

[⇧ back to top](#table-of-contents)
