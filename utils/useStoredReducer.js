import { useEffect, useReducer } from 'react';

const storage = {
  getItem: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return localStorage.getItem(key);
    }
  },
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value))
}

function useStoreReducer(key, reducer, initialState, init) {
  const storedState = (typeof window !== 'undefined') ? (storage.getItem(key) || initialState) : initialState;

  const [state, dispatch] = useReducer(reducer, storedState, init);

	useEffect(() => {
    if (typeof window !== 'undefined')
		  storage.setItem(key, state);
	}, [state, key]);

  return [state, dispatch];
}

export default useStoreReducer;
