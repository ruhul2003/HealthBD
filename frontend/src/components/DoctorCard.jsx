'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, MapPin, Building2, Calendar, Clock, CheckCircle2, Stethoscope, ArrowRight } from 'lucide-react';
import BookingModal from './BookingModal';

export default function DoctorCard({ doctor }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (!doctor) return null;

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1">
        
        <div className="p-6 space-y-4">
          
          {/* Header row with Avatar & Verified Badge */}
          <div className="flex items-start justify-between gap-4">
            <div className="relative">
              <img
                src={doctor.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300'}
                alt={doctor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-500/20 shadow-sm"
              />
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-slate-900" title="Verified Specialist">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="text-right">
              <div className="inline-flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800/60">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{doctor.rating}</span>
                <span className="text-slate-400 font-normal">({doctor.reviewCount})</span>
              </div>
              <p className="text-xs font-bold text-sky-600 dark:text-sky-400 mt-2">
                {doctor.experienceYears} Years Exp.
              </p>
            </div>
          </div>

          {/* Doctor Info */}
          <div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider bg-sky-50 dark:bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800/60">
              {doctor.specialty}
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              <Link href={`/doctors/${doctor._id}`}>{doctor.name}</Link>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium mt-0.5 line-clamp-1">
              {doctor.title}
            </p>
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">
              {doctor.degree}
            </p>
          </div>

          {/* Hospital & Location */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center space-x-2 truncate">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{doctor.hospital}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{doctor.city}, Bangladesh</span>
            </div>
            {doctor.availableDays && (
              <div className="flex items-center space-x-2 text-slate-500">
                <Calendar className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Days: {doctor.availableDays.join(', ')}</span>
              </div>
            )}
          </div>

        </div>

        {/* Footer Card Row with Fee & Booking Button */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-400">Consultation Fee</p>
            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              ৳{doctor.fee} <span className="text-xs font-normal text-slate-500">BDT</span>
            </p>
          </div>

          <button
            onClick={() => setIsBookingOpen(true)}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-sky-600/20 flex items-center space-x-1.5 transition cursor-pointer"
          >
            <span>Book Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      <BookingModal
        doctor={doctor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
