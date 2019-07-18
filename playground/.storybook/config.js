import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

// We load every file in src directory ending with .stories.tsx

const req = requireContext('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}
configure(loadStories, module);
