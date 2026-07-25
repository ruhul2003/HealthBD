import React from 'react';
import Hero from '../components/Hero';
import SpecialtyGrid from '../components/SpecialtyGrid';
import DoctorCard from '../components/DoctorCard';
import HospitalCard from '../components/HospitalCard';
import CostEstimatorWidget from '../components/CostEstimatorWidget';
import { fetchDoctors, fetchHospitals, fetchSpecialists, fetchTreatmentCosts } from '../lib/api';
import Link from 'next/link';
import { Stethoscope, Building2, PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Parallel API requests to backend Express server
  const [doctorsRes, hospitalsRes, specialistsRes, costsRes] = await Promise.all([
    fetchDoctors({ isFeatured: 'true' }),
    fetchHospitals(),
    fetchSpecialists(),
    fetchTreatmentCosts()
  ]);

  const doctors = doctorsRes.data || [];
  const hospitals = hospitalsRes.data || [];
  const specialists = specialistsRes.data || [];
  const costs = costsRes.data || [];

  return (
    <div className="space-y-0">
      
      {/* Hero Section */}
      <Hero />

      {/* Specialty Categories Grid */}
      <SpecialtyGrid specialists={specialists} />

      {/* Top Verified Doctors Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                Top Consultants
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Featured Specialist Doctors
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Book face-to-face chamber appointments with top senior doctors in Bangladesh
              </p>
            </div>

            <Link
              href="/doctors"
              className="inline-flex items-center space-x-1.5 text-sky-600 dark:text-sky-400 font-bold text-sm hover:underline mt-4 md:mt-0"
            >
              <span>Explore All {doctors.length > 0 ? '1,000+' : ''} Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 6).map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>

        </div>
      </section>

      {/* Leading Hospitals Directory Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                Accredited Hospitals
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
                Top Medical Centers & Hospitals in BD
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                Explore hospital bed counts, emergency hotline numbers, and ICU facilities
              </p>
            </div>

            <Link
              href="/hospitals"
              className="inline-flex items-center space-x-1.5 text-teal-600 dark:text-teal-400 font-bold text-sm hover:underline mt-4 md:mt-0"
            >
              <span>View All Hospitals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hospitals.slice(0, 6).map((hosp) => (
              <HospitalCard key={hosp._id} hospital={hosp} />
            ))}
          </div>

        </div>
      </section>

      {/* Medical Treatment Cost Estimator Widget */}
      <CostEstimatorWidget costs={costs} />

      {/* Emergency Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold tracking-wider uppercase">
              24/7 Medical Emergency Assistance
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Need Immediate Hospitalization or Ambulance?
            </h2>
            <p className="text-rose-100 text-sm">
              Call our national health hotline 10616 for instant ambulance dispatch, ICU bed availability checks, and emergency doctor guidance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:10616"
              className="flex items-center justify-center space-x-2 bg-white text-rose-700 hover:bg-rose-50 font-extrabold px-6 py-3.5 rounded-2xl shadow-xl transition"
            >
              <PhoneCall className="w-5 h-5 animate-bounce" />
              <span>Call Emergency Hotline 10616</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
