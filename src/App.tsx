import { useState, useEffect } from 'react';
import axios from 'axios';
import { PlaneTakeoff, History } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({ destination: '', email: '', passengers: 1 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState(false);

  // MAKE SURE THIS URL IS CORRECT
  const API_BASE = "https://voyage-backend-xv95.onrender.com/api/bookings";

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setBookings(Array.isArray(res.data) ? res.data : []);
      setError(false);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/create`, formData);
      alert("🌴 Voyage Booked!");
      fetchBookings();
    } catch (err) {
      alert("❌ Connection Error");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border mb-10">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-3 rounded-2xl mb-4">
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
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">
            Confirm My Voyage
          </button>
        </form>
      </div>

      <div className="w-full max-w-md">
        <h2 className="flex items-center gap-2 font-bold text-gray-600 mb-4"><History size={18} /> RECENT</h2>
        <div className="space-y-3">
          {error ? (
            <p className="text-red-500 text-center">Database connection failed.</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-400 text-center">No bookings yet.</p>
          ) : (
            [...bookings].reverse().map((trip: any) => (
              <div key={trip._id} className="bg-white p-4 rounded-xl shadow-sm border flex justify-between">
                <div>
                  <h3 className="font-bold">{trip.destination}</h3>
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