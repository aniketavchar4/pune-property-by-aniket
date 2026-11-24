
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={closeMenu}>
          <span className="brand-mark">
            <Home size={20} />
          </span>
          <span>
            PUNE PROPERTY
            <small>BY ANIKET</small>
          </span>
        </Link>

        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? 'nav-links open' : 'nav-links'}>
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/buy" onClick={closeMenu}>Buy</Link>
          <Link href="/rent" onClick={closeMenu}>Rent</Link>
          <Link href="/commercial" onClick={closeMenu}>Commercial</Link>
          <Link href="/plots" onClick={closeMenu}>Plots</Link>
          <Link href="/requirements" onClick={closeMenu}>Post Requirement</Link>
          <Link href="/about" onClick={closeMenu}>About</Link>
          <Link href="/contact" onClick={closeMenu}>Contact</Link>
          <Link href="/login" className="nav-login" onClick={closeMenu}>Login</Link>
          <Link href="/admin" className="nav-button" onClick={closeMenu}>List a Property</Link>
        </nav>
      </div>
    </header>
  );
}
