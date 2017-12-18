const path = require('path');
const fs = require('fs');
const { createConfig } = require('webpack-blocks');
const typescript = require('@webpack-blocks/typescript');
const webpackConfig = createConfig([typescript()]);
webpackConfig.resolve.alias = { '@src': path.join(__dirname, 'src') };

module.exports = {
  sections: [
    {
      name: 'Introduction',
      content: './docs/intro.md'
    },
    {
      name: 'Components',
      content: './docs/components.md',
      components: './src/components/*.tsx',
    }
  ],
  ignore: ['**/*.usage.tsx'],
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: webpackConfig,
  updateExample: function (props, exampleFilePath) {
    if (typeof props.settings.filePath === 'string') {
      const { settings: { filePath } } = props;
      delete props.settings.filePath;

      props.content = fs.readFileSync(
        path.resolve(exampleFilePath, '..', filePath),
        { encoding: 'utf-8' }
      );
      props.settings.static = true
    }

    return props
  }
}
