'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CostEstimatorWidget({ costs = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Cardiology', 'Maternity & Gynecology', 'Diagnostic & Imaging', 'Orthopedics & Surgery', 'ICU & Critical Care', 'Ophthalmology / Eye'];

  const filteredCosts = costs.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      item.procedureName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800/80">
            Medical Cost Transparency
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Treatment Cost Estimator Bangladesh
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            Understand estimated costs for major surgeries, diagnostic imaging, and hospital bed charges in BDT.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-slate-900/90 p-4 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-md mb-8 flex flex-col md:flex-row items-center gap-4 justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search procedure name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 rounded-2xl text-xs border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Cost Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCosts.map((cost) => (
            <div
              key={cost._id || cost.procedureName}
              className="bg-white dark:bg-slate-900/90 p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-md flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition duration-300"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800/80">
                  {cost.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {cost.procedureName}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {cost.description}
                </p>
              </div>

              {/* Price Range Breakdown */}
              <div className="bg-slate-50/80 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Estimated Cost:</span>
                  <span className="text-lg font-extrabold text-teal-600 dark:text-teal-400">
                    ৳{cost.avgCostBDT.toLocaleString()} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">BDT</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>Est. Cost Range:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    ৳{cost.minCostBDT.toLocaleString()} - ৳{cost.maxCostBDT.toLocaleString()} BDT
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Duration / Stay:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{cost.duration}</span>
                </div>
              </div>

              {/* Package Inclusion Bullets */}
              {cost.includes && (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">Typically Includes:</p>
                  <ul className="grid grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {cost.includes.map((inc, i) => (
                      <li key={i} className="flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-500 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/costs"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg shadow-teal-600/25 transition cursor-pointer"
          >
            <span>Explore Complete Treatment Cost Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
