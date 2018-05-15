import React from 'react';

// Context
const themes = {
  dark: {
    color: 'black',
    backgroundColor: 'white',
  } as React.CSSProperties,
  light: {
    color: 'white',
    backgroundColor: 'black',
  } as React.CSSProperties,
};

type Theme = { theme: React.CSSProperties; toggleTheme?: () => void };
const ThemeContext = React.createContext<Theme>({ theme: themes.light });

// Provider
interface State {
  theme: Theme['theme'];
}
export class App extends React.Component<{}, State> {
  readonly state: State = { theme: themes.light };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.light ? themes.dark : themes.light,
    }));
  }

  render() {
    const { theme } = this.state;
    const { toggleTheme } = this;
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ToggleThemeButton />
      </ThemeContext.Provider>
    );
  }
}

// Consumer
interface ThemedButtonProps {}

function ToggleThemeButton(props: ThemedButtonProps) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => <button style={theme} onClick={toggleTheme} {...props} />}
    </ThemeContext.Consumer>
  );
}
