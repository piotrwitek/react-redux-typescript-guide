import * as React from 'react';

import { IUser, UserList, UserListItem } from '@src/components';

interface Props {
  users: IUser[],
}

// "items" and "itemRenderer" will check for type errors with "IUser" type
export default ({ users }: Props) => (
  <UserList
    items={users}
    itemRenderer={(item) => <UserListItem key={item.id} item={item} />}
  />
);
