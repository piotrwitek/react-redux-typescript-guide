import React from 'react'
import FCCounterUsage from '../components/fc-counter.usage';
import FCSpreadAttributesUsage from '../components/fc-spread-attributes.usage';
import ClassCounterUsage from '../components/class-counter.usage';
import ClassCounterWithDefaultPropsUsage from '../components/class-counter-with-default-props.usage';
import UserListUsage from '../components/generic-list.usage';
import WithErrorBoundaryUsage from '../hoc/with-error-boundary.usage';
import WithStateUsage from '../hoc/with-state.usage';
import WithConnectedCountUsage from '../hoc/with-connected-count.usage';

export function Home() {
  return (
    <section>
      <FCCounterUsage />
      <FCSpreadAttributesUsage />
      <ClassCounterUsage />
      <ClassCounterWithDefaultPropsUsage />
      <UserListUsage />
      <WithErrorBoundaryUsage />
      <WithStateUsage />
      <WithConnectedCountUsage />
    </section>
  );
};
