import React, { useState, useEffect, ReactElement } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, object } from '@storybook/addon-knobs';

import { useTransition, useTransitionEffect, TransitionOptions } from '..';
import { useIsMounting } from '../hooks/useIsMounting';

interface DemoProps {
  in: boolean;
  transitionOptions: TransitionOptions;
}

function Demo({ in: inProp, transitionOptions }: DemoProps): ReactElement {
  const isMounting = useIsMounting();
  const [inCounter, setInCounter] = useState(0);
  const [transitionCounter, setTransitionCounter] = useState(0);

  const { state, isMountTransition } = useTransition(inProp, transitionOptions);

  useEffect(() => {
    !isMounting && setInCounter(c => c + 1);
  }, [inProp]);

  useTransitionEffect(
    () => {
      setTransitionCounter(c => c + 1);
    },
    ['entered', 'exited'],
    state,
    true
  );

  return (
    <div>
      <div style={{ color: 'white' }}>
        <pre>Is mount transition: {isMountTransition ? 'yes' : 'no'}</pre>
        <pre>Current state: {state}</pre>
        <pre>In prop changed {inCounter} times</pre>
        <pre>You transitioned {transitionCounter} times</pre>
      </div>
    </div>
  );
}

storiesOf('Hooks', module).add('useTransition', () => {
  const inProp = boolean('in', true);
  const queueTransitions = boolean('queueTransitions', false);
  const transitionOnMount = boolean('transitionOnMount', true);
  const timingsEnter = object<[number, number]>('timings.enter', [0, 300]);
  const timingsExit = object<[number, number]>('timings.exit', [0, 300]);
  const mountTimingsEnter = object<[number, number]>('mountTimings.enter', [
    2000,
    3000,
  ]);
  const mountTimingsExit = object<[number, number]>('mountTimings.exit', [
    3000,
    6000,
  ]);

  return (
    <Demo
      in={inProp}
      transitionOptions={{
        queueTransitions,
        transitionOnMount,
        timings: {
          enter: timingsEnter,
          exit: timingsExit,
        },
        mountTimings: {
          enter: mountTimingsEnter,
          exit: mountTimingsExit,
        },
      }}
    />
  );
});
