import { useEffect, useState, useContext } from 'react';
import localStorage from "./localStorage";
import firestore from "./firestore";
import AuthContext from "../utils/auth/context";

function useStorage(store) {
  const defaultStore = localStorage;
  const [state, setState] = useState(defaultStore);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if(currentUser && store === "cloud") {
      setState(firestore);
    } else {
      setState(localStorage);
    }
  }, [state, currentUser]);

  return state;
}

export default useStorage;
