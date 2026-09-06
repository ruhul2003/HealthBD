'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, Droplets, Truck, ShieldAlert, ArrowRight, Activity } from 'lucide-react';

export default function EmergencyBanner() {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 dark:from-rose-950 dark:via-red-950 dark:to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-rose-500/30 shadow-2xl">
      
      {/* Background Decorative Blurs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-red-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Hotline Quick Dial */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-rose-900/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-rose-100 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-rose-300 animate-ping" />
              <ShieldAlert className="w-4 h-4 text-rose-200" />
              <span>24/7 National Emergency & Health Helpline</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Medical Emergency or Need Blood Urgent?
            </h2>

            <p className="text-rose-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Connect instantly with emergency hotlines, ICU & AC ambulances across Bangladesh, or search 1,000+ registered voluntary blood donors.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:999"
                className="flex items-center space-x-2.5 bg-white text-rose-700 hover:bg-rose-50 font-extrabold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-sm"
              >
                <PhoneCall className="w-4 h-4 text-rose-600 animate-bounce" />
                <span>Call 999 Emergency</span>
              </a>

              <a
                href="tel:16263"
                className="flex items-center space-x-2.5 bg-rose-900/50 hover:bg-rose-900/80 border border-white/20 text-white font-bold px-5 py-3 rounded-2xl transition text-sm backdrop-blur-sm"
              >
                <Activity className="w-4 h-4 text-teal-300" />
                <span>Health Line 16263</span>
              </a>

              <Link
                href="/emergency"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-3 rounded-2xl border border-white/30 transition text-sm backdrop-blur-md"
              >
                <span>Emergency Hub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Quick Blood Group Selector & Ambulance Request */}
          <div className="lg:col-span-5 bg-white/10 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-rose-900/50 p-6 rounded-3xl shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplets className="w-5 h-5 text-rose-300" />
                <h3 className="font-bold text-lg text-white">Find Blood Donors</h3>
              </div>
              <span className="text-xs bg-rose-500/30 text-rose-100 font-semibold px-2.5 py-1 rounded-full border border-rose-400/30">
                Live Directory
              </span>
            </div>

            <p className="text-xs text-rose-100">
              Select desired blood type to view active donors ready in your district:
            </p>

            {/* Blood Type Grid */}
            <div className="grid grid-cols-4 gap-2">
              {bloodGroups.map((bg) => (
                <Link
                  key={bg}
                  href={`/emergency?tab=donors&bloodGroup=${encodeURIComponent(bg)}`}
                  className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-white/15 dark:bg-slate-800/60 hover:bg-white hover:text-rose-700 text-white font-black text-sm border border-white/20 hover:border-white transition group shadow-xs"
                >
                  <Droplets className="w-3.5 h-3.5 mb-0.5 text-rose-300 group-hover:text-rose-600 transition" />
                  <span>{bg}</span>
                </Link>
              ))}
            </div>

            {/* Quick Ambulance Call Bar */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-rose-200" />
                <span className="text-xs font-semibold text-rose-100">24/7 Ambulance Dispatch</span>
              </div>
              <Link
                href="/emergency?tab=ambulance"
                className="text-xs font-bold underline hover:text-rose-200 transition"
              >
                Book Ambulance &rarr;
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
