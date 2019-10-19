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
  const storedState = storage.getItem(key) || initialState;

  const [state, dispatch] = useReducer(reducer, storedState, init);

	useEffect(() => {
		storage.setItem(key, state);
	}, [state, key]);

  return [state, dispatch];
}

export default useStoreReducer;
