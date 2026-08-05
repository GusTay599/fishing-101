// Fish Species Guide Page
import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FISH_SPECIES_DATA, 
  searchFish, 
  filterFishByWaterType, 
  filterFishByCategory,
  filterFishByDifficulty,
  getFishByMonth,
  IDENTIFIER_TRAITS,
  type FishSpecies 
} from '../shared/fish-data';
import { getBaitsForFish, getBaitById } from '../shared/bait-data';
import { getTechniquesForFish, type Technique } from '../shared/techniques-data';

export function FishGuidePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWaterType, setSelectedWaterType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedFish, setSelectedFish] = useState<FishSpecies | null>(null);
  const [showIdentifier, setShowIdentifier] = useState(false);
  const [identifierStep, setIdentifierStep] = useState(0);
  const [identifierAnswers, setIdentifierAnswers] = useState<Record<string, string>>({});
  const [identifierResults, setIdentifierResults] = useState<FishSpecies[]>([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter fish based on all criteria
  const filteredFish = useMemo(() => {
    let results = FISH_SPECIES_DATA;

    if (searchQuery) {
      results = searchFish(searchQuery);
    }

    if (selectedWaterType !== 'all') {
      results = results.filter(f => f.water_type === selectedWaterType || f.water_type === 'all');
    }

    if (selectedCategory !== 'all') {
      results = results.filter(f => f.category === selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      results = results.filter(f => f.difficulty === selectedDifficulty);
    }

    return results;
  }, [searchQuery, selectedWaterType, selectedCategory, selectedDifficulty]);

  // Focus search input when popup opens
  useEffect(() => {
    if (showSearchPopup && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchPopup]);

  // Run identifier when answers change
  useEffect(() => {
    if (Object.keys(identifierAnswers).length > 0) {
      runIdentifier();
    }
  }, [identifierAnswers]);

  const runIdentifier = () => {
    let results = [...FISH_SPECIES_DATA];

    // Filter by water type
    if (identifierAnswers.water_type) {
      results = results.filter(f => 
        f.water_type === identifierAnswers.water_type || f.water_type === 'all'
      );
    }

    // Filter by body shape
    if (identifierAnswers.body_shape) {
      results = results.filter(f => {
        const desc = f.description.toLowerCase();
        const id = f.identification.join(' ').toLowerCase();
        switch (identifierAnswers.body_shape) {
          case 'torpedo':
            return desc.includes('torpedo') || desc.includes('streamlined') || 
                   desc.includes('elongated') || id.includes('torpedo');
          case 'deep':
            return desc.includes('deep') || desc.includes('compressed') || 
                   id.includes('deep');
          case 'flat':
            return desc.includes('flat') || f.category === 'sea' && 
                   (f.name.includes('Plaice') || f.name.includes('Dab') || f.name.includes('Flounder'));
          case 'snake':
            return desc.includes('snake') || desc.includes('eel') || 
                   f.name.includes('Eel') || f.name.includes('Conger');
          case 'slender':
            return desc.includes('slender') || desc.includes('small');
          default:
            return true;
        }
      });
    }

    // Filter by colour
    if (identifierAnswers.colour) {
      results = results.filter(f => {
        const id = f.identification.join(' ').toLowerCase();
        switch (identifierAnswers.colour) {
          case 'silver':
            return id.includes('silver');
          case 'brown':
            return id.includes('brown') || id.includes('olive');
          case 'golden':
            return id.includes('golden') || id.includes('bronze');
          case 'dark':
            return id.includes('dark') || id.includes('black') || id.includes('grey');
          case 'patterned':
            return id.includes('spot') || id.includes('stripe') || id.includes('bar');
          default:
            return true;
        }
      });
    }

    // Filter by size
    if (identifierAnswers.size) {
      results = results.filter(f => {
        const size = f.typical_size.toLowerCase();
        switch (identifierAnswers.size) {
          case 'tiny':
            return size.includes('oz') && !size.includes('lb');
          case 'small':
            return (size.includes('0.5') || size.includes('1') || size.includes('2')) && 
                   (size.includes('lbs') || size.includes('lb'));
          case 'medium':
            return size.includes('lb') && (size.includes('2') || size.includes('3') || size.includes('4') || size.includes('5') || size.includes('6') || size.includes('8'));
          case 'large':
            return size.includes('10') || size.includes('15') || size.includes('20') || 
                   size.includes('30') || size.includes('50');
          default:
            return true;
        }
      });
    }

    // Filter by barbels
    if (identifierAnswers.barbels === 'yes') {
      results = results.filter(f => 
        f.identification.join(' ').toLowerCase().includes('barbel') ||
        f.bait.join(' ').toLowerCase().includes('barbel') ||
        f.name.toLowerCase().includes('barbel')
      );
    } else if (identifierAnswers.barbels === 'no') {
      results = results.filter(f => 
        !f.identification.join(' ').toLowerCase().includes('barbel') &&
        !f.name.toLowerCase().includes('barbel')
      );
    }

    setIdentifierResults(results);
  };

  const handleIdentifierAnswer = (question: string, answer: string) => {
    setIdentifierAnswers(prev => ({ ...prev, [question]: answer }));
    if (identifierStep < IDENTIFIER_TRAITS.length) {
      setIdentifierStep(prev => prev + 1);
    }
  };

  const resetIdentifier = () => {
    setIdentifierStep(0);
    setIdentifierAnswers({});
    setIdentifierResults([]);
  };

  const getWaterTypeLabel = (type: string) => {
    switch (type) {
      case 'freshwater': return 'Freshwater';
      case 'saltwater': return 'Saltwater';
      case 'brackish': return 'Brackish';
      default: return type;
    }
  };

  const getWaterTypeColor = (type: string) => {
    switch (type) {
      case 'freshwater': return 'badge-primary';
      case 'saltwater': return 'badge-secondary';
      case 'brackish': return 'badge-warning';
      default: return '';
    }
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'beginner': return 'badge-success';
      case 'intermediate': return 'badge-warning';
      case 'advanced': return 'badge-danger';
      default: return '';
    }
  };

  const getMonthName = (month: number) => {
    return new Date(2024, month - 1).toLocaleString('en-GB', { month: 'short' });
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Fish Species Guide</h1>
            <p className="page-subtitle">UK fish identification, bait, and fishing tips</p>
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => setShowSearchPopup(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              Search Fish
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowIdentifier(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              Identify Fish
            </button>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      {showSearchPopup && (
        <div className="modal-overlay" onClick={() => setShowSearchPopup(false)}>
          <div className="modal" style={{ maxWidth: '600px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Search Fish Species</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowSearchPopup(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
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
                    type="text"
                    className="input"
                    style={{ paddingLeft: '2.5rem' }}
                    placeholder="Search by name, bait, habitat..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Quick Results in Popup */}
              <div className="mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {searchQuery.length > 0 ? (
                  searchFish(searchQuery).length > 0 ? (
                    <div className="space-y-2">
                      {searchFish(searchQuery).map(fish => (
                        <button
                          key={fish.id}
                          className="w-full text-left p-3 rounded-lg hover:bg-bg-hover border border-border"
                          onClick={() => {
                            setSelectedFish(fish);
                            setShowSearchPopup(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
                              style={{ backgroundColor: 'var(--color-primary-light)' }}
                            >
                              {fish.image_urls[0] ? (
                                <img
                                  src={fish.image_urls[0]}
                                  alt={fish.name}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-text-muted text-lg">🐟</div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-text">{fish.name}</div>
                              <div className="text-sm text-text-secondary italic">{fish.scientific_name}</div>
                              <div className="flex gap-2 mt-1">
                                <span className={`badge ${getWaterTypeColor(fish.water_type)}`}>
                                  {getWaterTypeLabel(fish.water_type)}
                                </span>
                                <span className={`badge ${getDifficultyColor(fish.difficulty)}`}>
                                  {fish.difficulty}
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8 text-text-secondary">
                      <p>No fish found matching "{searchQuery}"</p>
                      <p className="text-sm mt-2">Try searching by name, bait type, or habitat</p>
                    </div>
                  )
                ) : (
                  <div className="text-center p-8 text-text-secondary">
                    <p>Type to search for fish species</p>
                    <p className="text-sm mt-2">Search by name, bait, habitat, or any keyword</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fish Identifier Modal */}
      {showIdentifier && (
        <div className="modal-overlay" onClick={() => setShowIdentifier(false)}>
          <div className="modal" style={{ maxWidth: '600px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Fish Identifier</h2>
              <button className="btn btn-ghost btn-sm" onClick={() => { setShowIdentifier(false); resetIdentifier(); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-text-secondary mb-2">
                  <span>Question {identifierStep + 1} of {IDENTIFIER_TRAITS.length}</span>
                  <span>{Math.round(((identifierStep + 1) / IDENTIFIER_TRAITS.length) * 100)}%</span>
                </div>
                <div className="w-full bg-bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((identifierStep + 1) / IDENTIFIER_TRAITS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Questions */}
              {identifierStep < IDENTIFIER_TRAITS.length ? (
                <div>
                  <h3 className="text-lg font-semibold text-text mb-4">
                    {IDENTIFIER_TRAITS[identifierStep].question}
                  </h3>
                  <div className="space-y-2">
                    {IDENTIFIER_TRAITS[identifierStep].options.map(option => (
                      <button
                        key={option.value}
                        className={`w-full text-left p-3 rounded-lg border transition-colors ${
                          identifierAnswers[IDENTIFIER_TRAITS[identifierStep].question] === option.value
                            ? 'border-primary bg-primary-light text-primary'
                            : 'border-border hover:bg-bg-hover text-text'
                        }`}
                        onClick={() => handleIdentifierAnswer(IDENTIFIER_TRAITS[identifierStep].question, option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  {identifierStep > 0 && (
                    <button 
                      className="btn btn-ghost mt-4"
                      onClick={() => setIdentifierStep(prev => prev - 1)}
                    >
                      ← Previous
                    </button>
                  )}
                </div>
              ) : (
                /* Results */
                <div>
                  <h3 className="text-lg font-semibold text-text mb-4">
                    {identifierResults.length > 0 ? 
                      `Found ${identifierResults.length} matching species` : 
                      'No exact matches found'
                    }
                  </h3>
                  <div className="space-y-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {identifierResults.map(fish => (
                      <button
                        key={fish.id}
                        className="w-full text-left p-3 rounded-lg hover:bg-bg-hover border border-border"
                        onClick={() => {
                          setSelectedFish(fish);
                          setShowIdentifier(false);
                          resetIdentifier();
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded-lg flex-shrink-0 overflow-hidden"
                            style={{ backgroundColor: 'var(--color-primary-light)' }}
                          >
                            {fish.image_urls[0] ? (
                              <img
                                src={fish.image_urls[0]}
                                alt={fish.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-text-muted text-lg">🐟</div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-text">{fish.name}</div>
                            <div className="text-sm text-text-secondary">{fish.description.substring(0, 80)}...</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="btn btn-secondary" onClick={resetIdentifier}>
                      Start Over
                    </button>
                    <button className="btn btn-ghost" onClick={() => setShowIdentifier(false)}>
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-wrap gap-4">
            <div className="form-group flex-1 min-w-[200px]">
              <label className="label">Water Type</label>
              <select 
                className="input select"
                value={selectedWaterType}
                onChange={(e) => setSelectedWaterType(e.target.value)}
              >
                <option value="all">All Water Types</option>
                <option value="freshwater">Freshwater</option>
                <option value="saltwater">Saltwater</option>
                <option value="brackish">Brackish</option>
              </select>
            </div>
            
            <div className="form-group flex-1 min-w-[200px]">
              <label className="label">Category</label>
              <select 
                className="input select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="coarse">Coarse</option>
                <option value="game">Game</option>
                <option value="sea">Sea</option>
                <option value="predator">Predator</option>
              </select>
            </div>

            <div className="form-group flex-1 min-w-[200px]">
              <label className="label">Difficulty</label>
              <select 
                className="input select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="form-group">
              <label className="label">&nbsp;</label>
              <button 
                className="btn btn-ghost"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedWaterType('all');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-text-secondary">
        Showing {filteredFish.length} of {FISH_SPECIES_DATA.length} species
      </div>

      {/* Fish Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFish.map(fish => (
          <div 
            key={fish.id} 
            className="card cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedFish(fish)}
          >
            <div 
              className="h-56 overflow-hidden"
              style={{
                borderTopLeftRadius: 'var(--radius-lg)',
                borderTopRightRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--color-primary-light)',
              }}
            >
              {fish.image_urls[0] ? (
                <img
                  src={fish.image_urls[0]}
                  alt={fish.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted text-4xl">🐟</div>
              )}
            </div>
            <div className="card-body">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-text">{fish.name}</h3>
                  <p className="text-sm text-text-secondary italic">{fish.scientific_name}</p>
                </div>
                <span className={`badge ${getDifficultyColor(fish.difficulty)}`}>
                  {fish.difficulty}
                </span>
              </div>
              
              <p className="text-text-secondary text-sm mb-3 line-clamp-2">{fish.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`badge ${getWaterTypeColor(fish.water_type)}`}>
                  {getWaterTypeLabel(fish.water_type)}
                </span>
                <span className="badge badge-outline">{fish.typical_size}</span>
              </div>

              <div className="text-sm">
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Best: {fish.best_months.map(m => getMonthName(m)).join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFish.length === 0 && (
        <div className="card">
          <div className="card-body text-center p-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-secondary" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <h3 className="text-lg font-semibold text-text mb-2">No Fish Found</h3>
            <p className="text-text-secondary">Try adjusting your filters or search terms</p>
          </div>
        </div>
      )}

      {/* Fish Detail Modal */}
      {selectedFish && (
        <div className="modal-overlay" onClick={() => setSelectedFish(null)}>
          <div 
            className="modal" 
            style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', overflowY: 'auto' }} 
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2 className="modal-title">{selectedFish.name}</h2>
                <p className="text-sm text-text-secondary italic">{selectedFish.scientific_name}</p>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedFish(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {/* Image Gallery */}
              {selectedFish.image_urls.length > 0 && (
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedFish.image_urls.map((url, i) => (
                      <div 
                        key={i}
                        className="h-64 rounded-lg overflow-hidden"
                        style={{ backgroundColor: 'var(--color-primary-light)' }}
                      >
                        <img
                          src={url}
                          alt={`${selectedFish.name} ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`badge ${getWaterTypeColor(selectedFish.water_type)}`}>
                  {getWaterTypeLabel(selectedFish.water_type)}
                </span>
                <span className="badge badge-outline">{selectedFish.category}</span>
                <span className={`badge ${getDifficultyColor(selectedFish.difficulty)}`}>
                  {selectedFish.difficulty}
                </span>
                <span className="badge badge-outline">{selectedFish.typical_size}</span>
              </div>

              {/* Identification — shown prominently for quick reference */}
              <div className="mb-6 bg-primary-light rounded-lg p-4 border border-primary/20">
                <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wide flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  How to Identify
                </h3>
                <ul className="space-y-2">
                  {selectedFish.identification.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-text">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5 text-primary" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">About</h3>
                <p className="text-text">{selectedFish.description}</p>
              </div>

              {/* Best Bait */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">Best Bait</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedFish.bait.map((b, i) => (
                    <span key={i} className="badge badge-primary">{b}</span>
                  ))}
                </div>
              </div>

              {/* Techniques & Methods */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-3 uppercase tracking-wide">Techniques & Methods</h3>
                <div className="space-y-2">
                  {getTechniquesForFish(selectedFish.id).map(technique => {
                    // Get baits that work for both this technique and this fish
                    const matchingBaits = technique.recommended_baits.filter(baitId => {
                      const bait = getBaitById(baitId);
                      return bait && bait.best_for.includes(selectedFish.id);
                    });
                    
                    return (
                      <details key={technique.id} className="border border-border rounded-lg">
                        <summary className="cursor-pointer p-4 flex items-start gap-3 hover:bg-bg-hover transition-colors list-none">
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            className="flex-shrink-0 mt-1 text-text-muted transition-transform"
                            aria-hidden="true"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-text">{technique.name}</h4>
                              <span className={`badge text-xs flex-shrink-0 ${
                                technique.difficulty === 'beginner' ? 'badge-success' :
                                technique.difficulty === 'intermediate' ? 'badge-warning' : 'badge-danger'
                              }`}>
                                {technique.difficulty}
                              </span>
                              {matchingBaits.length > 0 && (
                                <span className="text-xs text-text-muted ml-auto">
                                  {matchingBaits.length} bait{matchingBaits.length !== 1 ? 's' : ''}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary line-clamp-1">{technique.description}</p>
                          </div>
                        </summary>
                        
                        {/* Expanded content */}
                        <div className="px-4 pb-4 border-t border-border bg-bg-secondary">
                          <p className="text-sm text-text-secondary mt-3 mb-3">{technique.description}</p>
                          
                          {/* Recommended baits */}
                          {matchingBaits.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-semibold text-text-muted uppercase mb-2">Best baits for this technique:</p>
                              <div className="flex flex-wrap gap-1">
                                {matchingBaits.map(baitId => {
                                  const bait = getBaitById(baitId);
                                  if (!bait) return null;
                                  return (
                                    <Link
                                      key={baitId}
                                      to={`/bait-guide?bait=${baitId}`}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary-light rounded text-xs text-primary hover:bg-primary hover:text-white transition-colors"
                                    >
                                      {bait.type === 'lure' ? '🎯' : '🪱'} {bait.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                          
                          {/* Tips */}
                          <div className="space-y-1">
                            {technique.tips.slice(0, 2).map((tip, i) => (
                              <p key={i} className="text-xs text-text-muted flex items-start gap-1">
                                <span className="text-primary flex-shrink-0">💡</span> {tip}
                              </p>
                            ))}
                          </div>
                        </div>
                      </details>
                    );
                  })}
                  {getTechniquesForFish(selectedFish.id).length === 0 && (
                    <p className="text-sm text-text-muted text-center py-4">
                      No specific techniques in our guide yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Recommended Baits & Lures from Guide */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-text uppercase tracking-wide">Recommended Baits & Lures</h3>
                  <Link to={`/bait-guide?fish=${selectedFish.id}`} className="text-xs text-primary hover:underline">
                    View all in Bait Guide →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {getBaitsForFish(selectedFish.id).slice(0, 6).map(bait => (
                    <Link
                      key={bait.id}
                      to={`/bait-guide?bait=${bait.id}`}
                      className="flex items-center gap-3 p-3 bg-bg rounded-lg hover:bg-bg-hover transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                        {bait.type === 'bait' ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" aria-hidden="true">
                            <path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z" />
                          </svg>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{bait.name}</p>
                        <p className="text-xs text-text-muted capitalize">{bait.category.replace('-', ' ')}</p>
                      </div>
                      <span className={`badge text-xs ml-auto flex-shrink-0 ${bait.type === 'bait' ? 'badge-primary' : 'badge-secondary'}`}>
                        {bait.type === 'bait' ? 'Bait' : 'Lure'}
                      </span>
                    </Link>
                  ))}
                </div>
                {getBaitsForFish(selectedFish.id).length === 0 && (
                  <p className="text-sm text-text-muted text-center py-4">
                    No specific baits in our guide yet. Check the <Link to="/bait-guide" className="text-primary hover:underline">Bait Guide</Link> for all baits.
                  </p>
                )}
              </div>

              {/* Best Times */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">Best Times to Catch</h3>
                <p className="text-text">{selectedFish.best_times}</p>
              </div>

              {/* Best Months */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">Best Season</h3>
                <div className="grid grid-cols-12 gap-1">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <div 
                      key={month}
                      className={`text-center p-2 rounded text-xs font-medium ${
                        selectedFish.best_months.includes(month) 
                          ? 'bg-primary text-white' 
                          : 'bg-bg-secondary text-text-secondary'
                      }`}
                    >
                      {getMonthName(month)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Habitat */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">Habitat</h3>
                <p className="text-text">{selectedFish.habitat}</p>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">Size</h3>
                <p className="text-text">
                  Typical: {selectedFish.typical_size} | Record: {selectedFish.record_size}
                </p>
              </div>

              {/* Fun Facts */}
              <div>
                <h3 className="text-sm font-semibold text-text mb-2 uppercase tracking-wide">Fun Facts</h3>
                <ul className="space-y-2">
                  {selectedFish.fun_facts.map((fact, i) => (
                    <li key={i} className="flex items-start gap-2 text-text">
                      <span className="text-primary">★</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
