# React

---

## Stateless Component - SFC
- stateless component boilerplate
- convenient alias: `React.SFC<Props> === React.StatelessComponent<Props>`

::includes='../../examples/src/components/sfc-counter.tsx'::

---

## Class Component
- class component boilerplate
```tsx
import * as React from 'react';

type Props = {
  initialCount?: number,
};

type State = {
  count: number,
};

class ClassComponent extends React.Component<Props, State> {
  static defaultProps: Partial<Props> = {
    initialCount: 0,
  };

  state: State = {
    count: this.props.initialCount!,
  };

  // declare lifecycle methods as normal instance methods
  componentDidMount() {
    // tslint:disable-next-line:no-console
    console.log('Mounted!');
  }

  // declare handlers as Class Fields arrow functions
  handleIncrement = () => { this.setState({ count: this.state.count + 1 }); };

  render() {
    const { count } = this.state;

    return (
      <section>
        <div>{count}</div>
        <button onClick={this.handleIncrement}>Increment</button>
      </section>
    );
  }
}

export default ClassComponent;
```

---

## Generic List Component
- generic component boilerplate
```tsx
type GenericListProps<T> = {
  items: T[],
  itemRenderer: (item: T) => JSX.Element,
};

class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;

    return (
      <div>
        {items.map(itemRenderer)}      
      </div>
    );
  }
}
```

```tsx
interface IUser {
  id: string,
  name: string,
}

const users: IUser[] = [{
  id: 'uuidv4',
  name: 'Dude',
}];

const UserList = class extends GenericList<IUser> { };

// notice that "items" and "itemRenderer" will infer "IUser" type and guard type errors
ReactDOM.render(
  <UserList
    items={users}
    itemRenderer={(item) => <div key={item.id}>{item.name}</div>} 
  >
  </UserList>
);
```

---

## Connected Container with OwnProps
```tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { returntypeof } from 'react-redux-typescript';

import { RootState, Dispatch } from '../../modules/';
import { incrementCounter } from '../../modules/counter/action-creators';
import { getCounter } from '../../modules/counter/selectors';
import { LABELS } from '../../dictionaries';

type Props = {
  title?: string;
  counter: number;
  incrementCounter: () => void;
}

class CounterContainer extends React.Component<Props, {}> {
  handleIncrement: React.MouseEventHandler<HTMLInputElement> = (ev) => {
    this.props.incrementCounter();
  }
  
  render() {
    const { counter, title = LABELS.COUNTER_TITLE } = this.props;
    
    return (
      <section>
        <h2>{title}</h2>
        <div>{counter}</div>
        <button onClick={this.handleIncrement}>Increment</button>
      </section>
    );
  }
}

// Connected Type
type OwnProps =
  Pick<Props, 'title'>;

const mapStateToProps = (rootState: RootState, ownProps: OwnProps) => ({
  counter: getCounter(rootState),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  incrementCounter: incrementCounter,
}, dispatch);

const Connected = connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
export default Connected;
```

---

## Connected Container without OwnProps using Type Inference
> NOTE: type inference in `connect` function from `react-redux` doesn't provide complete type safety and will not correctly infer resulting Props interface

> This is something I'm trying to improve, please come back later or contribute if have a better solution...

