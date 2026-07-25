'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, MapPin, Stethoscope, ShieldCheck, Award, HeartHandshake, PhoneCall } from 'lucide-react';

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [city, setCity] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (specialty !== 'All') params.append('specialty', specialty);
    if (city !== 'All') params.append('city', city);
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-sky-50/70 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-sky-400/20 via-cyan-300/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/60 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Trusted Healthcare & Doctor Directory Platform in Bangladesh</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Find Top <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">Doctors & Hospitals</span> Near You
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Book appointments with Bangladesh's most qualified specialists, compare hospital facilities, and get transparent treatment cost estimates in seconds.
          </motion.p>

          {/* Interactive Search Box */}
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3"
          >
            {/* Search Input */}
            <div className="sm:col-span-5 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                placeholder="Doctor name, disease, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Specialty Select */}
            <div className="sm:col-span-3 relative flex items-center">
              <Stethoscope className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full pl-11 pr-8 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-slate-700 appearance-none cursor-pointer"
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Gastroenterology">Gastroenterology</option>
                <option value="Oncology">Oncology</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>

            {/* City Select */}
            <div className="sm:col-span-2 relative flex items-center">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-9 pr-6 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-slate-700 appearance-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full h-full min-h-[48px] bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </motion.form>

          {/* Quick Stats Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left"
          >
            <div className="flex items-center space-x-3 bg-white dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 bg-sky-100 dark:bg-sky-950/80 rounded-xl text-sky-600 dark:text-sky-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">1,200+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Verified Doctors</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 bg-teal-100 dark:bg-teal-950/80 rounded-xl text-teal-600 dark:text-teal-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">50+</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Top Hospitals</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 bg-amber-100 dark:bg-amber-950/80 rounded-xl text-amber-600 dark:text-amber-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">100% Free</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Instant Booking</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-white dark:bg-slate-900/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="p-2.5 bg-rose-100 dark:bg-rose-950/80 rounded-xl text-rose-600 dark:text-rose-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">24/7 Support</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Emergency Line</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
