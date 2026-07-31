# Using forwardRef with TypeScript

## Basic Usage

`forwardRef` allows you to pass a ref through a component to one of its children. Here's how to type it correctly:

### Function Component with forwardRef

```tsx
import React, { forwardRef, Ref } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

// Using forwardRef with explicit types
const MyComponent = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <div ref={ref} className={props.className}>
        {props.children}
      </div>
    );
  }
);

export default MyComponent;
```

### With Input Element

```tsx
import React, { forwardRef } from 'react';

interface InputProps {
  label: string;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} placeholder={placeholder} />
      </div>
    );
  }
);

export default Input;
```

### Usage Example

```tsx
import React, { useRef, useEffect } from 'react';
import Input from './Input';

function ParentComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input on mount
    inputRef.current?.focus();
  }, []);

  return <Input ref={inputRef} label="Name" placeholder="Enter your name" />;
}
```

## With Redux Connected Components

```tsx
import React, { forwardRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from './store';

const mapState = (state: RootState) => ({
  user: state.user,
});

const mapDispatch = {
  updateUser: (name: string) => ({ type: 'UPDATE_USER', payload: name }),
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface OwnProps {
  className?: string;
}

type Props = PropsFromRedux & OwnProps;

// Create the component with forwardRef
const UserComponent = forwardRef<HTMLDivElement, Props>(
  ({ user, updateUser, className }, ref) => {
    return (
      <div ref={ref} className={className}>
        <p>{user.name}</p>
        <button onClick={() => updateUser('New Name')}>Update</button>
      </div>
    );
  }
);

// Connect after wrapping with forwardRef
export default connector(UserComponent);
```

## Generic forwardRef

```tsx
import React, { forwardRef } from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Generic component with forwardRef
function GenericList<T>(props: ListProps<T>, ref: React.Ref<HTMLUListElement>) {
  return (
    <ul ref={ref}>
      {props.items.map((item, index) => (
        <li key={index}>{props.renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Cast to preserve generics
const List = forwardRef(GenericList) as <T>(
  props: ListProps<T> & { ref?: React.Ref<HTMLUListElement> }
) => React.ReactElement;

export default List;
```

## Key Points

1. **Type Parameters**: `forwardRef<RefType, PropsType>`
   - First parameter: the type of the ref (e.g., `HTMLDivElement`, `HTMLInputElement`)
   - Second parameter: the props interface

2. **Ref Parameter**: Always the second parameter in the component function

3. **Display Name**: Set `displayName` for better debugging:
   ```tsx
   MyComponent.displayName = 'MyComponent';
   ```

4. **Null Refs**: Always check if ref is not null before using:
   ```tsx
   if (ref && 'current' in ref) {
     ref.current?.focus();
   }
   ```

5. **With memo**: Combine with `React.memo` for optimization:
   ```tsx
   const MyComponent = memo(
     forwardRef<HTMLDivElement, Props>((props, ref) => {
       return <div ref={ref}>{props.children}</div>;
     })
   );
   ```
