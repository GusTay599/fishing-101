// Authentication hook - calls real API backend
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { API_BASE } from '../config/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  preferences: {
    units: 'imperial' | 'metric';
    theme: 'light' | 'dark' | 'system';
    notifications: {
      tide_alerts: boolean;
      solunar_alerts: boolean;
      weather_alerts: boolean;
    };
    default_water_type: 'freshwater' | 'saltwater' | 'brackish';
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<User['preferences']>) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('fishing_user_id');
    if (storedUserId) {
      fetch(`${API_BASE}/auth/me?userId=${storedUserId}`)
        .then(res => {
          if (!res.ok) {
            // 404 = user deleted from DB, 401 = no userId provided
            localStorage.removeItem('fishing_user_id');
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data?.success && data.data?.user) {
            setUser(data.data.user);
          } else if (data !== null) {
            // API returned success:false but not a network error
            localStorage.removeItem('fishing_user_id');
          }
          // data === null means we already cleared localStorage above
        })
        .catch(() => {
          // Network error — don't clear localStorage, just stop loading
          // User will appear logged out this session but can retry on reload
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Login failed');
    }
    setUser(data.data.user);
    localStorage.setItem('fishing_user_id', data.data.user.id);
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setError(null);
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Registration failed');
    }
    setUser(data.data.user);
    localStorage.setItem('fishing_user_id', data.data.user.id);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('fishing_user_id');
  }, []);

  const updatePreferences = useCallback(async (prefs: Partial<User['preferences']>) => {
    if (!user) return;
    const merged = { ...user.preferences, ...prefs };
    const res = await fetch(`${API_BASE}/auth/preferences`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, preferences: merged }),
    });
    const data = await res.json();
    if (data.success && data.data?.user) {
      setUser(data.data.user);
      localStorage.setItem('fishing_user_id', data.data.user.id);
    }
  }, [user]);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, updatePreferences, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
