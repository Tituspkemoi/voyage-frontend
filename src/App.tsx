import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ destination: '', email: '', passengers: 1 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://voyage-backend-xv95.onrender.com/api/bookings/all");
      // Safety check: if the backend sends an object instead of an array
      const data = Array.isArray(res.data) ? res.data : [];
      setBookings(data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Could not connect to the database.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://voyage-backend-xv95.onrender.com/api/bookings/create", formData);
      alert("🌴 Voyage Booked!");
      fetchBookings();
    } catch (err) {
      alert("❌ Submit Error");
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f8fafc', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#1e40af' }}>Voyage Agency</h1>
        <form onSubmit={handleSubmit}>
          <input 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            placeholder="Destination" 
            onChange={e => setFormData({...formData, destination: e.target.value})} 
          />
          <input 
            style={{ width: '100%', marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            placeholder="Email" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <button style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Book Now
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '400px', margin: '20px auto' }}>
        <h3>Recent Bookings</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {bookings.length > 0 ? (
          [...bookings].reverse().map((b: any) => (
            <div key={b._id} style={{ backgroundColor: 'white', padding: '10px', margin: '5px 0', borderRadius: '10px', border: '1px solid #eee' }}>
              <strong>{b.destination}</strong> - {b.email}
            </div>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default App;