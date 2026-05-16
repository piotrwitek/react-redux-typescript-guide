const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, '..', 'README.md');
const readme = fs.readFileSync(readmePath, 'utf8');

test('README explains what the guide is and is not', () => {
  assert.match(
    readme,
    /### \*\*What This Guide Is\*\*/
  );
  assert.match(
    readme,
    /This repository is a reference guide and recipe collection for using React, Redux, and TypeScript together\./
  );
  assert.match(
    readme,
    /It is \*\*not\*\* a boilerplate, starter kit, or library that introduces its own replacement APIs for React\./
  );
});

test('README gives beginners a reading path and clarifies the styleguide', () => {
  assert.match(
    readme,
    /### \*\*How to Use This Guide\*\*/
  );
  assert.match(
    readme,
    /Start with the \[Playground Project\]\(#playground-project\) to see where the examples live\./
  );
  assert.match(
    readme,
    /### \*\*Understanding the Playground and Style Guide\*\*/
  );
  assert.match(
    readme,
    /The Styleguidist demo is a separate view over the same source files\./
  );
  assert.match(
    readme,
    /It renders markdown docs and live examples from `playground\/src`, organized by `playground\/styleguide\/styleguide\.config\.js`\./
  );
});
