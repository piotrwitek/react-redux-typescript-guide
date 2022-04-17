import * as React from 'react';
import ThemeContext from './theme-context';

type Props = {};

export class ToggleThemeButtonClass extends React.Component<Props> {
  static contextType = ThemeContext;
  declare context: React.ContextType<typeof ThemeContext>;

  render() {
    const { theme, toggleTheme } = this.context;
    return (
      <button style={theme} onClick={toggleTheme}>
        Toggle Theme
      </button>
    );
  }
}
