// Settings Page
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

type UserPreferences = {
  units: 'imperial' | 'metric';
  theme: 'light' | 'dark' | 'system';
  notifications: {
    tide_alerts: boolean;
    solunar_alerts: boolean;
    weather_alerts: boolean;
  };
  default_water_type: 'freshwater' | 'saltwater' | 'brackish';
};

export function SettingsPage() {
  const { user, updatePreferences, logout } = useAuth();
  
  const [preferences, setPreferences] = useState<UserPreferences>(user?.preferences || {
    units: 'imperial',
    theme: 'system',
    notifications: {
      tide_alerts: true,
      solunar_alerts: true,
      weather_alerts: false,
    },
    default_water_type: 'freshwater',
  });

  const handlePreferenceChange = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    const updated = { ...preferences, [key]: value } as UserPreferences;
    setPreferences(updated);
    updatePreferences(updated);
  };

  const handleNestedChange = (parent: 'notifications', key: 'tide_alerts' | 'solunar_alerts' | 'weather_alerts', value: boolean) => {
    const updated = {
      ...preferences,
      [parent]: { ...preferences[parent], [key]: value },
    } as UserPreferences;
    setPreferences(updated);
    updatePreferences(updated);
  };

  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'account'>('general');

  return (
    <div className="max-w-3xl mx-auto">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your preferences and account</p>
      </div>

      {/* Tabs */}
      <div className="tabs mb-6" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'general'}
          className={`tab ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'notifications'}
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'account'}
          className={`tab ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-text">General Preferences</h2>
          </div>
          <div className="card-body space-y-6">
            <div className="form-group">
              <label className="label">Units</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="units"
                    value="imperial"
                    checked={preferences.units === 'imperial'}
                    onChange={(e) => handlePreferenceChange('units', e.target.value as 'imperial' | 'metric')}
                    className="radio"
                  />
                  <span>Imperial (lbs, ft, °F, mph)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="units"
                    value="metric"
                    checked={preferences.units === 'metric'}
                    onChange={(e) => handlePreferenceChange('units', e.target.value as 'imperial' | 'metric')}
                    className="radio"
                  />
                  <span>Metric (kg, m, °C, km/h)</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Theme</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={preferences.theme === 'light'}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value as 'light' | 'dark' | 'system')}
                    className="radio"
                  />
                  <span>Light</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={preferences.theme === 'dark'}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value as 'light' | 'dark' | 'system')}
                    className="radio"
                  />
                  <span>Dark</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="theme"
                    value="system"
                    checked={preferences.theme === 'system'}
                    onChange={(e) => handlePreferenceChange('theme', e.target.value as 'light' | 'dark' | 'system')}
                    className="radio"
                  />
                  <span>System</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="label">Default Water Type</label>
              <select
                className="input select"
                value={preferences.default_water_type}
                onChange={(e) => handlePreferenceChange('default_water_type', e.target.value as 'freshwater' | 'saltwater' | 'brackish')}
              >
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater</option>
                <option value="brackish">Brackish</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-text">Notification Preferences</h2>
          </div>
          <div className="card-body space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">Tide Alerts</p>
                <p className="text-sm text-text-secondary">Get notified before high/low tides at your saved spots</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications.tide_alerts}
                  onChange={(e) => handleNestedChange('notifications', 'tide_alerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border after:border-border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">Solunar Alerts</p>
                <p className="text-sm text-text-secondary">Get notified before major/minor feeding periods</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications.solunar_alerts}
                  onChange={(e) => handleNestedChange('notifications', 'solunar_alerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border after:border-border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-text">Weather Alerts</p>
                <p className="text-sm text-text-secondary">Get notified of significant weather changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.notifications.weather_alerts}
                  onChange={(e) => handleNestedChange('notifications', 'weather_alerts', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-border peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-light rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-text-muted after:border after:border-border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Account */}
      {activeTab === 'account' && (
        <>
          <div className="card mb-6">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-text">Account Information</h2>
            </div>
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <div className="avatar avatar-xl">{user?.name.charAt(0).toUpperCase()}</div>
                <div>
                  <h3 className="text-xl font-semibold text-text">{user?.name}</h3>
                  <p className="text-text-secondary">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-text-secondary">Member since</span>
                  <span className="font-medium text-text">January 2024</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-text-secondary">Total catches</span>
                  <span className="font-medium text-text">42</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-text-secondary">Species caught</span>
                  <span className="font-medium text-text">12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-semibold text-text">Danger Zone</h2>
            </div>
            <div className="card-body">
              <p className="text-text-secondary mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
                    logout();
                  }
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </>
      )}

      <div className="mt-6 text-center text-sm text-text-secondary">
        <p>Fishing-101.co.uk v1.0.0</p>
        <p className="mt-1">Built with React, TypeScript, and ❤️ for anglers</p>
      </div>
    </div>
  );
}