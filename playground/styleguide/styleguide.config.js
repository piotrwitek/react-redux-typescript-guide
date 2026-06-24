const path = require('path');
const fs = require('fs');
const sourceDir = path.join(__dirname, '../src');

module.exports = {
  usageMode: 'collapse',
  styleguideDir: path.join(__dirname, '../../docs'),
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
        path.join(sourceDir, 'components/fc-counter.tsx'),
        path.join(sourceDir, 'components/fc-spread-attributes.tsx'),
      ],
    },
    {
      name: 'Class Components',
      components: () => [
        path.join(sourceDir, 'components/class-counter.tsx'),
        path.join(sourceDir, 'components/class-counter-with-default-props.tsx'),
      ],
    },
    {
      name: 'Generic Components',
      components: () => [path.join(sourceDir, 'components/generic-list.tsx')],
    },
    {
      name: 'Render Props',
      components: () => [
        path.join(sourceDir, 'components/name-provider.tsx'),
        path.join(sourceDir, 'components/mouse-provider.tsx'),
      ],
    },
  ],
  theme: {
    sidebarWidth: 300,
  },
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: { '@src': sourceDir },
      modules: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, '../node_modules'),
        'node_modules',
      ],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: sourceDir,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
                configFile: path.join(__dirname, '../tsconfig.json'),
                transpileOnly: true,
                compilerOptions: {
                  noEmit: false,
                },
              },
            },
          ],
        },
      ],
    },
  },
  updateExample: function(props, exampleFilePath) {
    if (props.settings && typeof props.settings.filePath === 'string') {
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
