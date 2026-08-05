// Login Page
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login, loading: authLoading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    clearError();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setSubmitting(false);
    }
  };

  const displayError = error || authError;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: 'var(--spacing-4)' }}>
      <div style={{ maxWidth: '420px', width: '100%' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" style={{ margin: '0 auto var(--spacing-3)' }}>
            <path d="M2 12h20M12 2v20" strokeWidth="3" />
            <circle cx="12" cy="12" r="6" fill="var(--color-primary)" />
            <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: '700', color: 'var(--color-text)' }}>Welcome back</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-1)' }}>Sign in to your Fishing-101.co.uk account</p>
        </div>

        {/* Form Card */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
              {displayError && (
                <div className="alert alert-danger" role="alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="alert-icon" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span className="alert-message">{displayError}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email" className="label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="label">Password</label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-w-full"
                disabled={submitting || authLoading}
                style={{ padding: 'var(--spacing-3)', marginTop: 'var(--spacing-2)' }}
              >
                {submitting ? (
                  <>
                    <span className="spinner-sm" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer link */}
        <p style={{ textAlign: 'center', marginTop: 'var(--spacing-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
            Create one here
          </Link>
        </p>
      </div>
    </div>
  );
}
