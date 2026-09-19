'use client';

import React, { useState, useEffect } from 'react';
import { 
  Microscope, 
  Search, 
  Filter, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  Calendar, 
  Phone, 
  User, 
  X, 
  Sparkles,
  Info,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchDiagnosticTests, fetchDiagnosticCategories, bookDiagnosticTest } from '../../lib/api';

export default function DiagnosticsPage() {
  const [tests, setTests] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [fastingFilter, setFastingFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Booking Modal
  const [selectedTestForBooking, setSelectedTestForBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    phone: '',
    preferredLab: 'Popular Diagnostic Centre',
    sampleCollectionType: 'Walk-in Visit',
    appointmentDate: ''
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [testsRes, catsRes] = await Promise.all([
        fetchDiagnosticTests(),
        fetchDiagnosticCategories()
      ]);
      setTests(testsRes.data || []);
      setCategories(catsRes.data || ['All']);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredTests = tests.filter(test => {
    const matchesSearch = 
      test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || test.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesFasting = fastingFilter === 'All' || (fastingFilter === 'Fasting' ? test.fastingRequired : !test.fastingRequired);

    return matchesSearch && matchesCategory && matchesFasting;
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingSubmitting(true);
    const res = await bookDiagnosticTest({
      testName: selectedTestForBooking.name,
      patientName: bookingForm.patientName,
      phone: bookingForm.phone,
      preferredLab: bookingForm.preferredLab,
      sampleCollectionType: bookingForm.sampleCollectionType,
      appointmentDate: bookingForm.appointmentDate
    });

    if (res.success) {
      setBookingSuccess(res.message);
      setTimeout(() => {
        setBookingSuccess(null);
        setSelectedTestForBooking(null);
        setBookingForm({
          patientName: '',
          phone: '',
          preferredLab: 'Popular Diagnostic Centre',
          sampleCollectionType: 'Walk-in Visit',
          appointmentDate: ''
        });
      }, 2500);
    }
    setBookingSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-teal-700 text-white p-8 md:p-12 shadow-xl">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Microscope className="w-80 h-80" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab Investigations & Diagnostics</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Diagnostic Tests & Investigation Costs
            </h1>
            <p className="text-indigo-100 text-sm md:text-base leading-relaxed">
              Compare test prices across accredited laboratories in Bangladesh like Popular, Ibn Sina, Labaid, and Square Hospital. Check sample requirements and pre-test fasting protocols.
            </p>

            {/* Search Input */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search test name (e.g. CBC, HbA1c, Lipid Profile, USG, X-Ray)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <Filter className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Filter by Medical Discipline:</span>
            </div>
            
            {/* Fasting Filter Chips */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-500">Fasting Requirement:</span>
              {['All', 'Fasting', 'Non-Fasting'].map(type => (
                <button
                  key={type}
                  onClick={() => setFastingFilter(type)}
                  className={`px-3 py-1 rounded-full font-semibold transition ${
                    fastingFilter === type
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredTests.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Microscope className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No diagnostic tests found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search term or discipline filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md">
                        {test.category}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                        {test.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                        {test.avgCost}
                      </span>
                      <p className="text-[10px] text-slate-400">avg price</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {test.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Report Time:</span>
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{test.turnaroundHours}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                      <span>Sample Type:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{test.sampleType}</span>
                    </div>
                  </div>

                  {/* Lab Prices Preview */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl space-y-1.5 text-[11px]">
                    <span className="font-bold text-slate-500 uppercase text-[10px] tracking-wider">Accredited Lab Pricing</span>
                    <div className="grid grid-cols-2 gap-1 text-slate-600 dark:text-slate-300">
                      {test.labPrices.slice(0, 4).map((lp, idx) => (
                        <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-200/40 dark:border-slate-700/40">
                          <span className="truncate pr-1 text-slate-500">{lp.labName.split(' ')[0]}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{lp.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    test.fastingRequired 
                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900' 
                      : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                  }`}>
                    {test.fastingRequired ? 'Overnight Fasting' : 'No Fasting'}
                  </span>

                  <button
                    onClick={() => setSelectedTestForBooking(test)}
                    className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
                  >
                    Book Inquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Booking Inquiry Modal */}
        <AnimatePresence>
          {selectedTestForBooking && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-full">
                      Diagnostic Booking Inquiry
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {selectedTestForBooking.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedTestForBooking(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {bookingSuccess ? (
                  <div className="p-6 text-center space-y-2 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-2xl">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-200">Inquiry Confirmed!</h3>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300">{bookingSuccess}</p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Patient Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mohammad Rahim"
                        value={bookingForm.patientName}
                        onChange={(e) => setBookingForm({ ...bookingForm, patientName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +880 1711-XXXXXX"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Preferred Diagnostic Center</label>
                      <select
                        value={bookingForm.preferredLab}
                        onChange={(e) => setBookingForm({ ...bookingForm, preferredLab: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Popular Diagnostic Centre">Popular Diagnostic Centre</option>
                        <option value="Ibn Sina Diagnostic Centre">Ibn Sina Diagnostic Centre</option>
                        <option value="Labaid Diagnostic">Labaid Diagnostic</option>
                        <option value="Square Hospital Diagnostics">Square Hospital Diagnostics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Service Preference</label>
                      <select
                        value={bookingForm.sampleCollectionType}
                        onChange={(e) => setBookingForm({ ...bookingForm, sampleCollectionType: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Walk-in Visit">Walk-in Center Visit</option>
                        <option value="Home Sample Collection">Home Sample Collection (+৳200 fee)</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={bookingSubmitting}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-md transition"
                      >
                        {bookingSubmitting ? 'Submitting...' : 'Confirm Test Booking Inquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
