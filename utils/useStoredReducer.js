import { useEffect, useReducer } from 'react';
import useStorage from "../storages";

function useStoreReducer(key, reducer, initialState, init, store = "local") {
  const storage = useStorage(store);
  const storedState = (typeof window !== 'undefined') ? (storage.getItem(key) || initialState) : initialState;

  const [state, dispatch] = useReducer(reducer, storedState, init);

  useEffect(() => {
    storage.setItem(key, state);
  }, [state, key]);

  return [state, dispatch];
}

export default useStoreReducer;
