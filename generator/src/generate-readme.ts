import * as fs from 'fs';

const RELATIVE_ROOT = `${__dirname}/`;
const ROOT_PATH = RELATIVE_ROOT + '../../'
const CONTENT_PATH = RELATIVE_ROOT + '../content/'

const inputFiles = [
  CONTENT_PATH + '_intro.md',
  CONTENT_PATH + '_toc.md',
  CONTENT_PATH + '1_react.md',
  CONTENT_PATH + '2_redux.md',
  CONTENT_PATH + '3_ecosystem.md',
  CONTENT_PATH + '4_extras.md',
  CONTENT_PATH + '5_faq.md',
  CONTENT_PATH + '_end.md'
];

const outputFile = ROOT_PATH + 'README.md';

const result = inputFiles
  .map(filePath => fs.readFileSync(filePath, 'utf8'))
  .map(includeExamples)
  .map(includeUsages)
  .join('\n---\n\n');

fs.writeFileSync(outputFile, result, 'utf8');

// FUNCS

function includeExamples(text: string): string {
  const INCLUDE_PATTERN = /::example='(.+?)'::/g;
  return text.replace(INCLUDE_PATTERN, getReplacerWithWrapper(withCodeWrapper));
}

function includeUsages(text: string): string {
  const INCLUDE_PATTERN = /::usage='(.+?)'::/g;
  return text.replace(INCLUDE_PATTERN, getReplacerWithWrapper(withDetailsWrapper));
}

function getReplacerWithWrapper(wrapper: Wrapper) {
  return (match: string, filePath: string): string => {
    console.log(RELATIVE_ROOT + filePath)
    const buffer = fs.readFileSync(RELATIVE_ROOT + filePath, 'utf8');
    return wrapper(buffer);
  };
}

type Wrapper = typeof withCodeWrapper | typeof withDetailsWrapper;

function withCodeWrapper(text: string) {
  return `
${'```tsx'}
${text}
${'```'}
  `.trim();
}

function withDetailsWrapper(text: string) {
  return `
<details><summary>SHOW USAGE</summary><p>

${'```tsx'}
${text}
${'```'}
</p></details>
  `.trim();
}

