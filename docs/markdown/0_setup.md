# Setup

## Installing types
```
npm i -D @types/react @types/react-dom @types/react-redux
```

"react" - `@types/react`  
"react-dom" - `@types/react-dom`  
"redux" - (included in npm package)*  
"react-redux" - `@types/react-redux`  

> *There are improved redux types on a `next` branch in the official redux github repo, use below instructions to add it to your project:
- in `package.json > devDependencies` add:  
  `"redux-next": "reactjs/redux#next"`  
- in `tsconfig.json > compilerOptions > paths` add:  
  `"redux": ["node_modules/redux-next"]`  
