const path = require('path');
const fs = require('fs');

const webpackConfig = {
  resolve: {
    alias: { '@src': path.join(__dirname, 'src') },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true },
        },
      },
    ],
  },
};

module.exports = {
  showUsage: false,
  styleguideDir: '../../docs/',
  title: 'React & Redux in TypeScript - Component Typing Patterns',
  ignore: ['**/*.usage.tsx'],
  sections: [
    {
      name: 'Introduction',
      content: './docs/intro.md',
    },
    {
      name: 'Function Components',
      components: () => [
        './src/components/fc-counter.tsx',
        './src/components/fc-spread-attributes.tsx',
      ],
    },
    {
      name: 'Class Components',
      components: () => [
        './src/components/class-counter.tsx',
        './src/components/class-counter-with-default-props.tsx',
      ],
    },
    {
      name: 'Generic Components',
      components: () => ['./src/components/generic-list.tsx'],
    },
    {
      name: 'Render Props',
      components: () => [
        './src/components/name-provider.tsx',
        './src/components/mouse-provider.tsx',
      ],
    },
  ],
  theme: {
    sidebarWidth: 300,
  },
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: webpackConfig,
  updateExample: function(props, exampleFilePath) {
    if (typeof props.settings.filePath === 'string') {
      const {
        settings: { filePath },
      } = props;
      delete props.settings.filePath;

      props.content = fs.readFileSync(
        path.resolve(exampleFilePath, '..', filePath),
        { encoding: 'utf-8' }
      );
      props.settings.static = true;
    }

    return props;
  },
};
