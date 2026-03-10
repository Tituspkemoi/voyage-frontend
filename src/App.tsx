function App() {
  // We must define this inside the function so the "map" below can see it
  const dummyBookings = [
    { _id: '1', destination: 'Zanzibar', email: 'traveler@test.com' },
    { _id: '2', destination: 'Nairobi', email: 'safari@test.com' }
  ];

  return (
    <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif', backgroundColor: '#f0f4f8', minHeight: '100vh' }}>
      <h1 style={{ color: '#2563eb' }}>🚢 Voyage Agency: Emergency Test</h1>
      <p style={{ fontSize: '1.2rem' }}>If you see the list below, your Frontend is FIXED!</p>
      
      <div style={{ marginTop: '30px', maxWidth: '400px', margin: '30px auto', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Recent Trips</h3>
        {dummyBookings.map((b) => (
          <div key={b._id} style={{ padding: '10px', borderBottom: '1px solid #f9f9f9', textAlign: 'left' }}>
            <strong>📍 {b.destination}</strong> <br />
            <span style={{ fontSize: '0.8rem', color: '#666' }}>{b.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;