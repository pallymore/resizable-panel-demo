import { useCallback, useRef, useEffect, useState } from 'react';

export const useResizableContainer = ({
  maxWidth = window.innerWidth,
  minWidth = 0,
} = {}) => {
  const container = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const handleResize = useCallback(
    (e) => {
      if (!container.current) {
        return;
      }

      e.preventDefault();

      let newWidth = window.innerWidth - e.pageX; // right side panel only
      if (newWidth >= maxWidth) {
        newWidth = maxWidth;
      }
      if (newWidth <= minWidth) {
        newWidth = minWidth;
      }

      container.current.style.width = `${newWidth}px`;
    },
    [maxWidth, minWidth]
  );

  useEffect(() => {
    if (!isResizing) {
      return undefined;
    }

    document.addEventListener('pointermove', handleResize);
    document.addEventListener('pointerup', stopResizing);

    return () => {
      document.removeEventListener('pointermove', handleResize);
      document.removeEventListener('pointerup', stopResizing);
    };
  }, [handleResize, isResizing, stopResizing]);

  return {
    container,
    startResizing,
    isResizing,
  };
};
