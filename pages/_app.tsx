import 'nprogress/nprogress.css';

import { CacheProvider, EmotionCache } from '@emotion/react';
import type { ReactElement, ReactNode } from 'react';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import type { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import Head from 'next/head';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import type { NextPage } from 'next';
import Router from 'next/router';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import ThemeProvider from 'src/theme/ThemeProvider';
import createEmotionCache from 'src/createEmotionCache';
import nProgress from 'nprogress';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface TokyoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function TokyoApp(props: TokyoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Gestion de Productos</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SidebarProvider>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </LocalizationProvider>
        </ThemeProvider>
      </SidebarProvider>
    </CacheProvider>
  );
}

export default TokyoApp;
