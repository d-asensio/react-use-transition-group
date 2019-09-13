import { useRef, useState, useEffect } from 'react';
import { useIsMounting } from './useIsMounting';

interface StateSequenceHook<T> {
  state: T;
  playSequence: (stateSequence: Array<[T, number]>, playImmediate?: boolean) => Promise<void>;
}

interface PendingJob<T> {
  sequence: StateSequence<T>;
  sequenceEndHandler: () => void;
}

export type StateSequence<T> = Array<[T, number]>;

export function useStateSequence<T>(initialState: T | (() => T)): StateSequenceHook<T> {
  const isMounting = useIsMounting();
  const [state, setState] = useState(initialState);

  const sequenceRef = useRef<StateSequence<T>>([]);
  const sequenceIndexRef = useRef(-1);
  const sequenceIsPlayingRef = useRef(false);
  const sequenceTimersAreCancelledRef = useRef(false);
  const sequenceEndHandlerRef = useRef(() => {});

  const stagedStateRef = useRef<T | null>(null);
  const activeTimerRef = useRef(-1);

  const sequenceQueueRef = useRef<Array<PendingJob<T>>>([]);

  const resetSequence = (sequence: StateSequence<T> = [], sequenceEndHandler: () => void = () => {}) => {
    sequenceRef.current = sequence;
    sequenceIndexRef.current = -1;
    sequenceTimersAreCancelledRef.current = false;
    sequenceEndHandlerRef.current = sequenceEndHandler;
    sequenceIsPlayingRef.current = false;
    stagedStateRef.current = null;
  };

  const cancelActiveTimers = () => {
    clearTimeout(activeTimerRef.current);
    sequenceTimersAreCancelledRef.current = true;
    applyStagedState();
  };

  const enqueuePendingJob = (pendingJob: PendingJob<T>) => {
    sequenceQueueRef.current.push(pendingJob);
  };

  const nextPendingJob = () => {
    return sequenceQueueRef.current.shift();
  };

  const timersAreCancelled = () => {
    return sequenceTimersAreCancelledRef.current;
  };

  const isPlaying = () => {
    return sequenceIsPlayingRef.current;
  };

  const isLastSequenceState = () => {
    return sequenceRef.current.length === sequenceIndexRef.current + 1;
  };

  const nextSequenceState = () => {
    sequenceIndexRef.current++;
    const nextState = sequenceRef.current[sequenceIndexRef.current];

    return nextState || [];
  };

  const stageState = (stateToStage: T) => {
    stagedStateRef.current = stateToStage;
  };

  const applyStagedState = () => {
    const nextState = stagedStateRef.current;

    if (nextState !== null) {
      setState(nextState);
    }
  };

  const setNextDelayedState = () => {
    const [nextState, delayToNext] = nextSequenceState();

    stageState(nextState);

    if (timersAreCancelled()) {
      applyStagedState();
    } else {
      activeTimerRef.current = setTimeout(applyStagedState, delayToNext);
    }
  };

  const startSequenceReproduction = (sequence: StateSequence<T> = [], sequenceEndHandler: () => void = () => {}) => {
    resetSequence(sequence, sequenceEndHandler);
    sequenceIsPlayingRef.current = true;
    setNextDelayedState();
  };

  const notifySequenceEnd = () => {
    sequenceEndHandlerRef.current();
  };

  const playSequence = async (sequence: StateSequence<T>, playImmediate: boolean = true): Promise<void> => {
    return new Promise((sequenceEndHandler, throwError) => {
      if (!sequence || !sequence.length) {
        throwError(
          new Error('useStateSequence should not be used with an empty state sequence. Use' + 'React.setState instead.')
        );
      }
      if (sequence.length < 2) {
        throwError(
          new Error(
            "useStateSequence should not be used with less than two states. You'd probably" +
              'want to use React.setState instead.'
          )
        );
      }
      if (isPlaying()) {
        if (playImmediate) {
          cancelActiveTimers();
        }
        enqueuePendingJob({
          sequence,
          sequenceEndHandler,
        });
      } else {
        startSequenceReproduction(sequence, sequenceEndHandler);
      }
    });
  };

  useEffect(() => {
    if (!isMounting) {
      if (!isLastSequenceState()) {
        setNextDelayedState();
      } else {
        notifySequenceEnd();

        resetSequence();
        const pendingJob = nextPendingJob();

        if (pendingJob) {
          const { sequence, sequenceEndHandler } = pendingJob;
          startSequenceReproduction(sequence, sequenceEndHandler);
        }
      }
    }
  }, [state]);

  return {
    state,
    playSequence,
  };
}
