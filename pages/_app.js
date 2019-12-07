import React from 'react';
import App from 'next/app';
import * as Sentry from '@sentry/browser';

Sentry.init({ dsn: process.env.SENTRY_DSN });

import firebase from "../utils/firebase";
import "firebase/analytics";

if (typeof window !== 'undefined')
  firebase.analytics();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props
    const modifiedPageProps = { ...pageProps, err }

    return <Component {...modifiedPageProps} />
  }
}

export default MyApp;
