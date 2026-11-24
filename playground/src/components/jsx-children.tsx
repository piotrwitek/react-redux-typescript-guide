import * as React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
}

export const Avatar: React.FC<AvatarProps> = ({ name, size = 32 }) => (
  <img alt={name} src={`/avatars/${name}.png`} width={size} height={size} />
);

export const WrongAvatar: React.FC<{ label: string }> = ({ label }) => <span>{label}</span>;

// A component can be passed explicitly as a strongly typed component prop.
interface LoginWithComponentProps {
  Avatar: React.ComponentType<AvatarProps>;
}

export const LoginWithComponent: React.FC<LoginWithComponentProps> = ({ Avatar }) => (
  <Avatar name="Ada" />
);

// JSX children can be constrained to elements whose props match AvatarProps.
interface LoginWithChildrenProps {
  children:
    | React.ReactElement<AvatarProps>
    | React.ReactElement<AvatarProps>[];
}

export const LoginWithChildren: React.FC<LoginWithChildrenProps> = ({ children }) => (
  <>{React.Children.map(children, (child) => {
    if (!React.isValidElement<AvatarProps>(child) || child.type !== Avatar) {
      throw new Error('LoginWithChildren only accepts Avatar elements');
    }

    return child;
  })}</>
);
