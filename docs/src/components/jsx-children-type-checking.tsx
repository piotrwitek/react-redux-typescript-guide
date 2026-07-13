import * as React from 'react';

/**
 * Example 1: Basic children typing with ReactNode
 * ReactNode is the most permissive type, allowing any valid JSX content
 */
interface ContainerProps {
  children: React.ReactNode; // accepts anything renderable: JSX, strings, numbers, etc.
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div>{children}</div>
);

// Usage
const basicExample = (
  <Container>
    <span>Hello</span>
  </Container>
);

/**
 * Example 2: Restricting to a single React element (ReactElement)
 */
interface WrapperProps {
  children: React.ReactElement; // only a single React element
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <div className="wrapper">{children}</div>
);

// Valid usage
const wrapperValid = (
  <Wrapper>
    <span>Only one element allowed</span>
  </Wrapper>
);

// Invalid usage (compile error) - strings not allowed
// const wrapperInvalid = <Wrapper>just a string</Wrapper>;

/**
 * Example 3: Typing children as a specific component type
 * Restrict children to only a particular component
 */
type AvatarProps = {
  src: string;
  alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <img src={src} alt={alt} />
);

interface ProfileProps {
  username: string;
  children: React.ReactElement<AvatarProps>; // must be an Avatar element
}

const Profile: React.FC<ProfileProps> = ({ username, children }) => (
  <div>
    <h2>{username}</h2>
    {children}
  </div>
);

// Valid usage
const profileValid = (
  <Profile username="John">
    <Avatar src="avatar.png" alt="John's avatar" />
  </Profile>
);

// Invalid - TypeScript will warn if children doesn't match AvatarProps shape
// const profileInvalid = (
//   <Profile username="John">
//     <span>Not an avatar</span>
//   </Profile>
// );

/**
 * Example 4: Children as a render function (render prop pattern)
 */
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

/**
 * Example 5: Multiple typed children using a tuple
 * Enforce exactly two children of specific types
 */
type HeaderChild = React.ReactElement<{ title: string }>;
type ContentChild = React.ReactElement<{ body: string }>;

interface TwoChildrenProps {
  children: [HeaderChild, ContentChild];
}

/**
 * Example 6: Children restricted to specific component(s) using union types
 */
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

// Valid usage
const toolbarExample = (
  <Toolbar>
    <Button label="Save" onClick={() => {}} />
    <Icon name="star" />
  </Toolbar>
);

/**
 * Example 7: Class component with typed children (from the original issue)
 * Typing children as a component constructor / functional component type
 */
type AvatarComponent = React.FC<AvatarProps>;

interface LoginProps {
  accounts: object;
  setFormType: (type: string) => void;
  AvatarComponent: AvatarComponent; // passed as a prop (not children)
}

interface LoginState {
  formType: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    formType: 'login',
  };

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
