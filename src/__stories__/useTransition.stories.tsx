import React from 'react';
import { storiesOf } from '@storybook/react';
import { useToggle } from 'react-use';

import { useTransition } from '..';

function Demo() {
  const [transitionIn, toggleTransitionIn] = useToggle(false);
  const transitionState = useTransition(transitionIn);

  return (
    <div>
      <pre>{transitionState}</pre>
      <button onClick={toggleTransitionIn}>Toggle</button>
    </div>
  );
}

storiesOf('useTransition', module).add('main', () => <Demo />);
