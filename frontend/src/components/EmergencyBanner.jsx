'use client';

import React from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldAlert, ArrowRight, Activity } from 'lucide-react';

export default function EmergencyBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 dark:from-rose-950 dark:via-red-950 dark:to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-y border-rose-500/30 shadow-2xl">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-rose-900/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-rose-100 border border-white/20">
              <ShieldAlert className="w-4 h-4 text-rose-200" />
              <span>24/7 National Emergency & Health Helpline</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Medical Emergency or Need Blood Urgent?
            </h2>

            <p className="text-rose-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Connect instantly with emergency hotlines, ICU & AC ambulances across Bangladesh, or search registered voluntary blood donors.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="tel:999"
                className="flex items-center space-x-2.5 bg-white text-rose-700 hover:bg-rose-50 font-extrabold px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition text-sm"
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
        </div>
      </div>
    </section>
  );
}
