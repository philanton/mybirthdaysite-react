import '../styles/globals.css'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import Header from '../components/header'

export interface PathFirewall {
  path: string;
  wall_level: 0 /* only public */ | 1 /* only private */ | -1 /* both */;
  name: string;
}

export default function MyApp({ Component, router, pageProps }: AppProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuPathes, setMenuPathes] = useState([] as PathFirewall[]);

  const pathFirewalls: PathFirewall[] = [
    {
      path: '/',
      wall_level: -1,
      name: 'home',
    },
    {
      path: '/profile',
      wall_level: 1,
      name: 'profile',
    },
    {
      path: '/history',
      wall_level: -1,
      name: 'history',
    },
    {
      path: '/login',
      wall_level: 0,
      name: 'log in',
    },
    {
      path: '/signup',
      wall_level: 0,
      name: 'sign up',
    },
    {
      path: '/forecast',
      wall_level: 1,
      name: 'weather',
    }
  ]

  useEffect(() => {
    const _loggedIn = !!(localStorage.getItem('email') && localStorage.getItem('password'));
    setLoggedIn(_loggedIn);

    const pathFirewall: PathFirewall = pathFirewalls.filter(data => data.path === router.asPath)[0];
    if (!(pathFirewall.wall_level !== +!_loggedIn)) {
      router.replace('/');
    }

    const _menuPathes: PathFirewall[] = pathFirewalls.filter(data => {
      return data.wall_level !== +!_loggedIn
    });
    setMenuPathes(_menuPathes);
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>My Birthday Party</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header menuPathes={menuPathes} />
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