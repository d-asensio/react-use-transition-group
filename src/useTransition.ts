import { useEffect } from 'react';
import { useUpdateEffect, useStateList } from 'react-use';

const transitionStateSet = ['exited', 'entering', 'entered', 'exiting'];

export default function useTransition(inProp: boolean): string {
  const { state: trState, next: nextTrState } = useStateList(transitionStateSet);

  useUpdateEffect(() => {
    nextTrState();
  }, [inProp]);

  useEffect(() => {
    switch (trState) {
      case 'exiting':
      case 'entering':
        setTimeout(nextTrState, 1000);
        break;
      case 'entered':
      case 'exited':
      default:
        break;
    }
  }, [trState, nextTrState]);

  return trState;
}
