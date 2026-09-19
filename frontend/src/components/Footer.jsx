'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../lib/auth-context';
import { Phone, Mail, MapPin, ShieldCheck, Heart, Stethoscope, Building2, Calculator, ArrowRight } from 'lucide-react';

export default function Footer() {
  const { isDarkMode } = useAuth();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-12 w-48">
              <Image
                src="/dark-logo.png"
                alt="HealthBD Logo"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              HealthBD is Bangladesh's premier healthcare directory platform. Search top doctors, find accredited hospitals, check treatment costs, and book instant medical consultations across Bangladesh.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <div className="flex items-center space-x-2 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-sky-400 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Verified Medical Profiles</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/doctors" className="hover:text-sky-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  <span>Find Specialist Doctors</span>
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="hover:text-sky-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  <span>Top Hospitals in BD</span>
                </Link>
              </li>
              <li>
                <Link href="/costs" className="hover:text-sky-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  <span>Treatment Cost Estimator</span>
                </Link>
              </li>
              <li>
                <Link href="/medicines" className="hover:text-sky-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  <span>Medicines & Generic Drugs</span>
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-sky-400 transition flex items-center space-x-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                  <span>Patient Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Specialties */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Specialist Care</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/doctors?specialty=Cardiology" className="hover:text-white transition">Cardiologists in Dhaka</Link></li>
              <li><Link href="/doctors?specialty=Gynecology" className="hover:text-white transition">Gynecologists & Obstetricians</Link></li>
              <li><Link href="/doctors?specialty=Neurology" className="hover:text-white transition">Neurologists & Brain Specialists</Link></li>
              <li><Link href="/doctors?specialty=Orthopedics" className="hover:text-white transition">Orthopedic & Joint Surgeons</Link></li>
              <li><Link href="/doctors?specialty=Pediatrics" className="hover:text-white transition">Pediatricians & Child Care</Link></li>
            </ul>
          </div>

          {/* Emergency & Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide">Emergency Helplines</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-rose-950/50 border border-rose-800/50 p-3 rounded-2xl">
                <p className="text-xs text-rose-300 font-semibold">National Health Hotline</p>
                <a href="tel:16263" className="text-lg font-extrabold text-rose-400 hover:underline">
                  16263 (Shasthya Batayon)
                </a>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Gulshan-2, Dhaka 1212, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-400">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>support@healthbd.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} HealthBD Platform. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Doctor Registration</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
