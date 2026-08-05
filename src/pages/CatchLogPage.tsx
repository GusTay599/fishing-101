// Catch Log Page
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCatches, useDeleteCatch } from '../hooks/useApi';
import { format, parseISO } from 'date-fns';

// Parse photos field - may be a JSON string or already an array
function parsePhotos(photos: unknown): string[] {
  if (!photos) return [];
  if (Array.isArray(photos)) return photos;
  if (typeof photos === 'string') {
    try {
      const parsed = JSON.parse(photos);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

export function CatchLogPage() {
  const [filters, setFilters] = useState({
    species: '',
    start_date: '',
    end_date: '',
    page: 1,
    page_size: 20,
  });
  
  const { data, loading, error, refetch } = useCatches(filters);
  const { deleteCatch, loading: deleteLoading } = useDeleteCatch();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this catch record?')) return;
    
    setDeletingId(id);
    const success = await deleteCatch(id);
    setDeletingId(null);
    
    if (success) {
      refetch();
    }
  };

  const speciesList = data?.data.map(c => c.species).filter((s, i, arr) => arr.indexOf(s) === i) || [];

  return (
    <div>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">My Catches</h1>
            <p className="page-subtitle">Track and analyze your fishing history</p>
          </div>
          <Link to="/catches/new" className="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Log Catch
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col md:flex-row gap-4">
            <div className="form-group flex-1">
              <label htmlFor="species-filter" className="label">Species</label>
              <select
                id="species-filter"
                className="input select"
                value={filters.species}
                onChange={(e) => setFilters({ ...filters, species: e.target.value, page: 1 })}
              >
                <option value="">All Species</option>
                {speciesList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="start-date" className="label">From</label>
              <input
                id="start-date"
                type="date"
                className="input"
                value={filters.start_date}
                onChange={(e) => setFilters({ ...filters, start_date: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="end-date" className="label">To</label>
              <input
                id="end-date"
                type="date"
                className="input"
                value={filters.end_date}
                onChange={(e) => setFilters({ ...filters, end_date: e.target.value, page: 1 })}
              />
            </div>
            
            <div className="form-group flex items-end">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setFilters({ species: '', start_date: '', end_date: '', page: 1, page_size: 20 })}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <div className="spinner mx-auto mb-4" />
            <p className="text-text-secondary">Loading catches...</p>
          </div>
        </div>
      ) : error ? (
        <div className="card">
          <div className="card-body text-center py-12">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-danger" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="text-text">{error}</p>
            <button onClick={refetch} className="btn btn-primary mt-4">Retry</button>
          </div>
        </div>
      ) : data?.data.length === 0 ? (
        <div className="card">
          <div className="card-body text-center py-16">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-text-muted" aria-hidden="true">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <h3 className="text-xl font-semibold text-text mb-2">No catches yet</h3>
            <p className="text-text-secondary mb-6">Start building your fishing logbook today.</p>
            <Link to="/catches/new" className="btn btn-primary">Log Your First Catch</Link>
          </div>
        </div>
      ) : (
        <>
          <div className="card overflow-hidden">
            <div className="table-container">
              <table className="table" role="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Species</th>
                    <th scope="col">Photos</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Length</th>
                    <th scope="col">Location</th>
                    <th scope="col">Bait/Lure</th>
                    <th scope="col">Conditions</th>
                    <th scope="col"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {data!.data.map((catch_) => (
                    <tr key={catch_.id}>
                      <td className="whitespace-nowrap">
                        {format(parseISO(catch_.caught_at), 'MMM d, yyyy h:mm a')}
                      </td>
                      <td>
                        <span className="font-medium text-text">{catch_.species}</span>
                        {catch_.water_type && (
                          <span className="badge badge-neutral ml-2 text-xs capitalize">{catch_.water_type}</span>
                        )}
                      </td>
                      <td>
                        {(() => {
                          const photos = parsePhotos(catch_.photos);
                          if (photos.length === 0) return <span className="text-text-muted">&mdash;</span>;
                          return (
                            <div className="flex gap-1">
                              {photos.slice(0, 3).map((photo: string, i: number) => (
                                <img
                                  key={i}
                                  src={photo}
                                  alt={`Catch photo ${i + 1}`}
                                  className="w-8 h-8 object-cover rounded border border-border"
                                />
                              ))}
                              {photos.length > 3 && (
                                <span className="w-8 h-8 flex items-center justify-center text-xs text-text-muted bg-bg rounded border border-border">
                                  +{photos.length - 3}
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </td>
                      <td>
                        {catch_.weight_lbs || catch_.weight_oz ? (
                          <>
                            {catch_.weight_lbs ? `${catch_.weight_lbs} lb` : ''}
                            {catch_.weight_lbs && catch_.weight_oz ? ' ' : ''}
                            {catch_.weight_oz ? `${catch_.weight_oz} oz` : ''}
                          </>
                        ) : (
                          <span className="text-text-muted">&mdash;</span>
                        )}
                      </td>
                      <td>{catch_.length_inches ? `${catch_.length_inches}"` : <span className="text-text-muted">&mdash;</span>}</td>
                      <td className="max-w-xs truncate">{catch_.location_name || `${catch_.latitude.toFixed(4)}, ${catch_.longitude.toFixed(4)}`}</td>
                      <td className="max-w-xs truncate">
                        {catch_.lure || catch_.bait || <span className="text-text-muted">&mdash;</span>}
                      </td>
                      <td className="text-text-secondary text-sm">
                        {catch_.tide_stage && (
                          <span className="badge badge-secondary mr-1 capitalize">{catch_.tide_stage}</span>
                        )}
                        {catch_.moon_phase && (
                          <span className="badge badge-neutral capitalize">{catch_.moon_phase}</span>
                        )}
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/catches/${catch_.id}/edit`}
                            className="btn btn-ghost btn-sm p-1"
                            aria-label={`Edit ${catch_.species} catch`}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(catch_.id)}
                            disabled={deletingId === catch_.id || deleteLoading}
                            className="btn btn-ghost btn-sm p-1 text-danger hover:bg-danger/10"
                            aria-label={`Delete ${catch_.species} catch`}
                          >
                            {deletingId === catch_.id ? (
                              <span className="spinner-sm" />
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {data!.total_pages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-6" aria-label="Pagination">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                disabled={filters.page <= 1}
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              
              <span className="px-4 text-text-secondary">
                Page {filters.page} of {data!.total_pages}
              </span>
              
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                disabled={filters.page >= data!.total_pages}
                aria-label="Next page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}