import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useTransition, TransitionTimings, TransitionOptions } from '../../hooks';
import { useIsMounting } from '../../hooks/useIsMounting';

import { StateWheel } from './StateWheel';
import { StatePointer } from './StatePointer';

interface StateWheelProps {
  in: boolean;
  state: string;
  timings: TransitionTimings;
}

const Wrapper = styled.div`
  position: relative;
  width: 403px;
  height: 403px;
`;

const stateToRotationMapping = {
  exited: 0,
  entering: 90,
  entered: 180,
  exiting: 270,
};

const stateToColorMapping = {
  exited: '#EF3749',
  entering: '#EFDA53',
  entered: '#8E66C5',
  exiting: '#3CC9B1',
};

const transitionsOptions: TransitionOptions = {
  queueTransitions: false,
  transitionOnMount: false,
  timings: {
    enter: [300, 500],
    exit: [400, 600],
  },
  mountTimings: {
    enter: [1000, 3000],
    exit: [2000, 6000],
  },
};

// TODO Get it working with concurrent transitions.
// TODO Get it working with mount transitions.
export function TransitionSimulator(props: StateWheelProps) {
  const [inProp, setInProp] = useState(true);

  const isMounting = useIsMounting();

  const { state, isMountTransition } = useTransition(inProp, transitionsOptions);

  console.log(state);

  const [pointerRotation, setPointerRotation] = useState(stateToRotationMapping[state]);
  const [pointerColor, setPointerColor] = useState(stateToColorMapping[state]);
  const [transitionDuration, setTransitionDuration] = useState(0);

  const nextState = () => {
    return {
      exited: 'entering',
      entering: 'entered',
      entered: 'exiting',
      exiting: 'exited',
    }[state];
  };

  const getStateDuration = (stateName: string) => {
    const { timings, mountTimings } = transitionsOptions;
    const currentTimings = isMountTransition ? mountTimings : timings;
    const { enter: enterTimings, exit: exitTimings } = currentTimings;

    const [enterDelay, enterDuration] = enterTimings;
    const [exitDelay, exitDuration] = exitTimings;

    return {
      entering: enterDelay,
      entered: enterDuration,
      exiting: exitDelay,
      exited: exitDuration,
    }[stateName];
  };

  const transitionToNext = () => {
    const nextPointerColor = stateToColorMapping[nextState()];
    const nextTransitionDuration = getStateDuration(nextState());

    setPointerRotation(r => r + 90);
    setPointerColor(nextPointerColor);
    setTransitionDuration(nextTransitionDuration);
  };

  useEffect(() => {
    if (!isMounting) {
      transitionToNext();
    }
  }, [inProp]);

  useEffect(() => {
    if (!isMounting) {
      const initialStates = ['exited', 'entered'];

      // Avoid rotation increment by the initial states, this should be triggered by the
      // 'in' prop to simulate delayed state transitions.
      if (initialStates.includes(state)) {
        return;
      }

      transitionToNext();
    }
  }, [state]);

  return (
    <Wrapper>
      <StateWheel />
      <StatePointer rotation={pointerRotation} color={pointerColor} animationDuration={transitionDuration} />
      <button onClick={() => setInProp(i => !i)}>Play</button>
    </Wrapper>
  );
}
