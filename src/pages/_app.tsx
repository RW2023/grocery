// pages/_app.js or app/pages/_app.js
import './globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/app/layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;