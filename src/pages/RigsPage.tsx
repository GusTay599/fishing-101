// Fishing Rigs Guide page
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ALL_RIGS, type FishingRig } from '../shared/rigs-data';

const DIFFICULTY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-amber-100 text-amber-800',
  advanced: 'bg-red-100 text-red-800',
};

const CATEGORY_LABELS: Record<string, string> = {
  sea: 'Sea Shore',
  freshwater: 'Lake & River',
  'boat-sea': 'Boat (Sea)',
  'boat-fresh': 'Boat (Lake)',
  canal: 'Canal',
};

const CATEGORY_ICONS: Record<string, ReactNode> = {
  sea: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c1-3 3-3 4 0s3 3 4 0 3-3 4 0 3 3 4 0 3-3 4 0" />
      <path d="M2 18c1-3 3-3 4 0s3 3 4 0 3-3 4 0 3 3 4 0 3-3 4 0" />
    </svg>
  ),
  freshwater: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" />
      <path d="M8 4l4 4 4-4" />
      <path d="M12 10v12" />
    </svg>
  ),
  'boat-sea': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      <path d="M4 17l2-10h12l2 10" />
    </svg>
  ),
  'boat-fresh': (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0" />
      <path d="M4 17l2-10h12l2 10" />
    </svg>
  ),
  canal: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20" />
      <path d="M2 16h20" />
      <path d="M6 8v12" />
      <path d="M18 8v12" />
    </svg>
  ),
};

export function RigsPage() {
  const [category, setCategory] = useState<'all' | 'sea' | 'freshwater' | 'boat-sea' | 'boat-fresh' | 'canal'>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_RIGS.filter(rig => {
    if (category !== 'all' && rig.category !== category) return false;
    if (difficulty !== 'all' && rig.difficulty !== difficulty) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        rig.name.toLowerCase().includes(q) ||
        rig.description.toLowerCase().includes(q) ||
        rig.species.some(s => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="page-content-inner">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Fishing Rigs Guide</h1>
        <p className="text-text-secondary">
          Complete guide to sea and freshwater fishing rigs with step-by-step instructions and diagrams.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-bg-card rounded-xl shadow p-4 mb-6 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-text-secondary mb-1">Search</label>
            <input
              type="text"
              placeholder="Search rigs or species..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input w-full"
            />
          </div>

          {/* Category tabs */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
            <div className="flex gap-1 bg-bg rounded-lg p-1">
              {(['all', 'sea', 'freshwater'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    category === cat
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-text-secondary hover:text-text hover:bg-bg-hover'
                  }`}
                >
                  {cat !== 'all' && CATEGORY_ICONS[cat]}
                  {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty filter */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="input select"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-text-secondary mb-4">
        {filtered.length} rig{filtered.length !== 1 ? 's' : ''} found
      </p>

      {/* Rigs grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <p className="text-lg mb-2">No rigs match your filters.</p>
          <button onClick={() => { setCategory('all'); setDifficulty('all'); setSearch(''); }} className="text-primary hover:underline">
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(rig => (
            <RigCard key={rig.id} rig={rig} />
          ))}
        </div>
      )}
    </div>
  );
}

function RigCard({ rig }: { rig: FishingRig }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-bg-card rounded-xl shadow border border-border overflow-hidden transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-text">{rig.name}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${DIFFICULTY_COLORS[rig.difficulty]}`}>
            {DIFFICULTY_LABELS[rig.difficulty]}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
            {CATEGORY_LABELS[rig.category]}
          </span>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed mb-3">
          {rig.description}
        </p>

        {/* Species tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {rig.species.map(sp => (
            <Link
              key={sp}
              to={`/guide?search=${encodeURIComponent(sp)}`}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-light text-primary hover:bg-primary hover:text-white transition-colors"
            >
              {sp}
            </Link>
          ))}
        </div>
      </div>

      {/* SVG Diagram */}
      <div className="px-5 pb-3">
        <div className="bg-bg rounded-lg p-4 flex items-center justify-center border border-border">
          <div
            dangerouslySetInnerHTML={{ __html: rig.svg }}
            className="rig-svg w-full max-w-[200px]"
          />
        </div>
      </div>

      {/* Expand toggle */}
      <div className="px-5 pb-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-bg hover:bg-bg-hover text-text-secondary hover:text-text font-medium text-sm transition-colors border border-border"
        >
          {expanded ? 'Hide Instructions' : 'Show Step-by-Step Instructions'}
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border pt-4">
          {/* How to */}
          <h4 className="font-semibold text-text mb-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Step-by-Step
          </h4>
          <ol className="space-y-2 mb-5 list-none">
            {rig.howTo.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-secondary">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          {/* Tips */}
          <h4 className="font-semibold text-text mb-3 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            Pro Tips
          </h4>
          <ul className="space-y-2 list-none">
            {rig.tips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-secondary">
                <span className="text-accent flex-shrink-0 mt-0.5">●</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>

          {/* Related links */}
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-2">
            <Link to="/bait-guide" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg hover:bg-bg-hover text-xs font-medium text-text-secondary hover:text-text border border-border transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v8M8 12h8" />
              </svg>
              View Bait Guide
            </Link>
            <Link to="/guide" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg hover:bg-bg-hover text-xs font-medium text-text-secondary hover:text-text border border-border transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              Fish Species Guide
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
