import React from 'react';

import ClassCounterWithDefaultPropsUsage from '../components/class-counter-with-default-props.usage';
import ClassCounterUsage from '../components/class-counter.usage';
import FCCounterUsage from '../components/fc-counter.usage';
import FcForwardRefUsage from '../components/fc-forward-ref.usage';
import FCSpreadAttributesUsage from '../components/fc-spread-attributes.usage';
import UserListUsage from '../components/generic-list.usage';
import WithConnectedCountUsage from '../hoc/with-connected-count.usage';
import WithErrorBoundaryUsage from '../hoc/with-error-boundary.usage';
import WithStateUsage from '../hoc/with-state.usage';

export function Home() {
  return (
    <section>
      <FCCounterUsage />
      <FcForwardRefUsage />
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
