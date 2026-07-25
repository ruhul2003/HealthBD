'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import DoctorCard from '../../components/DoctorCard';
import { fetchDoctors } from '../../lib/api';
import { Search, Filter, Stethoscope, MapPin, SlidersHorizontal, Loader2 } from 'lucide-react';

function DoctorsContent() {
  const searchParams = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [specialty, setSpecialty] = useState(searchParams.get('specialty') || 'All');
  const [city, setCity] = useState(searchParams.get('city') || 'All');
  const [gender, setGender] = useState('All');
  const [maxFee, setMaxFee] = useState(3000);
  const [sortBy, setSortBy] = useState('rating');

  const loadDoctors = async () => {
    setLoading(true);
    const params = {};
    if (search) params.search = search;
    if (specialty !== 'All') params.specialty = specialty;
    if (city !== 'All') params.city = city;
    if (gender !== 'All') params.gender = gender;
    if (maxFee < 3000) params.maxFee = maxFee;
    if (sortBy) params.sortBy = sortBy;

    const res = await fetchDoctors(params);
    setDoctors(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadDoctors();
  }, [specialty, city, gender, maxFee, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDoctors();
  };

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Find & Book Doctors in Bangladesh
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Search top medical consultants, check chamber timings, consultation fees, and schedule visits online.
          </p>
        </div>

        {/* Filter Bar & Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 h-fit shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-sky-500" />
                <span>Filter Doctors</span>
              </h3>
              <button
                onClick={() => {
                  setSearch('');
                  setSpecialty('All');
                  setCity('All');
                  setGender('All');
                  setMaxFee(3000);
                  setSortBy('rating');
                }}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Doctor / Disease Keyword</label>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="e.g. Heart specialist..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-sky-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              </form>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Specialty</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 outline-none cursor-pointer"
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Gynecology">Gynecology & Obstetrics</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Oncology">Oncology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="ENT">ENT (Ear, Nose, Throat)</option>
                <option value="Rheumatology">Rheumatology</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">City / District</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 outline-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
            </div>

            {/* Max Fee Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                <span>Max Fee</span>
                <span className="text-sky-600 font-extrabold">৳{maxFee} BDT</span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={maxFee}
                onChange={(e) => setMaxFee(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Sort Results By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs border border-slate-200 dark:border-slate-700 outline-none cursor-pointer"
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee_asc">Consultation Fee: Low to High</option>
                <option value="fee_desc">Consultation Fee: High to Low</option>
              </select>
            </div>

          </div>

          {/* Main Cards List */}
          <div className="lg:col-span-3">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <Loader2 className="w-10 h-10 text-sky-600 animate-spin mb-3" />
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Searching verified doctors...</p>
              </div>
            ) : doctors.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <Stethoscope className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No doctors match your filter criteria</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Try adjusting your specialty or city filter to see available medical consultants.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {doctors.map((doc) => (
                  <DoctorCard key={doc._id} doctor={doc} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-sm font-bold">Loading Doctor Directory...</div>}>
      <DoctorsContent />
    </Suspense>
  );
}
