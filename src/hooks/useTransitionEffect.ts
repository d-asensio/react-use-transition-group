import { useEffect } from 'react';
import { useIsMounting } from './useIsMounting';

export function useTransitionEffect(
  effect: () => void,
  triggerState: string | string[],
  currentState: string,
  onUpdateOnly = false
): void {
  const isMounting = useIsMounting();

  useEffect(() => {
    if (!onUpdateOnly || !isMounting) {
      const triggerStates =
        triggerState instanceof Array ? triggerState : [triggerState];

      if (triggerStates.includes(currentState)) {
        return effect();
      }
    }
  }, [currentState]);
}
