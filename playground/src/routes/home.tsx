import * as React from 'react';

import FCCounter from '../components/fc-counter.usage';
import FCSpreadAttributes from '../components/fc-spread-attributes.usage';
import ClassCounter from '../components/class-counter.usage';
import ClassCounterWithDefaultProps from '../components/class-counter-with-default-props.usage';
import UserListUsage from '../components/generic-list.usage';

export const Home = () => {
  return (
    <section>
      <FCCounter />
      <FCSpreadAttributes />
      <ClassCounter />
      <ClassCounterWithDefaultProps />
      <UserListUsage />
    </section>
  );
};
