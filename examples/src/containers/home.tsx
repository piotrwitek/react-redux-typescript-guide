import * as React from 'react';

import UserListUsage from '@src/components/user-list.usage';

export const Home = () => {
  return (
    <section>
      <UserListUsage users={[]} />
    </section>
  );
}
