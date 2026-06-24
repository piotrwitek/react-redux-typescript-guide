const path = require('path');
const fs = require('fs');
const { getStyleguidistConfig } = require('./getStyleguidistConfig');

module.exports = (config, { mode }) => {
  const styleguidistConfig = getStyleguidistConfig(config, mode);
  const demoAppPath = path.join(__dirname, 'demo-app');

  // Update the demo application to the latest version
  fs.cpSync(path.join(__dirname, 'node_modules', 'react-styleguidist', 'demo-app'), demoAppPath, { recursive: true });
  fs.rmSync(demoAppPath, { recursive: true });

  // Refactor the demo application to make it up to date
  // ...
  // Add refactoring code here

  return styleguidistConfig;
};