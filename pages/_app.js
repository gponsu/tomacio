import App from 'next/app'
import Router from 'next/router'
import * as Sentry from '@sentry/browser';
import firebase from "../utils/firebase";
import "firebase/analytics";

Sentry.init({ dsn: process.env.SENTRY_DSN });

if (typeof window !== 'undefined')
  firebase.analytics();

export default App;
