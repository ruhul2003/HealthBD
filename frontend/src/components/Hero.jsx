'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Stethoscope, ShieldCheck, Award, HeartHandshake, PhoneCall, ChevronLeft, ChevronRight, Activity, Sparkles, Building2, HeartPulse, Clock, CheckCircle2 } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    image: '/banners/banner1.png',
    badge: 'Trusted Healthcare Platform in Bangladesh',
    titlePrefix: 'Find Top ',
    highlight: 'Doctors & Hospitals',
    titleSuffix: ' Near You',
    subtitle: 'Book face-to-face appointments with senior consultants, compare hospital facilities, and get transparent treatment cost estimates across Bangladesh.',
  },
  {
    id: 2,
    image: '/banners/banner2.png',
    badge: '24/7 Specialist Care & Fast Appointments',
    titlePrefix: 'Expert ',
    highlight: 'Medical Specialist Care',
    titleSuffix: ' Available Today',
    subtitle: 'Access over 50+ specialized fields including Cardiology, Neurology, Pediatrics, and Gynecology with verified patient ratings.',
  },
  {
    id: 3,
    image: '/banners/banner3.png',
    badge: 'Transparent Cost Estimates & Modern Labs',
    titlePrefix: 'Smart ',
    highlight: 'Healthcare Facilities & Labs',
    titleSuffix: ' Nationwide',
    subtitle: 'Compare surgery, ICU, and diagnostic procedure expenses across Dhaka, Chittagong, Sylhet, and major medical hubs.',
  }
];

