# React & Redux in TypeScript - Complete Guide

**"This guide is a living compendium documenting the most important patterns and recipes on how to use React (and its Ecosystem) in a functional style using TypeScript. It will help you make your code completely type-safe while focusing on inferring the types from implementation so there is less noise coming from excessive type annotations and it's easier to write and maintain correct types in the long run."**

[![Join the chat at https://gitter.im/piotrwitek/react-redux-typescript-guide](https://badges.gitter.im/piotrwitek/react-redux-typescript-guide.svg)](https://gitter.im/piotrwitek/react-redux-typescript-guide?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

_Found it useful? Want more updates?_

[![Buy Me a Coffee](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-orange.svg)](https://www.buymeacoffee.com/piotrekwitek)
[![Patreon](https://img.shields.io/badge/support%20me%20on-patreon-e52678.svg)](https://www.patreon.com/piotrekwitek)

---

## Table of Contents

- [React - JSX Children Type Checking](#jsx-children-type-checking)

---

## JSX Children Type Checking

TypeScript provides several ways to type-check `children` props in React components. Below are common patterns ranging from permissive to strict typing.

### Using `React.ReactNode` (most permissive)

`React.ReactNode` accepts anything that can be rendered: JSX elements, strings, numbers, arrays, fragments, portals, booleans, `null`, or `undefined`.

```tsx
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div>{children}</div>
);
```

### Using `React.ReactElement` (single element)

`React.ReactElement` restricts children to a single React element (no strings, numbers, etc.).

```tsx
interface WrapperProps {
  children: React.ReactElement;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="wrapper">{children}</div>
);
```

### Restricting to a specific component type

You can use `React.ReactElement<Props>` to restrict children to elements whose props match a specific shape.

```tsx
type AvatarProps = {
  src: string;
  alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <img src={src} alt={alt} />
);

interface ProfileProps {
  username: string;
  children: React.ReactElement<AvatarProps>;
}

const Profile: React.FC<ProfileProps> = ({ username, children }) => (
  <div>
    <h2>{username}</h2>
    {children}
  </div>
);

// Valid
const example = (
  <Profile username="John">
    <Avatar src="avatar.png" alt="John's avatar" />
  </Profile>
);
```

### Children as a render function (render prop)

```tsx
interface RenderPropProps {
  data: string[];
  children: (item: string, index: number) => React.ReactElement;
}

const DataList: React.FC<RenderPropProps> = ({ data, children }) => (
  <ul>
    {data.map((item, index) => (
      <li key={index}>{children(item, index)}</li>
    ))}
  </ul>
);

// Usage
const renderPropExample = (
  <DataList data={['one', 'two', 'three']}>
    {(item, index) => <span>{index}: {item}</span>}
  </DataList>
);
```

### Restricting children to specific components using union types

```tsx
type ButtonProps = { label: string; onClick: () => void };
type IconProps = { name: string };

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Icon: React.FC<IconProps> = ({ name }) => (
  <span className={`icon-${name}`} />
);

interface ToolbarProps {
  children:
    | React.ReactElement<ButtonProps>
    | React.ReactElement<IconProps>
    | Array<React.ReactElement<ButtonProps> | React.ReactElement<IconProps>>;
}

const Toolbar: React.FC<ToolbarProps> = ({ children }) => (
  <div className="toolbar">{children}</div>
);

// Valid
const toolbarExample = (
  <Toolbar>
    <Button label="Save" onClick={() => {}} />
    <Icon name="star" />
  </Toolbar>
);
```

### Passing a component type as a prop (original issue pattern)

When you want to pass a component *constructor/function* (not an instance) as a prop so the receiving component can render it:

```tsx
type AvatarProps = { src: string; alt: string };
type AvatarComponent = React.FC<AvatarProps>;

const Avatar: AvatarComponent = ({ src, alt }) => (
  <img src={src} alt={alt} />
);

interface LoginProps {
  accounts: object;
  setFormType: (type: string) => void;
  AvatarComponent: AvatarComponent;
}

interface LoginState {
  formType: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = { formType: 'login' };

  render(): JSX.Element {
    const { AvatarComponent: AvatarComp } = this.props;
    return (
      <div>
        <AvatarComp src="user.png" alt="User Avatar" />
      </div>
    );
  }
}

// Usage
const loginExample = (
  <Login
    accounts={{}}
    setFormType={(type) => console.log(type)}
    AvatarComponent={Avatar}
  />
);
```

> **Note:** TypeScript cannot fully enforce at compile time that JSX children are *exactly* a specific component (only that they have the same prop shape). For stricter enforcement, consider runtime checks with `React.Children` utilities or the `react-element-type` pattern. See the [TypeScript issue #13618](https://github.com/Microsoft/TypeScript/issues/13618) for background.
