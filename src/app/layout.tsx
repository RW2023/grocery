import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/Components/Ui/Navbar';
import Footer from '@/Components/Ui/Footer';

export const metadata: Metadata = {
  title: 'Grocery List App',
  description: 'Family Grocery Planning App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="halloween">
      <head>
        {/* Standard favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* For iOS devices */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* For Windows Metro */}
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />

        {/* Other sizes: 32x32, 16x16, etc. */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* Manifest for web app */}
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-base-300">
        <Navbar />
        {children}
      </body>
      <Footer />
    </html>
  );
}
