import React, { useState } from 'react';

export default function EcoSwapSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.lcacommons.gov/api/v1/search?query=${query}`);
      const data = await res.json();
      console.log(data); // helpful for now!
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
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try 'shampoo' or 'wipes'..."
        style={{ padding: '0.5rem', fontSize: '1rem', width: '60%' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Search
      </button>

      {loading && <p style={{ marginTop: '1rem' }}>Loading...</p>}

      <ul style={{ marginTop: '2rem' }}>
        {results.map((item) => (
          <li key={item.id} style={{ marginBottom: '1.5rem' }}>
            <strong>{item.name}</strong><br />
            {item.description || "No description available."}
          </li>
        ))}
      </ul>
    </div>
  );
}
