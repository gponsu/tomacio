import { useEffect, useState, useContext } from 'react';
import useStorage from "../storages";
import AuthContext from "./auth/context";

function useStoredState(key, initialState, store = "local") {
  const storage = useStorage(store);
  const [state, setState] = useState(initialState);
  const { currentUser } =  useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const item = await storage.getItem(key, currentUser);
      setState(item || initialState);
    })();
  }, [storage, currentUser]);

  useEffect(() => {
    storage.setItem(key, state, currentUser);
  }, [state, key, currentUser]);

  return [state, setState];
}

export default useStoredState;
