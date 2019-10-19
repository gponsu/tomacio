import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const intervalRef = useRef();
  const callbackRef = useRef();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

  useEffect(() => {
		function tick() {
      callbackRef.current();
		}

    if (delay !== null) {
      intervalRef.current = setInterval(tick, delay);
      return () => clearInterval(intervalRef.current);
    }
  }, [delay]);
}

export default useInterval;
