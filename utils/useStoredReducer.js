import { useEffect, useReducer } from 'react';
import loadStorage from "../storages";

function useStoreReducer(key, reducer, initialState, init, store = "local") {
  const storage = loadStorage(store);
  const storedState = (typeof window !== 'undefined') ? (storage.getItem(key) || initialState) : initialState;

  const [state, dispatch] = useReducer(reducer, storedState, init);

  useEffect(() => {
    if (typeof window !== 'undefined')
      storage.setItem(key, state);
  }, [state, key]);

  return [state, dispatch];
}

export default useStoreReducer;
