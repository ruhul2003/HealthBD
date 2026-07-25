'use client';

import React, { useState, useEffect } from 'react';
import HospitalCard from '../../components/HospitalCard';
import { fetchHospitals } from '../../lib/api';
import { Search, Building2, MapPin, Loader2 } from 'lucide-react';

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('All');

  const loadHospitals = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (city !== 'All') params.city = city;

    const res = await fetchHospitals(params);
    setHospitals(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadHospitals();
  }, [city]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadHospitals();
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Top Accredited Hospitals in Bangladesh
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Compare medical centers, emergency hotline numbers, ICU bed numbers, and department facilities.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Hospital name, department or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
            />
          </form>

          <div className="flex items-center space-x-3 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 shrink-0">City:</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-xs border border-slate-200 dark:border-slate-700 outline-none cursor-pointer w-full md:w-48"
            >
              <option value="All">All Cities</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
            </select>
          </div>

        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Fetching hospital directory...</p>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No hospitals found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search terms or city filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.map((hosp) => (
              <HospitalCard key={hosp._id} hospital={hosp} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
