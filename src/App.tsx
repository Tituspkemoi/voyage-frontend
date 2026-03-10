import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlaneTakeoff, History } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({ destination: '', email: '', passengers: 1 });
  const [bookings, setBookings] = useState<any[]>([]);

  // THE KEY: Full path to your Render backend
  const API_URL = "https://voyage-backend-xv95.onrender.com/api/bookings";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/all`);
      if (Array.isArray(res.data)) setBookings(res.data);
    } catch (err) {
      console.error("Database connection failed", err);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/create`, formData);
      alert("🌴 Voyage Booked!");
      fetchBookings();
    } catch (err) {
      alert("❌ Connection Error - Backend might be sleeping");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 mb-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
            <PlaneTakeoff size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Voyage Agency</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Where to?" required
            className="w-full p-3 border rounded-xl outline-blue-500"
            onChange={e => setFormData({...formData, destination: e.target.value})} 
          />
          <input 
            type="email" placeholder="Email Address" required
            className="w-full p-3 border rounded-xl outline-blue-500"
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">
            Confirm My Voyage
          </button>
        </form>
      </div>

      <div className="w-full max-w-md">
        <h2 className="flex items-center gap-2 font-bold text-gray-600 mb-4"><History size={18} /> RECENT BOOKINGS</h2>
        <div className="space-y-3">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-400 italic">No voyages yet...</p>
          ) : (
            [...bookings].reverse().map((trip: any) => (
              <div key={trip._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-800">{trip.destination}</h3>
                  <p className="text-xs text-gray-500">{trip.email}</p>
                </div>
                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">1 Pax</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}