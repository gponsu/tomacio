import React, { useState, useEffect } from 'react';
import App from 'next/app';
import * as Sentry from '@sentry/browser';

Sentry.init({ dsn: process.env.SENTRY_DSN });

import firebase from "../utils/firebase";
import "firebase/analytics";
import AuthContext from "../utils/auth/context";

if (typeof window !== 'undefined')
  firebase.analytics();

function Authentication({children}) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUser(user));
  }, []);

  return(
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props
    const modifiedPageProps = { ...pageProps, err }

    return (
      <Authentication>
        <Component {...modifiedPageProps} />
      </Authentication>
    );
  }
}

export default MyApp;
