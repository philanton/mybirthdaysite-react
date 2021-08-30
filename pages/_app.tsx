import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/header'

export default function MyApp({ Component, router, pageProps }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const current_path = router.asPath;
  const withHeader = !(current_path === '/welcome' || current_path === '/survey-home');

  useEffect(() => {
    const _loggedIn = !!(localStorage.getItem('email') && localStorage.getItem('password'));
    setLoggedIn(_loggedIn);

    if (_loggedIn && router.asPath === '/login' || !_loggedIn && router.asPath === '/forecast') {
      router.replace('/');
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>My Birthday Party</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {withHeader && <Header loggedIn={loggedIn} />}
      <Component {...pageProps} loggedIn={loggedIn}/>
    </>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};