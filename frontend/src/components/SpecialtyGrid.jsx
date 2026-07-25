'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartPulse, Brain, Bone, Baby, UserCheck, Activity, ShieldAlert, Sparkles, Stethoscope, Thermometer, ArrowUpRight } from 'lucide-react';

const iconMap = {
  HeartPulse: HeartPulse,
  Brain: Brain,
  Bone: Bone,
  Baby: Baby,
  UserCheck: UserCheck,
  Activity: Activity,
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  Stethoscope: Stethoscope,
  Thermometer: Thermometer,
};

export default function SpecialtyGrid({ specialists = [] }) {
  return (
    <section className="py-16 bg-white dark:bg-slate-900/90 border-y border-slate-200/90 dark:border-slate-800/90 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/80 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800/80">
              Medical Specialties
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2.5">
              Browse Doctors by Specialization
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Select a medical department to find top certified specialists in Bangladesh
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center space-x-1.5 text-sky-600 dark:text-sky-400 font-bold text-sm hover:underline mt-4 md:mt-0"
          >
            <span>View All Doctors</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {specialists.map((spec, idx) => {
            const IconComponent = iconMap[spec.icon] || Stethoscope;
            return (
              <motion.div
                key={spec._id || spec.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  href={`/doctors?specialty=${encodeURIComponent(spec.name)}`}
                  className="group block bg-slate-50/90 dark:bg-slate-800/60 hover:bg-sky-600 hover:dark:bg-sky-600 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-white dark:bg-slate-700/90 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:text-white transition-colors mb-3.5 shadow-xs">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white group-hover:text-white text-base transition-colors line-clamp-1">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-sky-100 transition-colors mt-1 font-medium">
                    {spec.count ? `${spec.count}+ Specialists` : 'Top Doctors'}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
