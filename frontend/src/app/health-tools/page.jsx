'use client';

import React, { useState } from 'react';
import { 
  Activity, 
  Droplets, 
  Heart, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  ArrowRight, 
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';
import { calculateBMI, calculateWaterIntake, calculateBloodPressure } from '../../lib/api';

export default function HealthToolsPage() {
  const [activeTab, setActiveTab] = useState('bmi');

  // BMI State
  const [bmiForm, setBmiForm] = useState({ weightKg: '68', heightCm: '172', age: '28', gender: 'Male' });
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiLoading, setBmiLoading] = useState(false);

  // Water State
  const [waterForm, setWaterForm] = useState({ weightKg: '68', activityLevel: 'moderate' });
  const [waterResult, setWaterResult] = useState(null);
  const [waterLoading, setWaterLoading] = useState(false);

  // BP State
  const [bpForm, setBpForm] = useState({ systolic: '120', diastolic: '80' });
  const [bpResult, setBpResult] = useState(null);
  const [bpLoading, setBpLoading] = useState(false);

  // Handle BMI Submit
  const handleBmiSubmit = async (e) => {
    e.preventDefault();
    setBmiLoading(true);
    const res = await calculateBMI(bmiForm);
    if (res.success) {
      setBmiResult(res.data);
    }
    setBmiLoading(false);
  };

  // Handle Water Submit
  const handleWaterSubmit = async (e) => {
    e.preventDefault();
    setWaterLoading(true);
    const res = await calculateWaterIntake(waterForm);
    if (res.success) {
      setWaterResult(res.data);
    }
    setWaterLoading(false);
  };

  // Handle BP Submit
  const handleBpSubmit = async (e) => {
    e.preventDefault();
    setBpLoading(true);
    const res = await calculateBloodPressure(bpForm);
    if (res.success) {
      setBpResult(res.data);
    }
    setBpLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-800 text-sky-600 dark:text-sky-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Wellness Calculators</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Interactive Health & Vital Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            Monitor your vital health metrics with scientifically validated tools calibrated for South Asian body compositions and lifestyle conditions.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm gap-1">
            <button
              onClick={() => setActiveTab('bmi')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition ${
                activeTab === 'bmi'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>BMI Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab('water')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition ${
                activeTab === 'water'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Droplets className="w-4 h-4" />
              <span>Daily Water Intake</span>
            </button>

            <button
              onClick={() => setActiveTab('bp')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition ${
                activeTab === 'bp'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Blood Pressure</span>
            </button>
          </div>
        </div>

        {/* Tab 1: BMI Calculator */}
        {activeTab === 'bmi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Calculate Your Body Mass Index</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calibrated using the WHO South Asian health thresholds.</p>
              </div>

              <form onSubmit={handleBmiSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="20"
                      max="300"
                      required
                      value={bmiForm.weightKg}
                      onChange={(e) => setBmiForm({ ...bmiForm, weightKg: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Height (cm)</label>
                    <input
                      type="number"
                      step="1"
                      min="50"
                      max="250"
                      required
                      value={bmiForm.heightCm}
                      onChange={(e) => setBmiForm({ ...bmiForm, heightCm: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Age (Years)</label>
                    <input
                      type="number"
                      min="10"
                      max="120"
                      value={bmiForm.age}
                      onChange={(e) => setBmiForm({ ...bmiForm, age: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                    <select
                      value={bmiForm.gender}
                      onChange={(e) => setBmiForm({ ...bmiForm, gender: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bmiLoading}
                  className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-extrabold rounded-xl text-sm shadow-md shadow-sky-600/20 transition flex items-center justify-center space-x-2"
                >
                  <Activity className="w-4 h-4" />
                  <span>{bmiLoading ? 'Computing BMI...' : 'Calculate BMI Now'}</span>
                </button>
              </form>

              {/* South Asian BMI Reference table */}
              <div className="pt-2 text-xs border-t border-slate-100 dark:border-slate-800 text-slate-500 space-y-1">
                <p className="font-bold text-slate-700 dark:text-slate-300">Asian Population BMI Cutoffs:</p>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <span>&lt; 18.5: Underweight</span>
                  <span>18.5 - 22.9: Normal</span>
                  <span>23.0 - 27.4: Overweight</span>
                  <span>&ge; 27.5: Obese</span>
                </div>
              </div>
            </div>

            {/* BMI Results View */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              {bmiResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Calculated Score</span>
                      <div className="flex items-baseline space-x-3 mt-1">
                        <span className="text-5xl font-black text-slate-900 dark:text-white">{bmiResult.bmi}</span>
                        <span className="text-xs font-bold text-slate-400">kg/m²</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                        {bmiResult.category}
                      </span>
                      <p className="text-xs text-slate-400 mt-1">Ideal: {bmiResult.idealWeightRange}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Clinical Risk Profile</h4>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">{bmiResult.healthRisk}</p>
                    </div>

                    <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
                      <h4 className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-300 tracking-wider">Personalized Lifestyle Advice</h4>
                      <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mt-1">{bmiResult.advice}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3 text-slate-400">
                  <Scale className="w-16 h-16 mx-auto opacity-30" />
                  <p className="text-base font-bold text-slate-600 dark:text-slate-300">Enter your height and weight</p>
                  <p className="text-xs max-w-sm mx-auto">Fill in the parameters on the left to receive customized health risk guidance and weight benchmarks.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Daily Water Calculator */}
        {activeTab === 'water' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Hydration & Daily Water Goal</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Calculates optimal hydration needed for Bangladesh climate and exertion.</p>
              </div>

              <form onSubmit={handleWaterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Weight (kg)</label>
                  <input
                    type="number"
                    step="1"
                    min="20"
                    max="200"
                    required
                    value={waterForm.weightKg}
                    onChange={(e) => setWaterForm({ ...waterForm, weightKg: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Daily Physical Exertion</label>
                  <select
                    value={waterForm.activityLevel}
                    onChange={(e) => setWaterForm({ ...waterForm, activityLevel: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="sedentary">Sedentary (Desk Job, minimal sweating)</option>
                    <option value="moderate">Moderate (Walking, commuting, 30m exercise)</option>
                    <option value="heavy">Heavy (Hard labor, 1hr vigorous workout)</option>
                    <option value="athlete">High Exertion / Outdoor Athlete</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={waterLoading}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-extrabold rounded-xl text-sm shadow-md shadow-teal-600/20 transition flex items-center justify-center space-x-2"
                >
                  <Droplets className="w-4 h-4" />
                  <span>{waterLoading ? 'Calculating...' : 'Calculate Daily Water Goal'}</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              {waterResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Target Fluid Volume</span>
                      <div className="flex items-baseline space-x-3 mt-1">
                        <span className="text-5xl font-black text-slate-900 dark:text-white">{waterResult.dailyLiters}</span>
                        <span className="text-lg font-bold text-slate-500">Liters / day</span>
                      </div>
                    </div>

                    <div className="text-right bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 px-4 py-2 rounded-2xl">
                      <p className="text-xs text-teal-600 dark:text-teal-400 font-bold uppercase">Standard Glasses</p>
                      <p className="text-2xl font-black text-teal-700 dark:text-teal-300">~{waterResult.glassesCount} Glasses</p>
                      <p className="text-[10px] text-slate-400">250 ml each</p>
                    </div>
                  </div>

                  <div className="bg-sky-50 dark:bg-sky-950/40 p-4 rounded-2xl border border-sky-100 dark:border-sky-900/60">
                    <h4 className="text-xs font-bold uppercase text-sky-700 dark:text-sky-300 tracking-wider">Hydration Guidance</h4>
                    <p className="text-sm text-sky-800 dark:text-sky-200 mt-1">{waterResult.guidance}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3 text-slate-400">
                  <Droplets className="w-16 h-16 mx-auto opacity-30 text-teal-500" />
                  <p className="text-base font-bold text-slate-600 dark:text-slate-300">Determine your daily hydration requirement</p>
                  <p className="text-xs max-w-sm mx-auto">Adequate hydration prevents kidney stones, fatigue, and heat exhaustion.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Blood Pressure Assessor */}
        {activeTab === 'bp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Blood Pressure Risk Assessor</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Based on American Heart Association clinical categories.</p>
              </div>

              <form onSubmit={handleBpSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Systolic (Top number, mmHg)</label>
                    <input
                      type="number"
                      min="60"
                      max="260"
                      required
                      value={bpForm.systolic}
                      onChange={(e) => setBpForm({ ...bpForm, systolic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Diastolic (Bottom number, mmHg)</label>
                    <input
                      type="number"
                      min="40"
                      max="160"
                      required
                      value={bpForm.diastolic}
                      onChange={(e) => setBpForm({ ...bpForm, diastolic: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={bpLoading}
                  className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold rounded-xl text-sm shadow-md shadow-rose-600/20 transition flex items-center justify-center space-x-2"
                >
                  <Heart className="w-4 h-4" />
                  <span>{bpLoading ? 'Evaluating...' : 'Assess Blood Pressure'}</span>
                </button>
              </form>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <p className="font-bold text-slate-700 dark:text-slate-300">How to measure properly:</p>
                <p>Rest quietly for 5 minutes before checking. Avoid tea, coffee, or cigarettes for 30 minutes prior to measurement.</p>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-center">
              {bpResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cardiovascular Reading</span>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-4xl font-black text-slate-900 dark:text-white">{bpResult.systolic} / {bpResult.diastolic}</span>
                        <span className="text-xs font-bold text-slate-400">mmHg</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                        {bpResult.classification}
                      </span>
                      <p className="text-xs font-bold text-slate-500 mt-1">Severity: {bpResult.level}</p>
                    </div>
                  </div>

                  <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/60">
                    <h4 className="text-xs font-bold uppercase text-rose-700 dark:text-rose-300 tracking-wider">Clinical Guidance</h4>
                    <p className="text-sm font-medium text-rose-800 dark:text-rose-200 mt-1">{bpResult.guidance}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 space-y-3 text-slate-400">
                  <Heart className="w-16 h-16 mx-auto opacity-30 text-rose-500" />
                  <p className="text-base font-bold text-slate-600 dark:text-slate-300">Enter your systolic and diastolic readings</p>
                  <p className="text-xs max-w-sm mx-auto">Get instantaneous clinical classification according to AHA medical guidelines.</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
