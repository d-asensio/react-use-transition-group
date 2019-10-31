import { useEffect, useRef } from 'react';
import { useStateSequence } from './useStateSequence';
import { useIsMounting } from './useIsMounting';

export interface TransitionHookReturnValue {
  state: string;
  isMountTransition: boolean;
  isPlaying: boolean;
}
export interface TransitionTimings {
  enter: [number, number];
  exit: [number, number];
}
export interface TransitionOptions {
  queueTransitions?: boolean;
  transitionOnMount?: boolean;
  timings?: TransitionTimings;
  mountTimings?: TransitionTimings;
}

interface TransitionSafeOptions {
  queueTransitions: boolean;
  transitionOnMount: boolean;
  timings: TransitionTimings;
  mountTimings: TransitionTimings;
}

const defaultOptions: TransitionSafeOptions = {
  queueTransitions: false,
  transitionOnMount: false,
  timings: {
    enter: [0, 300],
    exit: [0, 300],
  },
  mountTimings: {
    enter: [0, 300],
    exit: [0, 300],
  },
};

function getSafeOptions(options: TransitionOptions): TransitionSafeOptions {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const mountTimings =
    options && options.mountTimings
      ? options.mountTimings
      : mergedOptions.timings;

  return {
    ...mergedOptions,
    mountTimings,
  };
}

export function useTransition(
  inProp: boolean,
  options: TransitionOptions = {}
): TransitionHookReturnValue {
  const {
    queueTransitions,
    transitionOnMount,
    timings,
    mountTimings,
  } = getSafeOptions(options);

  const getInitialState = (): string => {
    if (inProp) {
      return transitionOnMount ? 'exited' : 'entered';
    } else {
      return transitionOnMount ? 'entered' : 'exited';
    }
  };

  const isMounting = useIsMounting();
  const isMountTransitionRef = useRef(transitionOnMount);
  const isPlayingRef = useRef(transitionOnMount);

  const { state, playSequence } = useStateSequence(getInitialState);

  const transitionTimings = isMountTransitionRef.current
    ? mountTimings
    : timings;
  const { enter: enterDelays, exit: exitDelays } = transitionTimings;

  const [enteringDelay, enteredDelay] = enterDelays;
  const [exitingDelay, exitedDelay] = exitDelays;

  useEffect(() => {
    if (!isMounting || transitionOnMount) {
      (async (): Promise<void> => {
        isPlayingRef.current = true;

        if (inProp) {
          await playSequence(
            [['entering', enteringDelay], ['entered', enteredDelay]],
            !queueTransitions
          );
        } else {
          await playSequence(
            [['exiting', exitingDelay], ['exited', exitedDelay]],
            !queueTransitions
          );
        }

        isMountTransitionRef.current = false;
        isPlayingRef.current = false;
      })();
    }
  }, [inProp]);

  return {
    state,
    isMountTransition: isMountTransitionRef.current,
    isPlaying: isPlayingRef.current,
  };
}
