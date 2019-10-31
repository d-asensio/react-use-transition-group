import { useEffect, useRef } from 'react';

export function useIsMounting(): boolean {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    }
  });

  return isInitialMount.current;
}
