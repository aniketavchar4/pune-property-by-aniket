import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
  title: 'PUNE PROPERTY | BY ANIKET',
  description: 'Find homes, rooms, plots and commercial properties in Pune.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Navbar />{children}<footer className="footer"><div className="container footer-inner"><div><strong>PUNE PROPERTY <span>| BY ANIKET</span></strong><p>Your next place starts here.</p></div><p>© {new Date().getFullYear()} Pune Property. All rights reserved.</p></div></footer></body></html>;
}
