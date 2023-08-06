import { RefObject, useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
