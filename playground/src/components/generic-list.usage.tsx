import * as React from 'react';

import { IUser, User } from '@src/models';
import { GenericList } from '@src/components';

export class UserList extends GenericList<IUser> { }

export default (() => (
  <UserList
    items={[new User('Piotr', 'Witek')]}
    itemRenderer={(item) => <div key={item.id}>{item.fullName}</div>}
  />
)) as React.SFC<{}>;
