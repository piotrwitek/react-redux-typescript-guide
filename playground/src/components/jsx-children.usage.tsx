import * as React from 'react';

import { Avatar, LoginWithChildren, LoginWithComponent, WrongAvatar } from '.';

export const ValidExamples = () => (
  <>
    <LoginWithComponent Avatar={Avatar} />

    <LoginWithChildren>
      <Avatar name="Ada" size={48} />
    </LoginWithChildren>

    <LoginWithChildren>
      <Avatar name="Ada" />
      <Avatar name="Grace" />
    </LoginWithChildren>
  </>
);

export const InvalidExamples = () => (
  <>
    {/* @ts-expect-error WrongAvatar is not a valid Avatar component */}
    <LoginWithComponent Avatar={WrongAvatar} />
  </>
);
