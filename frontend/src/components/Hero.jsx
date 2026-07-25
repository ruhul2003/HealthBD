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
    <section className="relative overflow-hidden py-16 lg:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800/80">
      
      {/* Soft Glow Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-[500px] bg-gradient-to-tr from-sky-400/20 via-teal-300/10 to-transparent dark:from-sky-600/15 dark:via-cyan-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 bg-sky-100/80 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 border border-sky-300/70 dark:border-sky-800/80 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Trusted Healthcare & Doctor Directory Platform in Bangladesh</span>
          </motion.div>

          {/* Minimal Wide Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            Find Top <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-cyan-500 dark:from-sky-400 dark:via-teal-400 dark:to-cyan-300 bg-clip-text text-transparent">Doctors & Hospitals</span> Near You
          </motion.h1>

          {/* Clean Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Book face-to-face appointments with senior consultants, compare hospital facilities, and get transparent treatment cost estimates across Bangladesh.
          </motion.p>

          {/* Ultra Wide Sleek Search Bar */}
          <motion.form
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onSubmit={handleSearch}
            className="bg-white/95 dark:bg-slate-900/90 p-3 sm:p-4 rounded-3xl lg:rounded-full shadow-2xl border border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-3 transition-colors duration-300 max-w-5xl mx-auto"
          >
            {/* Search Keyword Input */}
            <div className="sm:col-span-5 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-400 absolute left-5" />
              <input
                type="text"
                placeholder="Doctor name, specialty, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/90 rounded-2xl lg:rounded-full text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-slate-700/80 transition-colors"
              />
            </div>

            {/* Specialty Select */}
            <div className="sm:col-span-3 relative flex items-center">
              <Stethoscope className="w-5 h-5 text-slate-400 dark:text-slate-400 absolute left-4 pointer-events-none" />
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 bg-slate-50 dark:bg-slate-800/90 rounded-2xl lg:rounded-full text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-slate-700/80 appearance-none cursor-pointer transition-colors"
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
              <MapPin className="w-5 h-5 text-slate-400 dark:text-slate-400 absolute left-4 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-6 py-3.5 bg-slate-50 dark:bg-slate-800/90 rounded-2xl lg:rounded-full text-slate-900 dark:text-slate-100 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 dark:border-slate-700/80 appearance-none cursor-pointer transition-colors"
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
                className="w-full h-full min-h-[50px] bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-sm rounded-2xl lg:rounded-full shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </motion.form>

          {/* Minimal Wide Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-left max-w-5xl mx-auto"
          >
            <div className="flex items-center space-x-3.5 bg-white/90 dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <div className="p-3 bg-sky-100 dark:bg-sky-950/80 rounded-2xl text-sky-600 dark:text-sky-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">1,200+</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Verified Doctors</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white/90 dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <div className="p-3 bg-teal-100 dark:bg-teal-950/80 rounded-2xl text-teal-600 dark:text-teal-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">50+</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Top Hospitals</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white/90 dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <div className="p-3 bg-amber-100 dark:bg-amber-950/80 rounded-2xl text-amber-600 dark:text-amber-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">100% Free</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Instant Booking</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-white/90 dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
              <div className="p-3 bg-rose-100 dark:bg-rose-950/80 rounded-2xl text-rose-600 dark:text-rose-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">24/7 Support</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Emergency Line</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
