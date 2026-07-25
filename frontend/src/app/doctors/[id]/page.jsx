'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchDoctorById } from '../../../lib/api';
import BookingModal from '../../../components/BookingModal';
import { Star, MapPin, Building2, Calendar, Clock, Phone, Mail, Award, CheckCircle2, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function DoctorDetailPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    async function loadDoctor() {
      if (id) {
        const res = await fetchDoctorById(id);
        setDoctor(res.data);
        setLoading(false);
      }
    }
    loadDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-sky-600 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loading doctor profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Doctor Profile Not Found</h2>
        <p className="text-sm text-slate-500">The requested doctor profile does not exist or has been removed.</p>
        <Link href="/doctors" className="inline-flex items-center space-x-2 bg-sky-600 text-white font-bold px-4 py-2 rounded-xl text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/doctors" className="inline-flex items-center space-x-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Doctor Directory</span>
        </Link>

        {/* Main Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <img
              src={doctor.photo || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400'}
              alt={doctor.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover border-4 border-sky-500/20 shadow-md shrink-0"
            />

            <div className="space-y-3 flex-grow">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-extrabold px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                  {doctor.specialty}
                </span>
                <span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Medical Consultant</span>
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {doctor.name}
              </h1>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                {doctor.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {doctor.degree}
              </p>

              <div className="flex items-center space-x-6 pt-2 text-xs">
                <div className="flex items-center space-x-1 font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{doctor.rating} Rating</span>
                  <span className="text-slate-400 font-normal">({doctor.reviewCount} reviews)</span>
                </div>
                <div className="font-bold text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-sky-500 inline mr-1" />
                  <span>{doctor.experienceYears} Years Experience</span>
                </div>
              </div>
            </div>

            {/* Action Fee Box */}
            <div className="w-full md:w-auto bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-center md:text-right space-y-3 shrink-0">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Consultation Fee</p>
                <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  ৳{doctor.fee} <span className="text-xs font-normal text-slate-500">BDT</span>
                </p>
              </div>

              <button
                onClick={() => setIsBookingOpen(true)}
                className="w-full py-3 px-6 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-600/30 transition cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Bio & Chamber Info */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Bio Section */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Professional Biography</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {doctor.bio}
              </p>
            </div>

            {/* Chamber & Timing */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Chamber & Visiting Schedule</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{doctor.hospital}</p>
                    <p className="text-xs text-slate-500">{doctor.hospitalAddress}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-sky-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Available Visiting Days</p>
                    <p className="text-xs text-slate-500">{doctor.availableDays?.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-sky-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Visiting Hours</p>
                    <p className="text-xs text-slate-500">{doctor.timing}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Col: Languages & Contact Info */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Quick Info</h4>
              
              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-slate-400 font-bold uppercase">City Location</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{doctor.city}, Bangladesh</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase">Languages Spoken</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{doctor.languages?.join(', ')}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold uppercase">Gender</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{doctor.gender}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Book Visit Consultation
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      <BookingModal
        doctor={doctor}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
