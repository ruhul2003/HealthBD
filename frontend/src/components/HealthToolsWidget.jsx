'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, ArrowRight, Activity, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HealthToolsWidget() {
  const [weight, setWeight] = useState('68');
  const [height, setHeight] = useState('170');
  const [calculatedBmi, setCalculatedBmi] = useState(null);

  const handleQuickCalculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      let status = 'Normal';
      let statusColor = 'text-emerald-500';
      if (bmi < 18.5) {
        status = 'Underweight';
        statusColor = 'text-sky-500';
      } else if (bmi >= 23.0 && bmi <= 27.4) {
        status = 'Overweight';
        statusColor = 'text-amber-500';
      } else if (bmi >= 27.5) {
        status = 'Obese';
        statusColor = 'text-rose-500';
      }
      setCalculatedBmi({ bmi, status, statusColor });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-sky-500/20 border border-sky-400/30 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-sky-300">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Smart Health Diagnostics</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Know Your Health Numbers in Seconds
            </h2>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Calculate your Body Mass Index (BMI) using WHO South Asian clinical thresholds, determine your exact daily hydration requirements, and assess your cardiovascular pressure.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/health-tools"
                className="inline-flex items-center space-x-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-6 py-3 rounded-2xl shadow-lg shadow-sky-500/20 transition duration-200 text-sm"
              >
                <span>Open Full Health Tools Suite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Mini Interactive Calculator Card */}
          <div className="lg:col-span-6 bg-white/10 dark:bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-xl border border-sky-400/20">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Instant Quick BMI Check</h3>
                <p className="text-xs text-slate-400">South Asian Standard Reference</p>
              </div>
            </div>

            <form onSubmit={handleQuickCalculate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="e.g. 68"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="e.g. 170"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-black rounded-xl text-sm transition flex items-center justify-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>Calculate My BMI</span>
              </button>
            </form>

            {calculatedBmi && (
              <div className="mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Calculated BMI</p>
                  <p className="text-3xl font-black text-white">{calculatedBmi.bmi}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Category</p>
                  <p className={`text-base font-extrabold ${calculatedBmi.statusColor}`}>
                    {calculatedBmi.status}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
