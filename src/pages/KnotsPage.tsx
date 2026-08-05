// Fishing Knots Guide page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ALL_KNOTS,
  KNOT_CATEGORIES,
  DIFFICULTY_LABELS,
  type FishingKnot,
} from '../shared/knots-data';

const DIFFICULTY_COLORS: Record<string, string> = {
  beginner: 'bg-green-100 text-green-800',
  intermediate: 'bg-amber-100 text-amber-800',
  advanced: 'bg-red-100 text-red-800',
};

const CATEGORY_ICONS: Record<string, string> = {
  'hook-to-line': '🪝',
  'line-to-line': '🔗',
  'loop-knots': '⭕',
  specialist: '⭐',
};

function StrengthBar({ value }: { value: number }) {
  const color =
    value >= 95 ? 'bg-green-500' : value >= 85 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs font-medium text-text-secondary tabular-nums">{value}%</span>
    </div>
  );
}

function KnotCard({ knot }: { knot: FishingKnot }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div className="card-body">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-text">{knot.name}</h3>
            <p className="text-sm text-text-secondary mt-1">{knot.description}</p>
          </div>
          <span
            className={`ml-3 px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${DIFFICULTY_COLORS[knot.difficulty]}`}
          >
            {DIFFICULTY_LABELS[knot.difficulty]}
          </span>
        </div>

        {/* Strength bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-text-secondary">Line Strength Retained</span>
          </div>
          <StrengthBar value={knot.strength} />
        </div>

        {/* Best for tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {knot.bestFor.map(use => (
            <span key={use} className="px-2 py-0.5 bg-primary-light/20 text-primary rounded-full text-xs font-medium">
              {use}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1 mt-2"
        >
          {expanded ? '▾ Hide Guide' : '▸ Show Step-by-Step Guide'}
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* SVG Diagram */}
              <div className="lg:w-1/3 flex-shrink-0">
                <div className="bg-bg rounded-xl p-4 border border-border">
                  <h4 className="text-sm font-semibold text-text-secondary mb-2">Diagram</h4>
                  <div
                    className="knot-svg"
                    dangerouslySetInnerHTML={{ __html: knot.svg }}
                  />
                </div>
              </div>

              {/* Step-by-step instructions */}
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-text-secondary mb-3">How to Tie It</h4>
                <ol className="space-y-3">
                  {knot.howTo.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-sm text-text pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>

                {/* Tips */}
                {knot.tips.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <h5 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-1.5">
                      <span>💡</span> Pro Tips
                    </h5>
                    <ul className="space-y-1.5">
                      {knot.tips.map((tip, i) => (
                        <li key={i} className="text-sm text-amber-700 flex gap-2">
                          <span className="text-amber-400">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function KnotsPage() {
  const [category, setCategory] = useState<string>('all');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filtered = ALL_KNOTS.filter(knot => {
    if (category !== 'all' && knot.category !== category) return false;
    if (difficulty !== 'all' && knot.difficulty !== difficulty) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        knot.name.toLowerCase().includes(q) ||
        knot.description.toLowerCase().includes(q) ||
        knot.bestFor.some(b => b.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="page-content-inner">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Fishing Knots Guide</h1>
        <p className="text-text-secondary">
          Every knot you need — from basic hooks to advanced braid connections. Step-by-step
          instructions with diagrams.
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
              placeholder="Search knots or uses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input w-full"
            />
          </div>

          {/* Category */}
          <div className="w-full md:w-48">
            <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="input w-full"
            >
              <option value="all">All Categories</option>
              {Object.entries(KNOT_CATEGORIES).map(([key, label]) => (
                <option key={key} value={key}>
                  {CATEGORY_ICONS[key]} {label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div className="w-full md:w-44">
            <label className="block text-sm font-medium text-text-secondary mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              className="input w-full"
            >
              <option value="all">All Levels</option>
              <option value="beginner">🟢 Beginner</option>
              <option value="intermediate">🟡 Intermediate</option>
              <option value="advanced">🔴 Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            category === 'all'
              ? 'bg-primary text-white'
              : 'bg-bg-card text-text-secondary hover:bg-bg border border-border'
          }`}
        >
          All ({ALL_KNOTS.length})
        </button>
        {Object.entries(KNOT_CATEGORIES).map(([key, label]) => {
          const count = ALL_KNOTS.filter(k => k.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === key
                  ? 'bg-primary text-white'
                  : 'bg-bg-card text-text-secondary hover:bg-bg border border-border'
              }`}
            >
              {CATEGORY_ICONS[key]} {label} ({count})
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-sm text-text-secondary mb-4">
        Showing {filtered.length} of {ALL_KNOTS.length} knots
      </p>

      {/* Knots list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card">
            <div className="card-body text-center py-12">
              <p className="text-text-muted">No knots match your search. Try different filters.</p>
            </div>
          </div>
        ) : (
          filtered.map(knot => <KnotCard key={knot.id} knot={knot} />)
        )}
      </div>

      {/* Quick reference */}
      <div className="mt-10 p-6 bg-gradient-to-r from-primary-light/10 to-secondary/10 rounded-xl border border-border">
        <h2 className="text-xl font-bold text-text mb-4">Quick Reference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-text mb-2">🪝 Attaching a Hook?</h3>
            <p className="text-text-secondary">
              <strong>Monofilament/Fluoro:</strong> Improved Clinch or Trilene Knot<br />
              <strong>Braided line:</strong> Palomar Knot<br />
              <strong>Lures (free swing):</strong> Rapala Knot
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">🔗 Joining Two Lines?</h3>
            <p className="text-text-secondary">
              <strong>Same diameter:</strong> Blood Knot<br />
              <strong>Different diameters:</strong> Surgeon's Knot<br />
              <strong>Braid to leader:</strong> FG Knot or Albright Special
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">⭕ Need a Loop?</h3>
            <p className="text-text-secondary">
              <strong>Quick & easy:</strong> Surgeon's End Loop<br />
              <strong>Maximum strength:</strong> Bimini Twist<br />
              <strong>For lures:</strong> Rapala Knot (Non-Slip Loop)
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-2">🎣 Sea Fishing?</h3>
            <p className="text-text-secondary">
              <strong>Paternoster rigs:</strong> Dropper Loop<br />
              <strong>Hook to snood:</strong> Improved Clinch or Snell Knot<br />
              <strong>Line to backing:</strong> Nail Knot or Arbor Knot
            </p>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link to="/" className="text-primary hover:text-primary-hover text-sm font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
