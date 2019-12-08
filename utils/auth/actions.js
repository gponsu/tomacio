import firebase from "../firebase";
import provider from "./provider";

function signIn() {
  firebase.auth().signInWithRedirect(provider);
}

function signOut() {
  firebase.auth().signOut();
}

export { signIn, signOut };
