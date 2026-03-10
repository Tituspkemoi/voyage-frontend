import React, { useState } from 'react';
import axios from 'axios';
import { PlaneTakeoff, Mail, MapPin, History } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({ destination: '', email: '', passengers: 1 });
  const [bookings, setBookings] = useState<any[]>([]); // State to hold our trips

  // 1. Function to get bookings from Backend
  // 1. Updated Fetch: Added /api/bookings/all
  const fetchBookings = async () => {
    try {
      const res = await axios.get<any[]>("https://voyage-backend-xv95.onrender.com/api/bookings/all");
      setBookings(res.data);
    } catch (err) {
      console.error("Could not fetch bookings", err);
    }
  };

  // 2. Updated Submit: Added /api/bookings/create
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://voyage-backend-xv95.onrender.com/api/bookings/create", formData);
      alert("🌴 Voyage Booked!");
      fetchBookings(); 
    } catch (err) {
      alert("❌ Connection Error");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center py-12 px-6 font-sans">
      
      {/* THE FORM CARD */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100 mb-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
            <PlaneTakeoff size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-800">Voyage Agency</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Where to?</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-blue-500" size={18} />
              <input type="text" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Zanzibar" onChange={e => setFormData({...formData, destination: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-blue-500" size={18} />
              <input type="email" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="traveler@voyage.com" onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95">Confirm My Voyage</button>
        </form>
      </div>

      {/* THE LIVE FEED */}
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-4 text-gray-700 font-bold uppercase tracking-widest text-sm px-2">
          <History size={18} />
          <h2>Recent Bookings</h2>
        </div>
        
        <div className="space-y-3">
  {bookings.length === 0 ? (
    <p className="text-center text-gray-400 italic">No voyages booked yet...</p>
  ) : (
    [...bookings].reverse().map((trip: any) => ( // Use [...bookings] to avoid mutating state
      <div key={trip._id} className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-800">{trip.destination}</h3>
          <p className="text-xs text-gray-500">{trip.email}</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
          {trip.passengers} Pax
        </div>
      </div>
    ))
  )}
</div>
      </div>

    </div>
  );
}

export default App;