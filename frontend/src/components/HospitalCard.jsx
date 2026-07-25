'use client';

import React from 'react';
import Link from 'next/link';
import { Star, MapPin, PhoneCall, Bed, HeartPulse, ArrowRight } from 'lucide-react';

export default function HospitalCard({ hospital }) {
  if (!hospital) return null;

  return (
    <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-md hover:shadow-xl dark:hover:border-teal-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1">
      
      <div>
        {/* Hospital Image & Rating Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={hospital.image || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800'}
            alt={hospital.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1 border border-slate-200 dark:border-slate-700 shadow-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{hospital.rating}</span>
          </div>

          {hospital.emergencyHotline && (
            <div className="absolute top-3 right-3 bg-rose-600 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-md flex items-center space-x-1">
              <PhoneCall className="w-3 h-3 animate-pulse" />
              <span>{hospital.emergencyHotline}</span>
            </div>
          )}
        </div>

        {/* Info Container */}
        <div className="p-6 space-y-3">
          <span className="text-[11px] font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider bg-teal-50 dark:bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800/80">
            {hospital.type}
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            <Link href={`/hospitals/${hospital._id}`}>{hospital.name}</Link>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center space-x-1.5">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{hospital.address}</span>
          </p>

          {/* Key Stats: Beds & ICU */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
            <div className="bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center space-x-2">
              <Bed className="w-4 h-4 text-sky-500" />
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Total Beds</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200">{hospital.totalBeds}+</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded-2xl border border-slate-200/70 dark:border-slate-700/70 flex items-center space-x-2">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">ICU Beds</p>
                <p className="font-extrabold text-emerald-600 dark:text-emerald-400">{hospital.availableICUBeds} Beds</p>
              </div>
            </div>
          </div>

          {/* Departments Tag Cloud */}
          {hospital.departments && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hospital.departments.slice(0, 4).map((dept) => (
                <span
                  key={dept}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-semibold border border-slate-200/50 dark:border-slate-700/50"
                >
                  {dept}
                </span>
              ))}
              {hospital.departments.length > 4 && (
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold self-center">
                  +{hospital.departments.length - 4} more
                </span>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-slate-50/80 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Est. {hospital.establishedYear}</span>
        <Link
          href={`/hospitals/${hospital._id}`}
          className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
        >
          <span>View Hospital Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
