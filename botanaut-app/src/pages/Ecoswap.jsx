import Search from '../components/Search';

export default function Ecoswap() {
  return (
    <div style={{ padding: '3rem', fontFamily: 'SpaceMono', color: 'var(--brand-primary)' }}>
      <h1>EcoSwap 🌿</h1>
      <p style={{ maxWidth: '600px' }}>
        Search for everyday products and discover sustainable alternatives powered by open environmental data from LCA Commons.
      </p>
      <Search />
    </div>
  );
}
