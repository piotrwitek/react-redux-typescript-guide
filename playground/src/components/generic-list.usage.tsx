import * as React from 'react';

import { IUser } from '@src/models';
import { GenericList } from '@src/components';

export class UserList extends GenericList<IUser> { }

export default ({ users }: { users: IUser[] }) => (
  <UserList
    items={users}
    itemRenderer={(item) => <div key={item.id}>{item.fullName}</div>}
  />
);
