import * as React from 'react';

import { GenericList } from './generic-list';

export interface IUser {
  id: string,
  name: string,
}

export const UserList = class extends GenericList<IUser> { };

export const UserListItem: React.SFC<{ item: IUser }> = ({ item }) => (
  <div>{item.name}</div>
);
