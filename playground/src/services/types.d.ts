import services from './index';

declare module 'Types' {
  type Services = typeof services;
}
