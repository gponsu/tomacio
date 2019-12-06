import { useEffect, useState } from 'react';
import loadStorage from "../storages";

function migrateFromLocalToCloud(key) {
  const localStorage = loadStorage("local");
  const item = localStorage.getItem(key);

  if (item === null || item.length === 0) return;

  const cloudStorage = loadStorage("cloud");
  cloudStorage.setItem(key, item);
}

function useStoredState(key, initialState, store = "local") {
  const storage = loadStorage(store);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      if (store === "cloud")
        migrateFromLocalToCloud(key);

      const item = await storage.getItem(key);
      setState(item);
    })();
  }, []);

  useEffect(() => {
    storage.setItem(key, state);
  }, [state, key]);

  return [state, setState];
}

export default useStoredState;
