import React, { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`https://www.lcacommons.gov/api/v1/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
    setLoading(false);
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
            <h3 style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
            <p style={{ fontStyle: 'italic' }}>{item.description || 'No description available.'}</p>
            {/* Optional future "View Details" button goes here */}
          </div>
        ))}

        {!loading && results.length === 0 && query && (
          <p style={{ marginTop: '2rem' }}>No results found for "{query}". Try another product.</p>
        )}
      </div>
    </div>
  );
}
