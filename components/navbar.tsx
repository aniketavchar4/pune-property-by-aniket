'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><div className="container nav-wrap"><Link href="/" className="brand"><span className="brand-mark"><Home size={20}/></span><span>PUNE PROPERTY<small>BY ANIKET</small></span></Link><button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button><nav className={open ? 'nav-links open' : 'nav-links'}><Link href="/">Home</Link><a href="/#properties" onClick={() => setOpen(false)}>Properties</a><Link href="/requirements">Post Requirement</Link><Link href="/login" className="nav-login">Login</Link><Link href="/admin" className="nav-button">List a Property</Link></nav></div></header>;
}
