import React from 'react';

import { FancyButton } from '.';

const ref = React.createRef<HTMLButtonElement>();
export default () => <FancyButton ref={ref}>Click me!</FancyButton>;
