const fs = require("fs");

const ROOT_PATH = `${__dirname}/`;
const inputFiles = [ROOT_PATH + 'README_SOURCE.md'];
const outputFile = ROOT_PATH + 'README.md';

const result = inputFiles
    .map(filePath => fs.readFileSync(filePath, 'utf8'))
    .map(injectExamples)
    .map(injectUsages);

fs.writeFileSync(outputFile, result, 'utf8');

function injectExamples(text) {
    const regex = /::example='(.+?)'::/g;
    return text.replace(regex, createMatchReplacer(withSourceWrapper));
}

function injectUsages(text) {
    const regex = /::usage='(.+?)'::/g;
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
<details><summary>show usage</summary><p>

${'```tsx'}
${text}
${'```'}
</p></details>
  `.trim();
}
