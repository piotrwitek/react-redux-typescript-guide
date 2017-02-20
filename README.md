# React / Redux / TypeScript Patterns
Results of my research while working with React / Redux / TypeScript.
I especially focused on:
- 100% type safety
- reduced boilerplate
- leverage type inferrence
- minimize type annotations maintenance costs

### Table of Contents
- [Actions](#actions)
- [Reducers](#reducers)
- [Store & RootState](#store-rootstate)
- [React Connected Components](#react-connected-components)
- [Projects](#projects)

---

## Actions
- 100% type safety achieved

### KISS Approach
- more boilerplate
- classic const based types
- close to standard JS usage
- more work to use in other modules (need to export both const type and action creator)
- `returntypeof` helper abstraction to harvest action types - (reference)[https://github.com/piotrwitek/react-redux-typescript/issues/1]

In this case I focused on KISS, without using any abstractions and to be as close as possible to common Redux Pattern used in JS.

```ts
// Action Creators
export const LOAD_CURRENCY_RATES = 'currencyRates/LOAD_CURRENCY_RATES';
export const loadCurrencyRates = () => ({
  type: LOAD_CURRENCY_RATES as typeof LOAD_CURRENCY_RATES,
});

export const LOAD_CURRENCY_RATES_SUCCESS = 'currencyRates/LOAD_CURRENCY_RATES_SUCCESS';
export const loadCurrencyRatesSuccess = (payload: IFixerServiceResponse) => ({
  type: LOAD_CURRENCY_RATES_SUCCESS as typeof LOAD_CURRENCY_RATES_SUCCESS,
  payload,
});

export const LOAD_CURRENCY_RATES_ERROR = 'currencyRates/LOAD_CURRENCY_RATES_ERROR';
export const loadCurrencyRatesError = (payload: string) => ({
  type: LOAD_CURRENCY_RATES_ERROR as typeof LOAD_CURRENCY_RATES_ERROR,
  payload,
});

// Action Types
const ActionTypes = {
  loadCurrencyRates: returntypeof(loadCurrencyRates),
  loadCurrencyRatesSuccess: returntypeof(loadCurrencyRatesSuccess),
  loadCurrencyRatesError: returntypeof(loadCurrencyRatesError),
};
type Action = typeof ActionTypes[keyof typeof ActionTypes];
```

### DRY Approach
- less boilerplate
- minimize repeated code
- `ActionCreator` helper factory function to create typed instances of actions - (reference)[https://github.com/piotrwitek/react-redux-typescript]
- easy to import in other modules (export only action creators bundle, no need for extra type constants) e.g. redux-observable epics (example)[TODO]
- very easy to get all of action types

In this case I created a helper factory function to help create typed actions and easily import and use in other places like redux-observable epics

```ts
// Action Creators
export const ActionCreators = {
  UpdateBaseCurrency: new ActionCreator<'UpdateBaseCurrency', string>('UpdateBaseCurrency'),
  UpdateBaseValue: new ActionCreator<'UpdateBaseValue', string>('UpdateBaseValue'),
};

// Action Types
type Action = typeof ActionCreators[keyof typeof ActionCreators];
```

---

## Reducers
- 100% type safety achieved
- leveraging (Discriminated Union types)[https://www.typescriptlang.org/docs/handbook/advanced-types.html]
  - to guard for specific Action type in each case
- using Partial from (Mapped types)[https://www.typescriptlang.org/docs/handbook/advanced-types.html]
  - to guard partialState compatibility with State type

### Switch Approach
- using classic const based types

```ts
// State
export type State = {
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly lastUpdated: number | null;
  readonly base: string;
  readonly rates: any;
  readonly date: string;
};
export const initialState: State = {
  isLoading: false,
  error: null,
  lastUpdated: null,
  base: CACHE.base,
  rates: CACHE.rates,
  date: CACHE.date,
};

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  switch (action.type) {
    case LOAD_CURRENCY_RATES:
      partialState = {
        isLoading: true, error: null,
      };
      break;
    case LOAD_CURRENCY_RATES_SUCCESS:
      const { base, rates, date } = action.payload;
      partialState = {
        isLoading: false, lastUpdated: Date.now(), base, rates, date,
      };
      break;
    case LOAD_CURRENCY_RATES_ERROR:
      partialState = {
        isLoading: false, error: action.payload,
      };
      break;

    default: return state;
  }

  return { ...state, ...partialState };
}
```

### If Approach
- using ActionCreator helper types

```ts
// State
export type State = {
  readonly baseCurrency: string;
  readonly targetCurrency: string;
  readonly baseValue: string;
  readonly targetValue: string;
};
export const initialState: State = {
  baseCurrency: 'PLN',
  targetCurrency: 'SEK',
  baseValue: '0',
  targetValue: '0',
};

// Reducer
export default function reducer(state: State = initialState, action: Action): State {
  let partialState: Partial<State> | undefined;

  if (action.type === ActionCreators.UpdateBaseCurrency.type) {
    partialState = { baseCurrency: action.payload };
  }
  if (action.type === ActionCreators.UpdateBaseValue.type) {
    partialState = { baseValue: action.payload };
  }

  return partialState != null ? { ...state, ...partialState } : state;
}
```

---

## React Connected Components
### WIP

```tsx

```

---

## Store & RootState

`RootState` - should be imported in connected components to provide type safety for `connect` helper
```ts
import {
  default as currencyRatesReducer, State as CurrencyRatesState,
} from './currency-rates/reducer';
import {
  default as currencyConverterReducer, State as CurrencyConverterState,
} from './currency-converter/reducer';

export type RootState = {
  currencyRates: CurrencyRatesState;
  currencyConverter: CurrencyConverterState;
};
```

Use `RootState` in combineReducers and rehydrated State to obtain a typed store instance
```ts
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers<RootState>({
  currencyRates: currencyRatesReducer,
  currencyConverter: currencyConverterReducer,
});

// rehydrating state on app start: implement here...
const recoverState = (): RootState => ({} as RootState);

export const store = createStore(
  rootReducer,
  recoverState(),
);
```
