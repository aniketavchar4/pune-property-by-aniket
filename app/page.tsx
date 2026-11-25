'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Search, ShieldCheck, KeyRound, Building2,
  MapPin, ArrowRight, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import PropertyCard from '@/components/property-card';
import type { Property } from '@/lib/properties';
import { supabase } from '@/lib/supabase';

export default function HomePage() {
  const [purpose, setPurpose] = useState('All');
  const [category, setCategory] = useState('All Properties');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState<'EN' | 'मराठी'>('EN');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProperties() {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const liveProperties: Property[] = await Promise.all(
        (data || []).map(async (item: any) => {
          let image = '';
          const imagePath = (item.images || []).find(
            (path: string) => /\.(jpg|jpeg|png|webp|gif)$/i.test(path)
          );

          if (imagePath) {
            const { data: signedImage } = await supabase.storage
              .from('property-images')
              .createSignedUrl(imagePath, 3600);
            image = signedImage?.signedUrl || '';
          }

          const type =
            item.property_type === 'Plot / Land' ? 'Plot' :
            ['Shop / Commercial', 'Office'].includes(item.property_type)
              ? 'Commercial' : item.property_type;

          return {
            id: item.id,
            title: item.title,
            location: item.location,
            price: `₹ ${Number(item.price).toLocaleString('en-IN')}${item.price_period === 'month' ? ' / month' : ''}`,
            type,
            purpose: item.purpose,
            beds: item.bedrooms ? `${item.bedrooms} Beds` : 'Details available',
            area: item.area_sqft ? `${item.area_sqft} sq.ft.` : 'Area not specified',
            image,
          };
        })
      );

      setProperties(liveProperties);
      setLoading(false);
    }

    loadProperties();
  }, []);

  const filtered = useMemo(
    () => properties.filter(p =>
      (purpose === 'All' || p.purpose === purpose) &&
      (category === 'All Properties' || p.type === category) &&
      (!location ||
        p.location.toLowerCase().includes(location.toLowerCase()) ||
        p.title.toLowerCase().includes(location.toLowerCase()))
    ),
    [properties, purpose, category, location]
  );

  const marathi = language === 'मराठी';

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="hero-topline">
            <span className="hero-kicker">PUNE REAL ESTATE, MADE SIMPLE</span>
            <button className="language-toggle" onClick={() => setLanguage(marathi ? 'EN' : 'मराठी')}>
              {language === 'EN' ? 'मराठी' : 'English'}
            </button>
          </div>

          <h1>
            {marathi ? <>तुमच्या स्वप्नातील<br /><em>घर शोधा.</em></> : <>Find a place<br />to <em>call home.</em></>}
          </h1>

          <p>
            {marathi
              ? 'पुण्यातील घरे, प्लॉट्स आणि व्यावसायिक जागा एका विश्वासार्ह ठिकाणी.'
              : 'Discover thoughtfully listed homes, plots and commercial spaces across Pune.'}
          </p>

          <div className="search-panel">
            <div className="purpose-tabs">
              {['Buy', 'Rent', 'All'].map(v => (
                <button key={v} className={purpose === v ? 'active' : ''} onClick={() => setPurpose(v)}>
                  {v === 'All' ? 'All listings' : v}
                </button>
              ))}
            </div>

            <div className="search-fields">
              <label>
                <span>LOCATION</span>
                <div>
                  <MapPin size={17} />
                  <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Area, landmark or project" />
                </div>
              </label>

              <label>
                <span>PROPERTY TYPE</span>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option>All Properties</option>
                  <option>Room</option>
                  <option>1RK</option>
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                  <option>3 BHK+</option>
                  <option>Plot</option>
                  <option>Commercial</option>
                </select>
              </label>

              <button className="search-button" onClick={() => document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })}>
                <Search size={18} /> Search
              </button>
            </div>
          </div>

          <div className="hero-trust">
            <span><ShieldCheck size={16} /> Curated property listings</span>
            <span><CheckCircle2 size={16} /> Local Pune focus</span>
          </div>
        </div>
        <div className="hero-note">PUNE · MAHARASHTRA</div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><strong>One place</strong><span>For every property need</span></div>
          <div><strong>Local insight</strong><span>Focused on Pune & nearby</span></div>
          <div><strong>Simple discovery</strong><span>Search with clarity</span></div>
          <div><strong>Personal support</strong><span>Connect with confidence</span></div>
        </div>
      </section>

      <section className="section container" id="properties">
        <div className="section-heading">
          <div>
            <p className="eyebrow">EXPLORE OPPORTUNITIES</p>
            <h2>Find your <em>right fit.</em></h2>
            <p className="section-sub">A handpicked look at places to live, work and invest.</p>
          </div>
          <Link href="/requirements" className="text-link">
            Can’t find what you need? <ArrowRight size={17} />
          </Link>
        </div>

        <div className="category-pills">
          {['All Properties', 'Room', '1RK', '1 BHK', '2 BHK', '3 BHK+', 'Plot', 'Commercial'].map(c => (
            <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="empty-state">Loading properties...</div>
        ) : error ? (
          <div className="empty-state">{error}</div>
        ) : filtered.length > 0 ? (
          <div className="property-grid">
            {filtered.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        ) : (
          <div className="empty-state">No approved properties available in this category yet.</div>
        )}
      </section>

      <section className="dark-promo">
        <div className="container promo-inner">
          <div>
            <p className="eyebrow gold">PROPERTY OWNERS & BROKERS</p>
            <h2>Have a property<br /><em>to list?</em></h2>
            <p>Share your property details and connect with people searching in Pune.</p>
            <Link href="/admin" className="gold-button">Start listing <ArrowRight size={17} /></Link>
          </div>
          <div className="promo-art">
            <div className="promo-art-inner">
              <Building2 size={74} strokeWidth={1} />
              <span>YOUR PROPERTY.<br />THE RIGHT AUDIENCE.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section container requirement-section">
        <div className="requirement-icon"><KeyRound size={28} /></div>
        <div>
          <p className="eyebrow">YOUR SEARCH, YOUR TERMS</p>
          <h2>Tell us what you’re <em>looking for.</em></h2>
          <p className="section-sub">Post your requirement and make your property search more focused.</p>
        </div>
        <Link href="/requirements" className="outline-button">
          Post a requirement <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
