'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import { PhoneCall, Sun, Moon, LogOut, Menu, X, Stethoscope, Building2, Calculator, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isDarkMode, toggleTheme, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Find Doctors', href: '/doctors', icon: Stethoscope },
    { name: 'Hospitals', href: '/hospitals', icon: Building2 },
    { name: 'Cost Estimator', href: '/costs', icon: Calculator },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/90 shadow-sm dark:shadow-slate-950/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Light / Dark Image Switching */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-12 w-44 flex items-center">
              <Image
                src={isDarkMode ? '/dark-logo.png' : '/light-logo.png'}
                alt="HealthBD Logo"
                fill
                priority
                unoptimized
                className="object-contain transition-opacity duration-300"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-sky-600 to-teal-600 text-white shadow-md shadow-sky-500/25'
                      : 'text-slate-700 hover:text-sky-600 hover:bg-sky-50 dark:text-slate-200 dark:hover:text-sky-400 dark:hover:bg-slate-800/80'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons: Emergency, Theme Toggle, Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Emergency Hotline Button */}
            <a
              href="tel:10616"
              className="flex items-center space-x-2 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80 px-3.5 py-1.5 rounded-full text-xs font-extrabold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
              <span>Emergency 10616</span>
            </a>

            {/* Professional Theme Switcher Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full p-1 w-16 h-8.5 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-inner"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`w-6.5 h-6.5 rounded-full flex items-center justify-center shadow-md ${
                  isDarkMode
                    ? 'translate-x-7.5 bg-slate-900 text-indigo-400 border border-indigo-500/40'
                    : 'translate-x-0 bg-white text-amber-500 border border-amber-300'
                }`}
              >
                {isDarkMode ? (
                  <Moon className="w-3.5 h-3.5 fill-indigo-400 text-indigo-400" />
                ) : (
                  <Sun className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                )}
              </motion.div>
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* User Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-full border border-slate-200 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-sky-500"
                  />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 max-w-[110px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/doctors"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80"
                    >
                      <Stethoscope className="w-4 h-4 text-sky-500" />
                      <span>Book Doctors</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-sm font-bold rounded-full shadow-md shadow-sky-600/25 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-base font-semibold ${
                isActive(link.href)
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
