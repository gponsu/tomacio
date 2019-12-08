import { useEffect, useState } from 'react';
import loadStorage from "../storages";

function useStoredState(key, initialState, store = "local") {
  const storage = loadStorage(store);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      const item = await storage.getItem(key);
      setState(item || initialState);
    })();
  }, []);

  useEffect(() => {
    storage.setItem(key, state);
  }, [state, key]);

  return [state, setState];
}

export default useStoredState;
