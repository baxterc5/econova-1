import React, { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.lcacommons.gov/api/v1/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
      setSelectedDetails(null); // reset detailed view when new search starts
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
  };

  const fetchDetails = async (id) => {
    try {
      const res = await fetch(`https://www.lcacommons.gov/api/v1/entity/${id}`);
      const data = await res.json();
      setSelectedDetails(data);
    } catch (error) {
      console.error("Failed to fetch details", error);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <input
        type="text"
        placeholder="Try 'shampoo', 'wipes', or 'detergent'..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          width: '60%',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontFamily: 'SpaceMono',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginLeft: '1rem',
          padding: '0.5rem 1.25rem',
          borderRadius: '8px',
          backgroundColor: 'var(--brand-primary)',
          color: 'white',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'SpaceMono',
          border: 'none',
        }}
      >
        Search
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>Loading...</p>}

      <div style={{ marginTop: '2rem' }}>
        {results.map((item) => (
          <div key={item.id} style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--brand-primary)',
            color: 'white',
          }}>
            <h3>{item.name}</h3>
            <p>{item.description || 'No description available.'}</p>
            <button
              onClick={() => fetchDetails(item.id)}
              style={{
                marginTop: '0.5rem',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                backgroundColor: 'white',
                color: 'var(--brand-primary)',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'SpaceMono',
              }}
            >
              View Impact
            </button>
          </div>
        ))}

        {!loading && results.length === 0 && query && (
          <p style={{ marginTop: '2rem' }}>No results found for "{query}". Try another product.</p>
        )}
      </div>

      {selectedDetails && (
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid #888',
          color: 'white'
        }}>
          <h3>Environmental Impact: {selectedDetails.name}</h3>
          {selectedDetails.impactCategories?.length ? (
            <ul style={{ marginTop: '1rem' }}>
              {selectedDetails.impactCategories.map((cat, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>
                  <strong>{cat.name}:</strong> {cat.value} {cat.unit}
                </li>
              ))}
            </ul>
          ) : (
            <p>No environmental impact data available for this item.</p>
          )}
        </div>
      )}
    </div>
  );
}
