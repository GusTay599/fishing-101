// Stats Page
import { useState, useMemo } from 'react';
import { useCatchStats, useCatches } from '../hooks/useApi';
import { format, parseISO, subMonths, startOfMonth, endOfMonth } from 'date-fns';

export function StatsPage() {
  const [dateRange, setDateRange] = useState<'all' | 'year' | '6months' | '3months'>('all');
  
  const { data: stats, loading: statsLoading, error: statsError } = useCatchStats();
  const catchesParams = useMemo(() => ({
    page: 1,
    page_size: 1000,
    start_date: dateRange !== 'all' ? format(subMonths(new Date(), dateRange === 'year' ? 12 : dateRange === '6months' ? 6 : 3), 'yyyy-MM-dd') : undefined,
  }), [dateRange]);

  const { data: catchesData, loading: catchesLoading } = useCatches(catchesParams);

  const catches = catchesData?.data || [];

  // Calculate stats from catches
  const totalCatches = catches.length;
  const speciesMap = new Map<string, { count: number; totalWeight: number }>();
  const baitMap = new Map<string, number>();
  const techniqueMap = new Map<string, number>();
  const monthlyMap = new Map<string, number>();
  const hourMap = new Map<number, number>();
  const waterTypeMap = new Map<string, number>();
  const tideMap = new Map<string, number>();

  catches.forEach(c => {
    // Species
    const sp = speciesMap.get(c.species) || { count: 0, totalWeight: 0 };
    sp.count++;
    if (c.weight_lbs || c.weight_oz) {
      sp.totalWeight += (c.weight_lbs || 0) + (c.weight_oz || 0) / 16;
    }
    speciesMap.set(c.species, sp);

    // Bait
    if (c.bait) {
      baitMap.set(c.bait, (baitMap.get(c.bait) || 0) + 1);
    }

    // Technique
    if (c.technique) {
      techniqueMap.set(c.technique, (techniqueMap.get(c.technique) || 0) + 1);
    }

    // Monthly
    const month = format(parseISO(c.caught_at), 'yyyy-MM');
    monthlyMap.set(month, (monthlyMap.get(month) || 0) + 1);

    // Hour
    const hour = parseISO(c.caught_at).getHours();
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);

    // Water type
    waterTypeMap.set(c.water_type, (waterTypeMap.get(c.water_type) || 0) + 1);

    // Tide
    if (c.tide_stage) {
      tideMap.set(c.tide_stage, (tideMap.get(c.tide_stage) || 0) + 1);
    }
  });

  const topSpecies = Array.from(speciesMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

  const topBaits = Array.from(baitMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const topTechniques = Array.from(techniqueMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const monthlyData = Array.from(monthlyMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => ({ month: format(parseISO(month + '-01'), 'MMM yyyy'), count }));

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: hourMap.get(i) || 0,
  }));

  const waterTypeData = Array.from(waterTypeMap.entries())
    .map(([type, count]) => ({ type, count }));

  const tideData = Array.from(tideMap.entries())
    .map(([stage, count]) => ({ stage, count }));

  // Personal bests
  const personalBests = new Map<string, { catch: typeof catches[0]; weight: number }>();
  catches.forEach(c => {
    if (c.weight_lbs || c.weight_oz) {
      const weight = (c.weight_lbs || 0) + (c.weight_oz || 0) / 16;
      const existing = personalBests.get(c.species);
      if (!existing || weight > existing.weight) {
        personalBests.set(c.species, { catch: c, weight });
      }
    }
  });

  if (statsLoading || catchesLoading) {
    return (
      <div className="page">
        <div className="card">
          <div className="card-body text-center py-12">
            <div className="spinner mx-auto mb-4" />
            <p className="text-text-secondary">Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Statistics</h1>
            <p className="page-subtitle">Analyze your fishing patterns and personal bests</p>
          </div>
          <div className="flex gap-2">
            {(['all', 'year', '6months', '3months'] as const).map(range => (
              <button
                key={range}
                className={`btn btn-sm ${dateRange === range ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDateRange(range)}
              >
                {range === 'all' ? 'All Time' : range === 'year' ? '1 Year' : range === '6months' ? '6 Months' : '3 Months'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-text">{totalCatches}</div>
            <div className="text-text-secondary text-sm">Total Catches</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-text">{speciesMap.size}</div>
            <div className="text-text-secondary text-sm">Species Caught</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-text">
              {catches.filter(c => c.weight_lbs || c.weight_oz).length}
            </div>
            <div className="text-text-secondary text-sm">Weighed Catches</div>
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <div className="text-3xl font-bold text-text">
              {catches.filter(c => c.length_inches).length}
            </div>
            <div className="text-text-secondary text-sm">Measured Catches</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Catches by Month */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Catches by Month</h3>
          </div>
          <div className="card-body h-64">
            <div className="h-full flex items-end gap-1">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center min-w-0">
                  <div
                    className="bg-primary rounded-t w-full max-h-full transition-all hover:bg-primary-hover"
                    style={{ height: `${Math.max((d.count / Math.max(...monthlyData.map(m => m.count), 1)) * 100, 4)}%` }}
                    title={`${d.month}: ${d.count} catches`}
                  />
                  <span className="text-xs text-text-secondary mt-1 transform -rotate-45 origin-bottom-left whitespace-nowrap">
                    {d.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Catches by Hour */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Catches by Hour</h3>
          </div>
          <div className="card-body h-64">
            <div className="h-full flex items-end gap-1">
              {hourlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center min-w-0">
                  <div
                    className="bg-secondary rounded-t w-full max-h-full transition-all hover:bg-secondary-hover"
                    style={{ height: `${Math.max((d.count / Math.max(...hourlyData.map(h => h.count), 1)) * 100, 4)}%` }}
                    title={`${d.hour}:00 - ${d.count} catches`}
                  />
                  <span className="text-xs text-text-secondary mt-1">{d.hour === 0 ? '12am' : d.hour < 12 ? `${d.hour}am` : d.hour === 12 ? '12pm' : `${d.hour - 12}pm`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Species */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Top Species</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {topSpecies.map(([species, data], i) => (
                <div key={species} className="flex items-center gap-3">
                  <span className="w-8 text-center text-text-secondary font-medium">{i + 1}.</span>
                  <span className="flex-1 font-medium text-text">{species}</span>
                  <span className="badge badge-primary">{data.count} catches</span>
                  <span className="text-text-secondary text-sm w-24 text-right">
                    {data.count > 0 ? (data.totalWeight / data.count).toFixed(1) + ' lbs avg' : '—'}
                  </span>
                </div>
              ))}
              {topSpecies.length === 0 && (
                <p className="text-text-secondary text-center py-4">No catches yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Baits */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Most Effective Baits</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {topBaits.map(([bait, count], i) => (
                <div key={bait} className="flex items-center gap-3">
                  <span className="w-8 text-center text-text-secondary font-medium">{i + 1}.</span>
                  <span className="flex-1 font-medium text-text">{bait}</span>
                  <span className="badge badge-secondary">{count} catches</span>
                </div>
              ))}
              {topBaits.length === 0 && (
                <p className="text-text-secondary text-center py-4">No bait data recorded</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Techniques */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Top Techniques</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {topTechniques.map(([technique, count], i) => (
                <div key={technique} className="flex items-center gap-3">
                  <span className="w-8 text-center text-text-secondary font-medium">{i + 1}.</span>
                  <span className="flex-1 font-medium text-text">{technique}</span>
                  <span className="badge badge-neutral">{count} catches</span>
                </div>
              ))}
              {topTechniques.length === 0 && (
                <p className="text-text-secondary text-center py-4">No technique data recorded</p>
              )}
            </div>
          </div>
        </div>

        {/* Water Type Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Water Type</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-3 gap-4">
              {waterTypeData.map(({ type, count }) => (
                <div key={type} className="text-center p-4 bg-bg rounded-lg">
                  <div className="text-2xl font-bold text-text">{count}</div>
                  <div className="text-text-secondary text-sm capitalize">{type}</div>
                </div>
              ))}
              {waterTypeData.length < 3 && (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* Tide Stage Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-text">Tide Stage</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {tideData.map(({ stage, count }) => (
                <div key={stage} className="flex items-center gap-3">
                  <span className={`badge ${stage === 'high' || stage === 'low' ? 'badge-primary' : 'badge-secondary'} capitalize w-24`}>{stage}</span>
                  <div className="flex-1 bg-bg rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(count / Math.max(...tideData.map(t => t.count), 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-text-secondary w-16 text-right">{count}</span>
                </div>
              ))}
              {tideData.length === 0 && (
                <p className="text-text-secondary text-center py-4">No tide data recorded</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Bests */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-text">Personal Bests</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Species</th>
                  <th>Weight</th>
                  <th>Length</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Bait/Lure</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(personalBests.entries()).sort((a, b) => b[1].weight - a[1].weight).map(([species, data]) => (
                  <tr key={species}>
                    <td className="font-medium text-text">{species}</td>
                    <td>
                      {data.catch.weight_lbs || data.catch.weight_oz ? (
                        <>
                          {data.catch.weight_lbs ? `${data.catch.weight_lbs} lb` : ''}
                          {data.catch.weight_lbs && data.catch.weight_oz ? ' ' : ''}
                          {data.catch.weight_oz ? `${data.catch.weight_oz} oz` : ''}
                        </>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                    <td>{data.catch.length_inches ? `${data.catch.length_inches}"` : <span className="text-text-muted">—</span>}</td>
                    <td>{format(parseISO(data.catch.caught_at), 'MMM d, yyyy')}</td>
                    <td className="max-w-xs truncate">{data.catch.location_name || '—'}</td>
                    <td className="max-w-xs truncate">{data.catch.lure || data.catch.bait || '—'}</td>
                  </tr>
                ))}
                {personalBests.size === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-text-secondary">
                      No weighed catches recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}