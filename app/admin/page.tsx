
'use client';

import { useEffect, useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const MAX_FILES = 8;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;

export default function AdminPage() {
  const router = useRouter();

  const [userId, setUserId] = useState('');
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    let active = true;

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;

      if (error || !data.user) {
        router.replace('/login');
        return;
      }

      setUserId(data.user.id);
      setChecking(false);
    });

    return () => {
      active = false;
    };
  }, [router]);

  function selectFiles(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || []);
    setError('');

    if (selected.length > MAX_FILES) {
      setError('Please select a maximum of 8 photos/videos.');
      e.target.value = '';
      setFiles([]);
      return;
    }

    const invalid = selected.find((file) => {
      const image = file.type.startsWith('image/');
      const video = file.type.startsWith('video/');

      return (
        (!image && !video) ||
        (image && file.size > MAX_IMAGE_SIZE) ||
        (video && file.size > MAX_VIDEO_SIZE)
      );
    });

    if (invalid) {
      setError('Photos must be 10 MB or less and videos 50 MB or less.');
      e.target.value = '';
      setFiles([]);
      return;
    }

    setFiles(selected);
  }

  async function submitProperty(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    setError('');
    setMessage('');

    if (!userId) {
      setError('Please log in before posting a property.');
      return;
    }

    if (files.length === 0) {
      setError('Please select at least one photo or video.');
      return;
    }

    setBusy(true);
    const uploadedPaths: string[] = [];

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();

      if (authError || !authData.user || authData.user.id !== userId) {
        throw new Error('Your login session has expired. Please log in again.');
      }

      const purpose = String(form.get('purpose'));

      for (const file of files) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
        const path = `${userId}/${crypto.randomUUID()}-${safeName}`;

        const { error: uploadError } = await supabase.storage
          .from('property-images')
          .upload(path, file, {
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) throw uploadError;

        uploadedPaths.push(path);
      }

      const { error: insertError } = await supabase
        .from('properties')
        .insert({
          owner_id: userId,
          title: String(form.get('title')).trim(),
          description: String(form.get('description')).trim(),
          location: String(form.get('location')).trim(),
          city: 'Pune',
          price: Number(form.get('price')),
          price_period: purpose === 'Rent' ? 'month' : 'total',
          property_type: String(form.get('property_type')),
          purpose,
          bedrooms: form.get('bedrooms')
            ? Number(form.get('bedrooms'))
            : null,
          area_sqft: form.get('area_sqft')
            ? Number(form.get('area_sqft'))
            : null,
          images: uploadedPaths,
          status: 'pending',
        });

      if (insertError) throw insertError;

      formElement.reset();
      setFiles([]);
      setMessage(
        'Property submitted successfully! It is waiting for approval.'
      );
    } catch (err) {
      if (uploadedPaths.length > 0) {
        await supabase.storage
          .from('property-images')
          .remove(uploadedPaths);
      }

    const details =
  err && typeof err === 'object' && 'message' in err
    ? String(err.message)
    : String(err);

setError(details);
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return (
      <main className="inner-page container">
        <p>Checking your login...</p>
      </main>
    );
  }

  return (
    <main className="inner-page container">
      <p className="eyebrow">PROPERTY OWNER</p>

      <h1 className="page-heading">List your property.</h1>

      <p className="section-sub">
        Add accurate property details and upload photos or videos.
        Your listing will be reviewed before it appears publicly.
      </p>

      <form className="form-card" onSubmit={submitProperty}>
        <div className="form-grid">

          <label className="form-field">
            Listing title
            <input
              name="title"
              required
              placeholder="e.g. Spacious 2 BHK in Narhe"
            />
          </label>

          <label className="form-field">
            Looking to
            <select name="purpose" required>
              <option value="Buy">Sell property</option>
              <option value="Rent">Rent out property</option>
            </select>
          </label>

          <label className="form-field">
            Property category
            <select name="property_type" required>
              <option>Room</option>
              <option>1RK</option>
              <option>1 BHK</option>
              <option>2 BHK</option>
              <option>3 BHK+</option>
              <option>Plot / Land</option>
              <option>Shop / Commercial</option>
              <option>Office</option>
              <option>House / Villa</option>
            </select>
          </label>

          <label className="form-field">
            Price (₹)
            <input
              name="price"
              type="number"
              min="1"
              required
              placeholder="e.g. 15000"
            />
          </label>

          <label className="form-field">
            Location
            <input
              name="location"
              required
              placeholder="e.g. Narhe, Pune"
            />
          </label>

          <label className="form-field">
            Area (sq. ft.)
            <input
              name="area_sqft"
              type="number"
              min="1"
              placeholder="e.g. 950"
            />
          </label>

          <label className="form-field">
            Bedrooms
            <input
              name="bedrooms"
              type="number"
              min="0"
              max="20"
              placeholder="e.g. 2"
            />
          </label>

          <label className="form-field full">
            Description
            <textarea
              name="description"
              placeholder="Add property details, amenities and nearby landmarks."
            />
          </label>

          <label className="form-field full">
            Property photos / videos
            <input
              id="property-media"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={selectFiles}
            />

            <small>
              Maximum 8 files. Photos up to 10 MB and videos up to 50 MB each.
            </small>

            {files.length > 0 && (
              <small>
                {files.length} file(s) selected:{' '}
                {files.map((file) => file.name).join(', ')}
              </small>
            )}
          </label>

        </div>

        {error && (
          <p className="notice" role="alert">{error}</p>
        )}

        {message && (
          <p className="notice" role="status">{message}</p>
        )}

        <button
          className="form-submit"
          type="submit"
          disabled={busy}
        >
          {busy ? 'Uploading and submitting...' : 'Submit property for approval'}
        </button>
      </form>
    </main>
  );
}
