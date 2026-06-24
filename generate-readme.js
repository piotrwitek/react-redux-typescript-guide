```javascript
const fs = require('fs');

const ROOT_PATH = `${__dirname}/`;
const inputFiles = [ROOT_PATH + 'README_SOURCE.md'];
const outputFile = ROOT_PATH + 'README.md';

const result = inputFiles
    .map(filePath => fs.readFileSync(filePath, 'utf8'))
    .map(injectCodeBlocks)
    .map(injectExpanders)
    .toString();

fs.writeFileSync(outputFile, result, 'utf8');

function injectCodeBlocks(text) {
    const regex = /::codeblock='(.+?)'::/g;
    return text.replace(regex, createMatchReplacer(withSourceWrapper));
}

function injectExpanders(text) {
    const regex = /::expander='(.+?)'::/g;
    return text.replace(regex, createMatchReplacer(withDetailsWrapper));
}

function createMatchReplacer(wrapper) {
    return (match, filePath) => {
        console.log(ROOT_PATH + filePath);
        const text = fs.readFileSync(ROOT_PATH + filePath, 'utf8');
        return wrapper(text);
    };
}

function withSourceWrapper(text) {
    return `
${'```tsx'}
${text}
${'```'}
  `.trim();
}

function withDetailsWrapper(text) {
    return `
<details><summary><i>Click to expand</i></summary><p>

${'```tsx'}
${text}
${'```'}
</p></details>
  `.trim();
}

// Update dependencies
const packageJson = require('./package.json');
packageJson.dependencies['react-styleguidist'] = 'latest';
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

// Update demo application code
const demoPath = `${ROOT_PATH}playground/.storybook/config.js`;
const demoCode = fs.readFileSync(demoPath, 'utf8');
const updatedDemoCode = demoCode.replace(/react-styleguidist demo application code/, 'updated react-styleguidist demo application code');
fs.writeFileSync(demoPath, updatedDemoCode);

// Update README.md file
const readmePath = `${ROOT_PATH}README.md`;
const readmeCode = fs.readFileSync(readmePath, 'utf8');
const updatedReadmeCode = readmeCode.replace(/react-styleguidist demo application/, 'updated react-styleguidist demo application');
fs.writeFileSync(readmePath, updatedReadmeCode);
```