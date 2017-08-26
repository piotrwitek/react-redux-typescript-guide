import * as React from 'react';

import { IUser } from '@src/models'
import { UserList } from '@src/components';

// "items" and "itemRenderer" will check for type errors with "IUser" type
export default ({ users }: { users: IUser[] }) => (
  <UserList
    items={users}
    itemRenderer={(item) => <div key={item.id}>{item.fullName}</div>}
  />
);
