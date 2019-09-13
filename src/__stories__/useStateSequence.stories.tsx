import React from 'react';
import { storiesOf } from '@storybook/react';

import { useStateSequence } from '..';

function Demo() {
  const { state, playSequence } = useStateSequence('initial state');

  const handlePlayButtonClick = () => {
    playSequence([['one', 500], ['two', 500], ['three', 500]]);
  };

  return (
    <div style={{ color: 'white' }}>
      <pre>{state}</pre>
      <button onClick={handlePlayButtonClick}>Play</button>
    </div>
  );
}

storiesOf('Hooks', module).add('useStateSequence', () => <Demo />);
