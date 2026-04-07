import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';

export const metadata: Metadata = {
  title: 'Kuba & Kubová Architekti — Architektonické studio Ostrava',
  description:
    'Architektonické studio Michal Kuba & Kateřina Kubová. Rodinné domy, komerční stavby, interiéry a rekonstrukce. 18 let zkušeností v Ostravě.',
  keywords: 'architekti, Ostrava, rodinné domy, komerční stavby, interiéry, rekonstrukce, Michal Kuba, Kateřina Kubová',
  openGraph: {
    title: 'Kuba & Kubová Architekti',
    description: 'Stavby, které obstojí v čase.',
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
