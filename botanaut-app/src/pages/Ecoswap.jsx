import { useState } from 'react';

export default function Ecoswap() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`https://www.lcacommons.gov/lca-collaboration/ws/public/data?search=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.datasets || []);
  };

  return (
    <div style={{ padding: '3rem', fontFamily: 'SpaceMono', color: 'var(--brand-primary)' }}>
      <h1>EcoSwap 🔄🌱</h1>
      <p>Search for everyday products and discover sustainable alternatives powered by LCA Commons data.</p>

      <div style={{ marginTop: '2rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try 'shampoo' or 'wipes'..."
          style={{ padding: '0.5rem', fontSize: '1rem', width: '60%' }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
          Search
        </button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {results.length > 0 ? (
          results.map((item, i) => (
            <div key={i} style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
              <h3>{item.title}</h3>
              <p>{item.description || "No description available."}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  View Dataset
                </a>
              )}
            </div>
          ))
        ) : (
          <p style={{ marginTop: '2rem' }}>No results yet. Try searching for something!</p>
        )}
      </div>
    </div>
  );
}
