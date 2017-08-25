// augmentations.ts

// import { Operator } from 'rxjs/Operator';
// import { Observable } from 'rxjs/Observable';
// declare module 'rxjs/Subject' {
//   // tslint:disable-next-line:interface-name
//   interface Subject<T> {
//     lift<R>(operator: Operator<T, R>): Observable<R>;
//   }
// }

// import { Reducer } from 'redux';

declare module 'redux' {
  export type TypedReducer<S, A = any> = (state: S, action: A) => S;

  export function combineReducers<S, A = any>(
    reducers: {[K in keyof S]: TypedReducer<S[K], A>},
  ): TypedReducer<S, A>;
}

