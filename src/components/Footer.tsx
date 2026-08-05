// Footer component
import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Catch Log', href: '/catches' },
      { label: 'Tide Tables', href: '/tides' },
      { label: 'Weather & Solunar', href: '/weather' },
      { label: 'Fishing Spots', href: '/spots' },
      { label: 'Statistics', href: '/stats' },
      { label: 'Community Forum', href: '/forum' },
    ],
    Guides: [
      { label: 'Fish Species Guide', href: '/guide' },
      { label: 'Bait & Lure Guide', href: '/bait-guide' },
      { label: 'Fishing Rigs', href: '/rigs' },
      { label: 'Fishing Knots', href: '/knots' },
    ],
    Info: [
      { label: 'UK Fishing Regulations', href: 'https://www.gov.uk/guidance/fishing-regulations-the-blue-book', external: true },
    ],
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 w-full max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="header-brand" aria-label="Fishing-101.co.uk Home">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M2 12h20M12 2v20" stroke="var(--color-primary)" strokeWidth="3" />
                <circle cx="12" cy="12" r="6" fill="var(--color-primary)" />
                <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>Fishing-101.co.uk</span>
            </Link>
            <p className="mt-2 text-text-secondary text-sm max-w-xs">
              Your personal fishing logbook with integrated tides, weather, and solunar forecasts.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-6" aria-label="Footer navigation">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-semibold text-text mb-3">{section}</h4>
                <ul className="space-y-2" role="list">
                  {links.map(link => (
                    <li key={link.label}>
                      {(link as any).external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-text transition-colors">
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.href} className="text-sm text-text-secondary hover:text-text transition-colors">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="divider my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>&copy; {currentYear} Fishing-101.co.uk. All rights reserved.</p>
          <p>
            Built for anglers, by anglers. Data from Open-Meteo, NOAA, and OpenStreetMap.
          </p>
        </div>
      </div>
    </footer>
  );
}