// Home Page
import { Link } from 'react-router-dom';
import { useGeolocation } from '../hooks/useApi';
import { useWeather, useTides } from '../hooks/useApi';

export function HomePage() {
  const { position, loading: geoLoading, error: geoError, requestLocation } = useGeolocation();
  const { data: weatherData, loading: weatherLoading } = useWeather(
    position?.latitude || 0,
    position?.longitude || 0
  );
  const { data: tideData, loading: tideLoading } = useTides(
    position?.latitude || 0,
    position?.longitude || 0,
    undefined,
    2
  );

  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      title: 'Catch Logging',
      description: 'Record every catch with species, weight, length, bait, technique, location, and conditions. Build your personal fishing database.',
      href: '/catches',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 12c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0" />
        </svg>
      ),
      title: 'Tide Tables',
      description: 'NOAA-powered tide predictions for 3,000+ stations. See high/low tides, heights, and currents for any coastal location.',
      href: '/tides',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2v2M12 22v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M22 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      ),
      title: 'Weather & Solunar',
      description: 'Real-time conditions, 7-day forecasts, moon phases, and solunar feeding periods to time your trips perfectly.',
      href: '/weather',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: 'Pattern Analysis',
      description: 'Discover your most productive conditions. Filter catches by tide, moon, weather, time, and location to find what works.',
      href: '/stats',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: 'Fishing Spots',
      description: 'Discover and save productive spots. See what species are caught where, access types, and community reports.',
      href: '/spots',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
      title: 'Fish Species Guide',
      description: 'Identify UK fish with our visual guide. Search by species, habitat, bait, and use the fish identifier quiz.',
      href: '/guide',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      title: 'Bait & Lure Guide',
      description: 'Complete guide to UK baits and lures. Find what works for each species with cross-referenced techniques.',
      href: '/bait-guide',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
      title: 'Fishing Rigs',
      description: 'Step-by-step rig guides for sea and freshwater. SVG diagrams, species targets, and pro tips for every setup.',
      href: '/rigs',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: 'Fishing Knots',
      description: 'Complete knot guide with step-by-step instructions and diagrams. Every knot from basic hooks to advanced braid connections.',
      href: '/knots',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: 'Community Forum',
      description: 'Ask questions, share fishing spots, discuss tackle, and connect with the UK fishing community.',
      href: '/forum',
    },
  ];

  return (
    <div>
      <section className="page-header text-center" style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-bg) 100%)' }}>
        <div className="container">
          <h1 className="page-title">Your Fishing Logbook, Elevated</h1>
          <p className="page-subtitle max-w-2xl mx-auto">
            Log catches, check tides, monitor weather, and discover patterns that put more fish in the boat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link to="/catches" className="btn btn-primary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              Start Logging Free
            </Link>
            <Link to="/tides" className="btn btn-secondary btn-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
                <path d="M3 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
                <path d="M3 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
              </svg>
              View Tide Tables
            </Link>
          </div>
        </div>
      </section>

      {position && (
        <section className="container py-8" aria-labelledby="local-conditions-heading">
          <h2 id="local-conditions-heading" className="text-2xl font-bold text-text mb-6">Conditions Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to={`/weather?lat=${position.latitude}&lng=${position.longitude}`} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-light rounded-lg text-primary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2v2M12 22v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M22 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Current Temp</p>
                  <p className="text-2xl font-bold text-text">{weatherData?.current.temperature ?? '—'}°C</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-2 capitalize">{weatherData?.current.description ?? 'Loading...'}</p>
            </Link>

            <Link to={`/tides?lat=${position.latitude}&lng=${position.longitude}`} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-secondary/10 rounded-lg text-secondary">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M3 12c1.5-2.5 3.5-2.5 5 0s3.5 2.5 5 0 3.5-2.5 5 0" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Next Tide</p>
                  {tideData?.predictions[0] && tideData.predictions[0].high_tides[0] && (
                    <p className="text-lg font-bold text-text">
                      {tideData.predictions[0].high_tides[0].type === 'H' ? 'High' : 'Low'} {new Date(tideData.predictions[0].high_tides[0].t).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-2">{tideData?.station.name ?? 'Loading station...'}</p>
            </Link>

            <Link to={`/tides?lat=${position.latitude}&lng=${position.longitude}`} className="card p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/10 rounded-lg text-accent">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Moon Phase</p>
                  <p className="text-lg font-bold text-text capitalize">{weatherData?.moon_phase.phase ?? 'Loading...'}</p>
                </div>
              </div>
              <p className="text-text-secondary text-sm mt-2">{Math.round((weatherData?.moon_phase.illumination ?? 0) * 100)}% illuminated</p>
            </Link>

            <Link to="/catches/new" className="card p-5 hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-lg text-success">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <div>
                  <p className="text-text-secondary text-sm">Log a Catch</p>
                  <p className="text-lg font-bold text-text">Record your session</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {!position && (
        <section className="container py-8 text-center">
          <div className="card p-8 max-w-md mx-auto">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">Enable Location</h3>
            <p className="text-text-secondary mb-6">Get personalized tides, weather, and spot recommendations for your area.</p>
            <button
              onClick={requestLocation}
              disabled={geoLoading}
              className="btn btn-primary w-full"
              aria-busy={geoLoading}
            >
              {geoLoading ? (
                <>
                  <span className="spinner" /> Detecting location...
                </>
              ) : geoError ? (
                'Try Again'
              ) : (
                'Allow Location Access'
              )}
            </button>
            {geoError && (
              <p className="text-danger text-sm mt-3" role="alert">{geoError}</p>
            )}
          </div>
        </section>
      )}

      <section className="container py-8" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-2xl font-bold text-text text-center mb-10">Everything You Need</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Link key={index} to={feature.href} className="card p-6 hover:shadow-lg transition-all hover:-translate-y-0.5 group cursor-pointer block">
              <div className="p-3 bg-primary-light rounded-lg text-primary mb-4 inline-flex group-hover:bg-primary group-hover:text-white transition-colors">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-text-secondary text-sm">{feature.description}</p>
              <div className="mt-4 text-primary text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Go to {feature.title.toLowerCase()} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary-light" aria-labelledby="cta-heading">
        <div className="container text-center">
          <h2 id="cta-heading" className="text-2xl font-bold text-text mb-4">Ready to Fish Smarter?</h2>
          <p className="text-text-secondary max-w-xl mx-auto mb-8">
            Join thousands of anglers who use Fishing-101.co.uk to track catches, predict conditions, and catch more fish.
          </p>
          <Link to="/catches" className="btn btn-primary btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}