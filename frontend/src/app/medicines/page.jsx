'use client';

import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  DollarSign, 
  Building, 
  Info, 
  X, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMedicines, fetchMedicineCategories } from '../../lib/api';

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [otcFilter, setOtcFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedMed, setSelectedMed] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [medsRes, catsRes] = await Promise.all([
        fetchMedicines(),
        fetchMedicineCategories()
      ]);
      setMedicines(medsRes.data || []);
      setCategories(catsRes.data || ['All']);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = 
      med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.indications.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || med.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesOtc = otcFilter === 'All' || (otcFilter === 'OTC' ? med.isOTC : !med.isOTC);

    return matchesSearch && matchesCategory && matchesOtc;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white p-8 md:p-12 shadow-xl">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <Pill className="w-80 h-80" />
          </div>
          
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-100 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bangladesh Pharmaceutical Index</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Medicines & Generic Drug Directory
            </h1>
            <p className="text-emerald-100 text-sm md:text-base leading-relaxed">
              Look up authentic medicines prescribed in Bangladesh. Check generic compositions, official indications, adult dosages, potential side effects, and standard MRP prices in BDT.
            </p>

            {/* Search Input */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by brand name (e.g. Napa, Seclo), generic, or indication..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
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

        {/* Filter Controls */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-300">
              <Filter className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Filter by Therapeutic Class:</span>
            </div>
            
            {/* OTC Filter Chips */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-slate-500">Dispensing:</span>
              {['All', 'OTC', 'Prescription Only'].map(type => (
                <button
                  key={type}
                  onClick={() => setOtcFilter(type)}
                  className={`px-3 py-1 rounded-full font-semibold transition ${
                    otcFilter === type
                      ? 'bg-emerald-600 text-white shadow-sm'
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
                    ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
          <span>Found <strong className="text-slate-800 dark:text-slate-200">{filteredMedicines.length}</strong> medication{filteredMedicines.length !== 1 ? 's' : ''}</span>
          <span className="italic">Always consult a registered physician before taking medications.</span>
        </div>

        {/* Medicines Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-56 bg-slate-200 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Pill className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No medicines matched your criteria</h3>
            <p className="text-sm text-slate-500 mt-1">Try searching with a generic term like "Paracetamol" or reset filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map((med) => (
              <div
                key={med.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                        {med.dosageForm} • {med.strength}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                        {med.brandName}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                        {med.genericName}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {med.pricePerUnit}
                      </span>
                      <p className="text-[10px] text-slate-400">per unit</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center space-x-1.5 text-slate-500 dark:text-slate-400">
                      <Building className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                      <span className="truncate">{med.manufacturer}</span>
                    </div>

                    <p className="line-clamp-2 text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                      <strong className="text-slate-800 dark:text-slate-200">Indication:</strong> {med.indications}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    med.isOTC 
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900' 
                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                  }`}>
                    {med.isOTC ? 'OTC Medication' : 'Prescription Required'}
                  </span>

                  <button
                    onClick={() => setSelectedMed(med)}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
                  >
                    <span>Details & Dosage</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Medicine Detail Modal */}
        <AnimatePresence>
          {selectedMed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                      {selectedMed.category}
                    </span>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
                      {selectedMed.brandName}
                    </h2>
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      {selectedMed.genericName} ({selectedMed.strength})
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMed(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4 text-xs md:text-sm text-slate-700 dark:text-slate-300">
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Form & Pack</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedMed.dosageForm} ({selectedMed.packSize})</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Unit Price (MRP)</p>
                      <p className="font-black text-emerald-600 dark:text-emerald-400 text-base">{selectedMed.pricePerUnit}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Manufacturer</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedMed.manufacturer}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      <span>Indications & Usage</span>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                      {selectedMed.indications}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                      <Info className="w-4 h-4 text-sky-600" />
                      <span>Adult Dosage Guidelines</span>
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-5">
                      {selectedMed.adultDosage}
                    </p>
                  </div>

                  <div className="space-y-1 bg-rose-50 dark:bg-rose-950/40 p-3.5 rounded-2xl border border-rose-100 dark:border-rose-900/60">
                    <h4 className="font-bold text-rose-700 dark:text-rose-300 flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Side Effects & Caution</span>
                    </h4>
                    <p className="text-rose-600 dark:text-rose-400 text-xs leading-relaxed mt-1">
                      {selectedMed.sideEffects}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setSelectedMed(null)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-xs transition"
                  >
                    Close Information
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
