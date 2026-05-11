import * as React from 'react';

import { TodoListConnected } from '.';

export default () => (
  <TodoListConnected
    itemRenderer={item => <div key={item.id}>{item.title}</div>}
  />
);
