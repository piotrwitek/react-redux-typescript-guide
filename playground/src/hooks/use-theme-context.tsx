import * as React from 'react';
import ThemeContext from '../context/theme-context';

interface ThemedButtonProps {}

export default function ThemeToggleButton(props: ThemedButtonProps) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} style={theme} >
      Toggle Theme
    </button>
  );
}
