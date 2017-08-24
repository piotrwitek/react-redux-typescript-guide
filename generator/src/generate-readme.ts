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
  .map(fileContent => replaceSourceCodeIncludes(fileContent))
  .join('\n---\n\n');

fs.writeFileSync(outputFile, result, 'utf8');

// FUNCS

const INCLUDES_PATTERN = /::includes='(.+?)'::/;

function replaceSourceCodeIncludes(markdown: string): string {
  return markdown.replace(INCLUDES_PATTERN, replacer);
}

function replacer(match: string, filePath: string) {
  const sourceCode = fs.readFileSync(RELATIVE_ROOT + filePath, 'utf8');

  return sourceCode;
}
