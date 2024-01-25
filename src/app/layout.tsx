import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en"data-theme="halloween">
      <body className="bg-base-300">{children}</body>
    </html>
  );
}
