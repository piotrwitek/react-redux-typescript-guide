// import { Omit } from 'typical/src';

// From typical
export type Diff<T extends string, U extends string> =
  ({[P in T]: P } &
    {[P in U]: never } & // toString: "toString"; toLocaleString: "toLocaleString"; 
    { [k: string]: never })[T]; // toString: "toString"; toLocaleString: "toLocaleString"; 
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

/**
* Returns a version of type T where all properties which are also in U are optionalized.
* Useful for making props with defaults optional in React components.
* @see https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-319495340
*/
declare type ObjectDiff<T extends object, U extends object> =
  Omit<T, keyof U & keyof T> & {[K in (keyof U & keyof T)]?: T[K]};
