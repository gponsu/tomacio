import App from 'next/app'
import Router from 'next/router'
import firebase from "../utils/firebase";
import "firebase/analytics";

if (typeof window !== 'undefined')
  firebase.analytics();

export default App;
