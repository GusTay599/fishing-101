// Bait & Lure Guide Page
import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BAIT_DATA,
  searchBaits,
  filterBaitsByType,
  filterBaitsByCategory,
  filterBaitsByWaterType,
  filterBaitsByDifficulty,
  getBaitsForFish,
  BAIT_CATEGORIES,
  type Bait
} from '../shared/bait-data';
import { FISH_SPECIES_DATA, type FishSpecies } from '../shared/fish-data';
import { getTechniquesForBait, getTechniqueById } from '../shared/techniques-data';
import { API_BASE } from '../config/api';

export function BaitGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWaterType, setSelectedWaterType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedBait, setSelectedBait] = useState<Bait | null>(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [filterByFish, setFilterByFish] = useState<string>('all');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter baits based on all criteria
  const filteredBaits = useMemo(() => {
    let results = BAIT_DATA;

    if (searchQuery) {
      results = searchBaits(searchQuery);
    }

    if (selectedType !== 'all') {
      results = results.filter(b => b.type === selectedType);
    }

    if (selectedCategory !== 'all') {
      results = results.filter(b => b.category === selectedCategory);
    }

    if (selectedWaterType !== 'all') {
      results = results.filter(b => b.water_type === selectedWaterType || b.water_type === 'all');
    }

    if (selectedDifficulty !== 'all') {
      results = results.filter(b => b.difficulty === selectedDifficulty);
    }

    if (filterByFish !== 'all') {
      results = results.filter(b => b.best_for.includes(filterByFish));
    }

    return results;
  }, [searchQuery, selectedType, selectedCategory, selectedWaterType, selectedDifficulty, filterByFish]);

  // Focus search input when popup opens
  useEffect(() => {
    if (showSearchPopup && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchPopup]);

  const getFishName = (fishId: string) => {
    const fish = FISH_SPECIES_DATA.find(f => f.id === fishId);
    return fish ? fish.name : fishId;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      'natural': '🪱',
      'artificial': '🎣',
      'dead': '🐟',
      'particle': '🌾',
      'groundbait': '🥣',
      'fly': '🪰',
      'soft-plastic': '🐛',
      'hard-lure': '🐟',
      'spinner': '✨',
      'topwater': '💧',
    };
    return icons[category] || '🪱';
  };

  const getCategoryEmoji = (bait: Bait) => {
    const name = bait.name.toLowerCase();
    if (name.includes('worm')) return '🪱';
    if (name.includes('maggot')) return '🪛';
    if (name.includes('corn')) return '🌽';
    if (name.includes('bread')) return '🍞';
    if (name.includes('boilie')) return '🔴';
    if (name.includes('pellet')) return '🟤';
    if (name.includes('hemp')) return '⬛';
    if (name.includes('mackerel')) return '🐟';
    if (name.includes('squid')) return '🦑';
    if (name.includes('crab')) return '🦀';
    if (name.includes('shrimp') || name.includes('prawn')) return '🦐';
    if (name.includes('mussel')) return '🦪';
    if (name.includes('spinner')) return '✨';
    if (name.includes('spoon')) return '🥄';
    if (name.includes('plug')) return '🐟';
    if (name.includes('fly')) return '🪰';
    if (name.includes('jig')) return '🎣';
    if (name.includes('popper')) return '💧';
    if (name.includes('groundbait') || name.includes('method')) return '🥣';
    if (bait.type === 'lure') return '🎯';
    if (bait.category === 'natural') return '🪱';
    if (bait.category === 'dead') return '🐟';
    return '🎣';
  };

  return (
    <div>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Bait & Lure Guide</h1>
            <p className="page-subtitle">Find the right bait or lure for any UK species</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="form-group flex-1">
              <label htmlFor="bait-search" className="label">Search</label>
              <div className="relative">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
                  id="bait-search"
                  type="text"
                  className="input"
                  style={{ paddingLeft: '2.5rem' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search baits, lures, or techniques..."
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="form-group">
              <label htmlFor="type-filter" className="label">Type</label>
              <select
                id="type-filter"
                className="input"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="bait">Baits</option>
                <option value="lure">Lures</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="form-group">
              <label htmlFor="category-filter" className="label">Category</label>
              <select
                id="category-filter"
                className="input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {BAIT_CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Water Type Filter */}
            <div className="form-group">
              <label htmlFor="water-filter" className="label">Water</label>
              <select
                id="water-filter"
                className="input"
                value={selectedWaterType}
                onChange={(e) => setSelectedWaterType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater</option>
              </select>
            </div>

            {/* Fish Filter */}
            <div className="form-group">
              <label htmlFor="fish-filter" className="label">Good for Fish</label>
              <select
                id="fish-filter"
                className="input"
                value={filterByFish}
                onChange={(e) => setFilterByFish(e.target.value)}
              >
                <option value="all">All Species</option>
                <optgroup label="Freshwater">
                  {FISH_SPECIES_DATA.filter(f => f.water_type === 'freshwater').map(fish => (
                    <option key={fish.id} value={fish.id}>{fish.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Saltwater">
                  {FISH_SPECIES_DATA.filter(f => f.water_type === 'saltwater').map(fish => (
                    <option key={fish.id} value={fish.id}>{fish.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Brackish">
                  {FISH_SPECIES_DATA.filter(f => f.water_type === 'brackish').map(fish => (
                    <option key={fish.id} value={fish.id}>{fish.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* Active filters count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <span className="text-sm text-text-secondary">
              Showing {filteredBaits.length} of {BAIT_DATA.length} baits & lures
            </span>
            {(selectedType !== 'all' || selectedCategory !== 'all' || selectedWaterType !== 'all' || filterByFish !== 'all' || searchQuery) && (
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => {
                  setSelectedType('all');
                  setSelectedCategory('all');
                  setSelectedWaterType('all');
                  setSelectedDifficulty('all');
                  setFilterByFish('all');
                  setSearchQuery('');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Grid */}
      {filteredBaits.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">No Baits Found</h3>
            <p className="text-text-secondary mb-6">Try adjusting your filters or search terms.</p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedCategory('all');
                setSelectedWaterType('all');
                setSelectedDifficulty('all');
                setFilterByFish('all');
                setSearchQuery('');
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBaits.map(bait => (
            <button
              key={bait.id}
              type="button"
              className="card text-left cursor-pointer hover:border-primary transition-colors overflow-hidden"
              onClick={() => setSelectedBait(bait)}
            >
              {bait.image_urls && bait.image_urls.length > 0 ? (
                <div className="h-36 bg-gray-100 overflow-hidden">
                  <img
                    src={`${API_BASE}/proxy-image?url=${encodeURIComponent(bait.image_urls[0])}`}
                    alt={bait.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      // Retry once after 3 seconds with cache bust
                      if (!target.dataset.retried) {
                        target.dataset.retried = 'true';
                        setTimeout(() => {
                          target.src = `${API_BASE}/proxy-image?url=${encodeURIComponent(bait.image_urls[0])}&_t=${Date.now()}`;
                        }, 3000);
                        return;
                      }
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="h-36 bg-gray-100 flex items-center justify-center"><span class="text-5xl">${getCategoryEmoji(bait)}</span></div>`;
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="h-36 bg-gray-100 flex items-center justify-center">
                  <span className="text-5xl">{getCategoryEmoji(bait)}</span>
                </div>
              )}
              <div className="card-body">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryEmoji(bait)}</span>
                    <div>
                      <h3 className="font-semibold text-text">{bait.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`badge ${bait.type === 'bait' ? 'badge-primary' : 'badge-secondary'}`}>
                          {bait.type === 'bait' ? 'Bait' : 'Lure'}
                        </span>
                        <span className="badge badge-outline text-xs">
                          {bait.category.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`badge ${
                    bait.difficulty === 'beginner' ? 'badge-primary' :
                    bait.difficulty === 'intermediate' ? 'badge-secondary' : 'badge-accent'
                  }`}>
                    {bait.difficulty}
                  </span>
                </div>

                <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                  {bait.description}
                </p>

                <div className="mb-3">
                  <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1">Best for:</p>
                  <div className="flex flex-wrap gap-1">
                    {bait.best_for.slice(0, 4).map(fishId => (
                      <span key={fishId} className="badge badge-outline text-xs">
                        {getFishName(fishId)}
                      </span>
                    ))}
                    {bait.best_for.length > 4 && (
                      <span className="badge badge-outline text-xs">
                        +{bait.best_for.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {bait.water_type === 'all' ? 'All waters' : bait.water_type}
                  </span>
                  <span>{bait.best_for.length} species</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Bait Detail Modal */}
      {selectedBait && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelectedBait(null)}>
          <div
            className="bg-bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedBait.image_urls && selectedBait.image_urls.length > 0 ? (
              <div className="h-48 bg-gray-100 overflow-hidden rounded-t-xl">
                <img
                  src={`${API_BASE}/proxy-image?url=${encodeURIComponent(selectedBait.image_urls[0])}`}
                  alt={selectedBait.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.dataset.retried) {
                      target.dataset.retried = 'true';
                      setTimeout(() => {
                        target.src = `${API_BASE}/proxy-image?url=${encodeURIComponent(selectedBait.image_urls[0])}&_t=${Date.now()}`;
                      }, 3000);
                      return;
                    }
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<div class="h-48 bg-gray-100 flex items-center justify-center rounded-t-xl"><span class="text-7xl">${getCategoryEmoji(selectedBait)}</span></div>`;
                    }
                  }}
                />
              </div>
            ) : (
              <div className="h-32 bg-gray-100 flex items-center justify-center rounded-t-xl">
                <span className="text-7xl">{getCategoryEmoji(selectedBait)}</span>
              </div>
            )}
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {getCategoryEmoji(selectedBait)}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-text">{selectedBait.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge ${selectedBait.type === 'bait' ? 'badge-primary' : 'badge-secondary'}`}>
                        {selectedBait.type === 'bait' ? 'Bait' : 'Lure'}
                      </span>
                      <span className="badge badge-outline">
                        {selectedBait.category.replace('-', ' ')}
                      </span>
                      <span className={`badge ${
                        selectedBait.difficulty === 'beginner' ? 'badge-primary' :
                        selectedBait.difficulty === 'intermediate' ? 'badge-secondary' : 'badge-accent'
                      }`}>
                        {selectedBait.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="p-2 hover:bg-bg-hover rounded-lg"
                  onClick={() => setSelectedBait(null)}
                  aria-label="Close"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-6">{selectedBait.description}</p>

              {/* Best For Fish */}
              <div className="mb-6">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Best for Species ({selectedBait.best_for.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedBait.best_for.map(fishId => {
                    const fish = FISH_SPECIES_DATA.find(f => f.id === fishId);
                    return fish ? (
                      <Link
                        key={fishId}
                        to={`/guide?fish=${fishId}`}
                        className="flex items-center gap-2 p-2 bg-bg rounded-lg hover:bg-bg-hover transition-colors"
                        onClick={() => setSelectedBait(null)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary flex-shrink-0" aria-hidden="true">
                          <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
                          <path d="M8 15s1.5 2 4 2 4-2 4-2" />
                          <path d="M9 9h.01" />
                          <path d="M15 9h.01" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-text">{fish.name}</p>
                          <p className="text-xs text-text-muted capitalize">{fish.water_type}</p>
                        </div>
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Technique */}
              <div className="mb-6">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  How to Use
                </h3>
                <p className="text-text-secondary bg-bg rounded-lg p-4">{selectedBait.technique}</p>
              </div>

              {/* Techniques this bait is used in */}
              {getTechniquesForBait(selectedBait.id).length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    Best Techniques for This Bait
                  </h3>
                  <div className="space-y-2">
                    {getTechniquesForBait(selectedBait.id).map(technique => (
                      <div key={technique.id} className="p-3 bg-bg rounded-lg border border-border">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-medium text-text text-sm">{technique.name}</h4>
                          <span className={`badge text-xs flex-shrink-0 ${
                            technique.difficulty === 'beginner' ? 'badge-success' :
                            technique.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'
                          }`}>
                            {technique.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary">{technique.description.substring(0, 120)}...</p>
                        {/* Show which species this technique catches with this bait */}
                        {technique.best_for_species.filter(sId => selectedBait.best_for.includes(sId)).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {technique.best_for_species.filter(sId => selectedBait.best_for.includes(sId)).slice(0, 4).map(sId => {
                              const fish = FISH_SPECIES_DATA.find(f => f.id === sId);
                              return fish ? (
                                <Link
                                  key={sId}
                                  to={`/guide?fish=${sId}`}
                                  className="inline-flex items-center px-2 py-0.5 bg-primary-light rounded text-xs text-primary hover:bg-primary hover:text-white transition-colors"
                                  onClick={() => setSelectedBait(null)}
                                >
                                  🐟 {fish.name}
                                </Link>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="mb-6">
                <h3 className="font-semibold text-text mb-3 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  Pro Tips
                </h3>
                <p className="text-text-secondary bg-bg rounded-lg p-4">{selectedBait.tips}</p>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Pros
                  </h3>
                  <ul className="space-y-1">
                    {selectedBait.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    Cons
                  </h3>
                  <ul className="space-y-1">
                    {selectedBait.cons.map((con, i) => (
                      <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">-</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
