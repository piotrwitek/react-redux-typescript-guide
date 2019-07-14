import React from 'react';
import { storiesOf } from '@storybook/react';

import { IUser, User } from '../models';
import { GenericList } from '../components';

const users = [
  new User('Rosamonte', 'Especial'),
  new User('Aguantadora', 'Despalada'),
  new User('Taragui', 'Vitality'),
];

export class UserList extends GenericList<IUser> {}

storiesOf('GenericList', module).add('default', () => (
  <UserList
    items={users}
    itemRenderer={item => <div key={item.id}>{item.fullName}</div>}
  />
));
