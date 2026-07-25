'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchHospitalById } from '../../../lib/api';
import DoctorCard from '../../../components/DoctorCard';
import { Star, MapPin, PhoneCall, Bed, HeartPulse, Building2, ShieldCheck, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function HospitalDetailPage() {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHospital() {
      if (id) {
        const res = await fetchHospitalById(id);
        setHospital(res.data);
        setLoading(false);
      }
    }
    loadHospital();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loading hospital details...</p>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Hospital Not Found</h2>
        <Link href="/hospitals" className="inline-flex items-center space-x-2 bg-teal-600 text-white font-bold px-4 py-2 rounded-xl text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hospital Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/hospitals" className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hospital Directory</span>
        </Link>

        {/* Hospital Hero Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
          <div className="relative h-64 sm:h-80 w-full bg-slate-200">
            <img
              src={hospital.image || 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1200'}
              alt={hospital.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="bg-teal-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {hospital.type}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold">{hospital.name}</h1>
              <p className="text-sm text-slate-200 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{hospital.address}</span>
              </p>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-sky-50 dark:bg-sky-950/60 rounded-2xl text-sky-600 dark:text-sky-400">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Total Beds</p>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">{hospital.totalBeds}+ Beds</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/60 rounded-2xl text-rose-600 dark:text-rose-400">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">ICU Capacity</p>
                <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{hospital.availableICUBeds} Available</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/60 rounded-2xl text-amber-600 dark:text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Hospital Rating</p>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">{hospital.rating} / 5.0</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-2xl text-teal-600 dark:text-teal-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Emergency Helpline</p>
                <a href={`tel:${hospital.emergencyHotline}`} className="text-lg font-extrabold text-rose-600 dark:text-rose-400 hover:underline">
                  {hospital.emergencyHotline || hospital.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities & Departments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Clinical Departments</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.departments?.map((dept) => (
                <span key={dept} className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
                  {dept}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Hospital Facilities</h3>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              {hospital.facilities?.map((fac) => (
                <li key={fac} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                  <span>{fac}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Affiliated Doctors Section */}
        {hospital.doctors && hospital.doctors.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Doctors Practicing at {hospital.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospital.doctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
