import localStorage from "./localStorage";
import firestore from "./firestore";

const loadStorage = (store) => {
  if (store === "cloud") return firestore;

  return localStorage;
};

export default loadStorage;
