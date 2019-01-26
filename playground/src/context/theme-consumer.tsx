import * as React from 'react';
import ThemeContext from './theme-context';

interface ThemedButtonProps {}

export default function ToggleThemeButton(props: ThemedButtonProps) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => <button style={theme} onClick={toggleTheme} {...props} />}
    </ThemeContext.Consumer>
  );
}