- This solution uses type inference to get Props types from `mapStateToProps` & `mapDispatchToProps` functions
- Minimise manual effort to declare and maintain Props types injected from `connect` helper function
- `returntypeof()` helper function - using smart type inference and generics we can to get the return type of expression (TypeScript does not yet support this feature - [read more](https://github.com/piotrwitek/react-redux-typescript#returntypeof-polyfill))

```tsx
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { returntypeof } from 'react-redux-typescript';

import { RootState, Dispatch } from '../../modules/';
import { incrementCounter } from '../../modules/counter/action-creators';
import { getCounter } from '../../modules/counter/selectors';

const mapStateToProps = (rootState: RootState) => ({
  counter: getCounter(rootState),
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  incrementCounter: incrementCounter,
}, dispatch);

// Props types inferred from mapStateToProps & dispatchToProps
const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type Props = typeof stateProps & typeof dispatchProps;

class CounterContainer extends React.Component<Props, {}> {
  handleIncrement: React.MouseEventHandler<HTMLInputElement> = (ev) => {
    this.props.incrementCounter();
  }
  
  render() {
    const { counter } = this.props;
    
    return (
      <section>
        <input type="number" value={counter} />
        <button onClick={this.handleIncrement}>Increment</button>
        ...
      </section>
    );
  }
}

const Connected = connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
export default Connected;
```

---

## Higher-Order Component
- wrap and decorate input Component returning a new Component
- new Component will inherit Props interface through composition from input Component extended with Props of `HOC`
- using Type Inference to automatically calculate resulting Props interface
- filtering out decorator props and passing only the relevant props through to Wrapped Component
- accepting stateless functional or regular component

```tsx
// controls/button.tsx
import * as React from 'react';
import { Button } from 'antd';

type Props = {
  className?: string,
  autoFocus?: boolean,
  htmlType?: typeof Button.prototype.props.htmlType,
  type?: typeof Button.prototype.props.type,
};

const ButtonControl: React.SFC<Props> = (props) => {
  const { children, ...restProps } = props;

  return (
    <Button {...restProps} >
      {children}
    </Button>
  );
};

export default ButtonControl;
```

```tsx
// decorators/with-form-item.tsx
import * as React from 'react';
import { Form } from 'antd';
const FormItem = Form.Item;

type BaseProps = {
};

type HOCProps = FormItemProps & {
  error?: string;
};

type FormItemProps = {
  label?: typeof FormItem.prototype.props.label;
  labelCol?: typeof FormItem.prototype.props.labelCol;
  wrapperCol?: typeof FormItem.prototype.props.wrapperCol;
  required?: typeof FormItem.prototype.props.required;
  help?: typeof FormItem.prototype.props.help;
  validateStatus?: typeof FormItem.prototype.props.validateStatus;
  colon?: typeof FormItem.prototype.props.colon;
};

export function withFormItem<WrappedComponentProps extends BaseProps>(
  WrappedComponent:
    React.SFC<WrappedComponentProps> | React.ComponentClass<WrappedComponentProps>,
) {
  const HOC: React.SFC<HOCProps & WrappedComponentProps> =
    (props) => {
      const {
        label, labelCol, wrapperCol, required, help, validateStatus, colon,
        error, ...passThroughProps,
      } = props as HOCProps;

      // filtering out empty decorator props in functional style
      const formItemProps: FormItemProps = Object.entries({
        label, labelCol, wrapperCol, required, help, validateStatus, colon,
      }).reduce((definedProps: any, [key, value]) => {
        if (value !== undefined) { definedProps[key] = value; }
        return definedProps;
      }, {});
      
      // injecting additional props based on condition
      if (error) {
        formItemProps.help = error;
        formItemProps.validateStatus = 'error';
      }

      return (
        <FormItem {...formItemProps} hasFeedback={true} >
          <WrappedComponent {...passThroughProps as any} />
        </FormItem>
      );
    };

  return HOC;
}
```

```tsx
// components/consumer-component.tsx
...
import { Button, Input } from '../controls';
import { withFormItem, withFieldState } from '../decorators';

// you can create more specialized components using decorators
const
  ButtonField = withFormItem(Button);

// you can leverage function composition to compose multiple decorators
const
  InputFieldWithState = withFormItem(withFieldState(Input));

// Enhanced Component will inherit Props type from Base Component with all applied HOC's
<ButtonField type="primary" htmlType="submit" wrapperCol={{ offset: 4, span: 12 }} autoFocus={true} >
  Next Step
</ButtonField>
...
<InputFieldWithState {...formFieldLayout} label="Type" required={true} autoFocus={true} 
  fieldState={configurationTypeFieldState} error={configurationTypeFieldState.error}
/>
...

// you could use functional libraries like ramda or lodash to better functional composition like:
const
  InputFieldWithState = compose(withFormItem, withFieldStateInput)(Input);
// NOTE: be aware that compose function need to have sound type declarations or you'll lose type inference
```
