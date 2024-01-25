import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/Components/Ui/Navbar';

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
      <body className="bg-base-300">
        <Navbar />
        {children}
        </body>
    </html>
  );
}
