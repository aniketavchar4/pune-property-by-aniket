
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          router.push('/dashboard');
        } else {
          setMessage('Account created! Please check your email to confirm your account.');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push('/dashboard');
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="inner-page container">
      <p className="eyebrow">MEMBER ACCESS</p>

      <h1 className="page-heading">
        {mode === 'login' ? 'Welcome back.' : 'Create your account.'}
      </h1>

      <p className="section-sub">
        {mode === 'login'
          ? 'Login to access your property account.'
          : 'Join Pune Property by Aniket today.'}
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field full">
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="form-field full">
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              minLength={6}
            />
          </label>
        </div>

        <button className="form-submit" type="submit" disabled={loading}>
          {loading
            ? 'Please wait...'
            : mode === 'login'
              ? 'Login'
              : 'Create account'}
        </button>

        {message && <p className="notice">{message}</p>}

        <p className="notice">
          {mode === 'login'
            ? "Don't have an account? "
            : 'Already registered? '}

          <button
            type="button"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setMessage('');
            }}
            style={{
              border: 0,
              background: 'none',
              color: '#b18d55',
              cursor: 'pointer',
              fontWeight: 700,
            }}
          >
            {mode === 'login' ? 'Create account' : 'Login'}
          </button>
        </p>
      </form>
    </main>
  );
}