const MARQUEE_ITEMS = [
  { icon: PhoneCall, text: '24/7 National Emergency Hotline: 10616 for Ambulance & ICU', highlight: 'HOTLINE', color: 'text-rose-400 border-rose-500/40 bg-rose-500/10' },
  { icon: ShieldCheck, text: '1,200+ BMDC Verified Specialist Doctors', highlight: 'VERIFIED', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
  { icon: Building2, text: '50+ Top Accredited Hospitals & Diagnostic Centers', highlight: 'HOSPITALS', color: 'text-sky-400 border-sky-500/40 bg-sky-500/10' },
  { icon: HeartPulse, text: 'Instant Free Chamber & Telemedicine Booking', highlight: '100% FREE', color: 'text-teal-400 border-teal-500/40 bg-teal-500/10' },
  { icon: Activity, text: 'Transparent Surgery, ICU & Lab Procedure Cost Estimates', highlight: 'ESTIMATES', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
  { icon: Sparkles, text: 'Dhaka • Chittagong • Sylhet • Rajshahi • Khulna • Barisal • Rangpur', highlight: 'NATIONWIDE', color: 'text-purple-400 border-purple-500/40 bg-purple-500/10' },
];

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('All');
  const [city, setCity] = useState('All');

  // Auto slide interval logic (10 seconds delay)
  useEffect(() => {
    if (!isAutoplay) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isAutoplay]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (specialty !== 'All') params.append('specialty', specialty);
    if (city !== 'All') params.append('city', city);
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <section 
      className="relative overflow-hidden pt-12 pb-0 lg:pt-16 transition-colors duration-500 border-b border-slate-200 dark:border-slate-800/80 min-h-[640px] flex flex-col justify-between"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
    >
      
      {/* Sliding Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Multi-layered Overlays for High Contrast & Readable Text */}
        <div className="absolute inset-0 bg-slate-950/70 dark:bg-slate-950/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-2xl h-[500px] bg-gradient-to-tr from-sky-500/20 via-teal-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white transition-all duration-300 shadow-2xl hover:scale-110 hover:border-sky-400 hover:text-sky-300 group"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white transition-all duration-300 shadow-2xl hover:scale-110 hover:border-sky-400 hover:text-sky-300 group"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          
          {/* Dynamic Badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentSlide}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-sky-500/20 dark:bg-sky-950/90 text-sky-200 dark:text-sky-300 border border-sky-400/40 dark:border-sky-700/80 px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{SLIDES[currentSlide].badge}</span>
            </motion.div>
          </AnimatePresence>

          {/* Dynamic Wide Heading */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`heading-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              {SLIDES[currentSlide].titlePrefix}
              <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                {SLIDES[currentSlide].highlight}
              </span>
              {SLIDES[currentSlide].titleSuffix}
            </motion.h1>
          </AnimatePresence>

          {/* Dynamic Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`subtitle-${currentSlide}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="text-base sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-sm"
            >
              {SLIDES[currentSlide].subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Ultra Wide Sleek Search Bar */}
          <motion.form
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            onSubmit={handleSearch}
            className="bg-slate-900/85 backdrop-blur-xl p-3 sm:p-4 rounded-3xl lg:rounded-full shadow-2xl border border-slate-700/80 grid grid-cols-1 sm:grid-cols-12 gap-3 transition-colors duration-300 max-w-5xl mx-auto"
          >
            {/* Search Keyword Input */}
            <div className="sm:col-span-5 relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-5" />
              <input
                type="text"
                placeholder="Doctor name, specialty, or hospital..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/90 text-white text-sm font-semibold placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 border border-slate-700 rounded-2xl lg:rounded-full transition-colors"
              />
            </div>

            {/* Specialty Select */}
            <div className="sm:col-span-3 relative flex items-center">
              <Stethoscope className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full pl-11 pr-8 py-3.5 bg-slate-800/90 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 border border-slate-700 rounded-2xl lg:rounded-full appearance-none cursor-pointer transition-colors"
              >
                <option value="All" className="bg-slate-900 text-white">All Specialties</option>
                <option value="Cardiology" className="bg-slate-900 text-white">Cardiology</option>
                <option value="Gynecology" className="bg-slate-900 text-white">Gynecology</option>
                <option value="Neurology" className="bg-slate-900 text-white">Neurology</option>
                <option value="Orthopedics" className="bg-slate-900 text-white">Orthopedics</option>
                <option value="Pediatrics" className="bg-slate-900 text-white">Pediatrics</option>
                <option value="Gastroenterology" className="bg-slate-900 text-white">Gastroenterology</option>
                <option value="Oncology" className="bg-slate-900 text-white">Oncology</option>
                <option value="Dermatology" className="bg-slate-900 text-white">Dermatology</option>
                <option value="ENT" className="bg-slate-900 text-white">ENT</option>
                <option value="Internal Medicine" className="bg-slate-900 text-white">Internal Medicine</option>
                <option value="Urology" className="bg-slate-900 text-white">Urology</option>
              </select>
            </div>

            {/* City Select */}
            <div className="sm:col-span-2 relative flex items-center">
              <MapPin className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full pl-10 pr-6 py-3.5 bg-slate-800/90 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-400 border border-slate-700 rounded-2xl lg:rounded-full appearance-none cursor-pointer transition-colors"
              >
                <option value="All" className="bg-slate-900 text-white">All Districts</option>
                <option value="Dhaka" className="bg-slate-900 text-white">Dhaka</option>
                <option value="Chittagong" className="bg-slate-900 text-white">Chittagong</option>
                <option value="Sylhet" className="bg-slate-900 text-white">Sylhet</option>
                <option value="Rajshahi" className="bg-slate-900 text-white">Rajshahi</option>
                <option value="Khulna" className="bg-slate-900 text-white">Khulna</option>
                <option value="Barisal" className="bg-slate-900 text-white">Barisal</option>
                <option value="Rangpur" className="bg-slate-900 text-white">Rangpur</option>
                <option value="Mymensingh" className="bg-slate-900 text-white">Mymensingh</option>
                <option value="Comilla" className="bg-slate-900 text-white">Comilla</option>
                <option value="Bogura" className="bg-slate-900 text-white">Bogura</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full h-full min-h-[50px] bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white font-bold text-sm rounded-2xl lg:rounded-full shadow-lg shadow-sky-500/30 flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </motion.form>

          {/* Bottom Slide Indicators */}
          <div className="flex items-center justify-center space-x-4 max-w-5xl mx-auto pt-2">
            {/* Dot Slide Indicators */}
            <div className="flex items-center space-x-2.5">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? 'w-8 bg-gradient-to-r from-sky-400 to-teal-400 shadow-sm shadow-sky-400'
                      : 'w-2.5 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Wide Stats Grid Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-left max-w-5xl mx-auto"
          >
            <div className="flex items-center space-x-3.5 bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-slate-800 shadow-lg transition-colors">
              <div className="p-3 bg-sky-500/20 rounded-2xl text-sky-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">1,200+</p>
                <p className="text-xs text-slate-300 font-semibold">Verified Doctors</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-slate-800 shadow-lg transition-colors">
              <div className="p-3 bg-teal-500/20 rounded-2xl text-teal-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">50+</p>
                <p className="text-xs text-slate-300 font-semibold">Top Hospitals</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-slate-800 shadow-lg transition-colors">
              <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">100% Free</p>
                <p className="text-xs text-slate-300 font-semibold">Instant Booking</p>
              </div>
            </div>

            <div className="flex items-center space-x-3.5 bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-slate-800 shadow-lg transition-colors">
              <div className="p-3 bg-rose-500/20 rounded-2xl text-rose-400">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-extrabold text-white">24/7 Support</p>
                <p className="text-xs text-slate-300 font-semibold">Emergency Line</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Dynamic Infinite Marquee at the Bottom of Banner */}
      <div className="w-full mt-10 relative z-20 overflow-hidden bg-slate-950/85 backdrop-blur-md border-t border-slate-800/80 py-3.5 shadow-2xl">
        {/* Left & Right Gradient Mask Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden select-none">
          <motion.div
            className="flex items-center space-x-6 sm:space-x-8 whitespace-nowrap min-w-full"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 32,
              ease: 'linear',
            }}
          >
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center space-x-3 bg-slate-900/90 border border-slate-800 hover:border-sky-500/50 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-200 transition-all duration-300 shadow-md hover:scale-105"
                >
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase border ${item.color}`}>
                    {item.highlight}
                  </span>
                  <IconComponent className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-slate-200 font-semibold">{item.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

    </section>
  );
}

