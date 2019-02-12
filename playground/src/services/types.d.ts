declare module 'MyTypes' {
  export type Services = typeof import('./index').default;
}
