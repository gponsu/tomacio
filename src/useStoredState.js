import { useEffect, useState } from 'react';

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

function useStoredState(key, initialState) {
  const storedState = storage.getItem(key) || initialState;

  const [state, setState] = useState(storedState)

	useEffect(() => {
		storage.setItem(key, state);
	}, [state, key]);

  return [state, setState];
}

export default useStoredState;
