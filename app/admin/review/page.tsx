
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  purpose: string;
  property_type: string;
  description: string;
  images: string[];
  status: string;
  created_at: string;
};

export default function AdminReviewPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [busyId, setBusyId] = useState('');

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      router.replace('/login');
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', auth.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      setMessage('Access denied. Admin permission required.');
      setLoading(false);
      return;
    }

    await loadProperties();
  }

  async function loadProperties() {
    setLoading(true);

    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setProperties((data || []) as Property[]);
      setMessage('');
    }

    setLoading(false);
  }

  async function updateStatus(id: string, status: 'published' | 'rejected') {
    setBusyId(id);
    setMessage('');

    const { error } = await supabase
      .from('properties')
      .update({ status })
      .eq('id', id);

    if (error) {
      setMessage(error.message);
    } else {
      setProperties((current) => current.filter((p) => p.id !== id));
      setMessage(
        status === 'published'
          ? 'Property approved and published successfully.'
          : 'Property rejected successfully.'
      );
    }

    setBusyId('');
  }

  if (loading) {
    return (
      <main className="inner-page container">
        Loading admin dashboard...
      </main>
    );
  }

  return (
    <main className="inner-page container">
      <p className="eyebrow">PRIVATE ADMIN AREA</p>
      <h1 className="page-heading">Property approvals</h1>
      <p className="section-sub">
        Review submitted properties before they appear publicly.
      </p>

      {message && <p className="notice">{message}</p>}

      <button
        type="button"
        className="form-submit"
        onClick={loadProperties}
        style={{ marginBottom: 24 }}
      >
        Refresh pending properties
      </button>

      {properties.length === 0 ? (
        <div className="empty-state">
          <h2>No pending properties</h2>
          <p>New property submissions will appear here.</p>
        </div>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <article className="card" key={property.id}>
              <div style={{ padding: 20 }}>
                <p className="eyebrow">
                  {property.purpose} · {property.property_type}
                </p>

                <h2>{property.title}</h2>
                <p>{property.location}</p>
                <h3>₹{Number(property.price).toLocaleString('en-IN')}</h3>
                <p>{property.description}</p>

                <p>
                  <strong>Status:</strong> {property.status}
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="form-submit"
                    disabled={busyId === property.id}
                    onClick={() => updateStatus(property.id, 'published')}
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    className="form-submit"
                    disabled={busyId === property.id}
                    onClick={() => updateStatus(property.id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
