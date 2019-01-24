import * as React from 'react';

import { withState } from '../hoc';
import { FCCounter } from '../components';

const FCCounterWithState = withState(FCCounter);

export default () => <FCCounterWithState label={'FCCounterWithState'} />;
