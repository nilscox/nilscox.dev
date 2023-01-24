import { useCallback, useEffect, useRef } from 'react';

export function useMutationObserver(
  target: HTMLElement | null,
  callback: MutationCallback,
  options: MutationObserverInit = {}
) {
  const observer = useRef<MutationObserver | null>(null);

  const stop = useCallback(() => {
    if (!observer.current) {
      return;
    }

    observer.current.disconnect();
    observer.current = null;
  }, []);

  useEffect(() => {
    if (!target || !window.MutationObserver) {
      return;
    }

    observer.current = new window.MutationObserver(callback);
    observer.current?.observe(target, options);

    return stop;
  }, [callback, options, target, stop]);

  return stop;
}
