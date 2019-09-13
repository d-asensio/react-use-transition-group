import React, { useState, useEffect, useCallback } from 'react';

export function RemountComponent({ children }) {
  const [mount, setMount] = useState(true);

  useEffect(() => {
    if (!mount) {
      setMount(true);
    }
  }, [mount]);

  const remount = useCallback(() => {
    setMount(false);
  }, [setMount]);

  if (mount) {
    return children(remount);
  }

  return null;
}
