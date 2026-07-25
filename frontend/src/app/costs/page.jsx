'use client';

import React, { useState, useEffect } from 'react';
import CostEstimatorWidget from '../../components/CostEstimatorWidget';
import { fetchTreatmentCosts } from '../../lib/api';
import { Calculator, ShieldCheck, Info, Loader2 } from 'lucide-react';

export default function CostsPage() {
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCosts() {
      const res = await fetchTreatmentCosts();
      setCosts(res.data || []);
      setLoading(false);
    }
    loadCosts();
  }, []);

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-700 dark:from-slate-900 dark:via-teal-950 dark:to-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-3 relative overflow-hidden border border-teal-600/30 dark:border-teal-800/80 transition-colors duration-300">
          <div className="relative z-10 max-w-3xl">
            <span className="bg-white/20 dark:bg-teal-500/20 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-teal-100 dark:text-teal-300 border border-white/20 dark:border-teal-700/50">
              Transparent Medical Costs
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
              Medical Treatment & Surgery Cost Estimator Bangladesh
            </h1>
            <p className="text-teal-100 dark:text-slate-300 text-sm mt-1 font-medium">
              Compare average charges for surgeries, diagnostic imaging, cardiac procedures, and intensive care bed fees across private & public medical institutions in BDT.
            </p>
          </div>
        </div>

        {/* Estimator Widget */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-3" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loading treatment cost data...</p>
          </div>
        ) : (
          <CostEstimatorWidget costs={costs} />
        )}

      </div>
    </div>
  );
}
