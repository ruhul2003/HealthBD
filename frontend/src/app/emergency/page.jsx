'use client';

import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  Droplets, 
  Truck, 
  ShieldAlert, 
  Search, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Send, 
  Star 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchEmergencyHotlines, fetchBloodDonors, fetchAmbulances, submitBloodRequest, bookAmbulance } from '../../lib/api';

export default function EmergencyPage() {
  const [activeTab, setActiveTab] = useState('donors');
  const [bloodGroupFilter, setBloodGroupFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [hotlines, setHotlines] = useState([]);
  const [donors, setDonors] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showBloodModal, setShowBloodModal] = useState(false);
  const [showAmbulanceModal, setShowAmbulanceModal] = useState(false);

  const [bloodForm, setBloodForm] = useState({
    patientName: '',
    bloodGroup: 'O+',
    unitsNeeded: 1,
    hospitalName: '',
    district: 'Dhaka',
    contactPhone: '',
    urgencyLevel: 'Immediate (Within 2 Hours)'
  });

  const [ambulanceForm, setAmbulanceForm] = useState({
    senderName: '',
    pickupLocation: '',
    destination: '',
    phone: '',
    ambulanceType: 'ICU Ambulance'
  });

  const [notification, setNotification] = useState(null);

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const districts = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tab = urlParams.get('tab');
      const bg = urlParams.get('bloodGroup');
      if (tab) setActiveTab(tab);
      if (bg) setBloodGroupFilter(bg);
    }
  }, []);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [hotlineRes, donorRes, ambRes] = await Promise.all([
          fetchEmergencyHotlines(),
          fetchBloodDonors({ bloodGroup: bloodGroupFilter, district: districtFilter }),
          fetchAmbulances({ district: districtFilter })
        ]);

        if (hotlineRes.success) setHotlines(hotlineRes.data || []);
        if (donorRes.success) setDonors(donorRes.data || []);
        if (ambRes.success) setAmbulances(ambRes.data || []);
      } catch (error) {
        console.error('Error loading emergency data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [bloodGroupFilter, districtFilter]);

  const handleBloodSubmit = async (e) => {
    e.preventDefault();
    const res = await submitBloodRequest(bloodForm);
    if (res.success) {
      setNotification({ type: 'success', text: res.message });
      setShowBloodModal(false);
      setBloodForm({
        patientName: '',
        bloodGroup: 'O+',
        unitsNeeded: 1,
        hospitalName: '',
        district: 'Dhaka',
        contactPhone: '',
        urgencyLevel: 'Immediate (Within 2 Hours)'
      });
    } else {
      setNotification({ type: 'error', text: res.message || 'Failed to submit request.' });
    }
  };

  const handleAmbulanceSubmit = async (e) => {
    e.preventDefault();
    const res = await bookAmbulance(ambulanceForm);
    if (res.success) {
      setNotification({ type: 'success', text: res.message });
      setShowAmbulanceModal(false);
      setAmbulanceForm({
        senderName: '',
        pickupLocation: '',
        destination: '',
        phone: '',
        ambulanceType: 'ICU Ambulance'
      });
    } else {
      setNotification({ type: 'error', text: res.message || 'Failed to book ambulance.' });
    }
  };

  const filteredDonors = donors.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pb-20">
      
      {/* Hero Header Banner */}
      <div className="relative bg-gradient-to-br from-rose-700 via-red-600 to-amber-700 dark:from-rose-950 dark:via-red-950 dark:to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-rose-600/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-rose-900/40 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-rose-100 border border-white/20">
              <ShieldAlert className="w-4 h-4 text-rose-200" />
              <span>Lifesaving Emergency Network</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              24/7 Emergency & Blood Donor Hub
            </h1>
            <p className="text-rose-100 text-base sm:text-lg">
              Find verified blood donors instantly in your area, contact round-the-clock emergency medical hotlines, or request urgent ICU ambulance services.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowBloodModal(true)}
              className="flex items-center justify-center space-x-2 bg-white text-rose-700 hover:bg-rose-50 font-extrabold px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-0.5 text-sm cursor-pointer"
            >
              <Droplets className="w-5 h-5 text-rose-600" />
              <span>Post Urgent Blood Request</span>
            </button>

            <button
              onClick={() => setShowAmbulanceModal(true)}
              className="flex items-center justify-center space-x-2 bg-rose-900/60 hover:bg-rose-900/80 border border-white/30 text-white font-bold px-6 py-3.5 rounded-2xl backdrop-blur-md transition text-sm cursor-pointer"
            >
              <Truck className="w-5 h-5 text-teal-300" />
              <span>Request Ambulance</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto px-4 mt-6"
          >
            <div className={`p-4 rounded-2xl flex items-center justify-between shadow-lg ${
              notification.type === 'success' 
                ? 'bg-emerald-500 text-white border border-emerald-400' 
                : 'bg-rose-500 text-white border border-rose-400'
            }`}>
              <div className="flex items-center space-x-3">
                {notification.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                <span className="font-bold text-sm sm:text-base">{notification.text}</span>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="p-1 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-wrap items-center justify-center border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-4 pb-2">
          <button
            onClick={() => setActiveTab('donors')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'donors'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Droplets className="w-4 h-4" />
            <span>Blood Donor Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('hotlines')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'hotlines'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency Hotlines</span>
          </button>

          <button
            onClick={() => setActiveTab('ambulance')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-extrabold transition-all cursor-pointer ${
              activeTab === 'ambulance'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Ambulance Services</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BLOOD DONORS DIRECTORY */}
      {activeTab === 'donors' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search donor name, area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-rose-500 font-medium"
                />
              </div>

              <div className="flex items-center space-x-2 w-full md:w-auto">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-500">District:</span>
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border-0 text-sm font-semibold focus:ring-2 focus:ring-rose-500 cursor-pointer"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Filter by Blood Group:
              </span>
              <div className="flex flex-wrap gap-2">
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBloodGroupFilter(bg)}
                    className={`px-4 py-2 rounded-xl text-xs font-extrabold transition cursor-pointer border ${
                      bloodGroupFilter === bg
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-500">Searching active blood donors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonors.map((donor) => (
                <div
                  key={donor._id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                        {donor.badge || 'Verified Donor'}
                      </span>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white mt-2">
                        {donor.name}
                      </h3>
                      <p className="text-xs text-slate-500 flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                        {donor.area}
                      </p>
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-600 to-red-700 text-white font-black text-xl flex flex-col items-center justify-center shadow-lg shadow-rose-600/30">
                      <span>{donor.bloodGroup}</span>
                      <span className="text-[9px] font-normal opacity-90">Type</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Last Donated:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{donor.lastDonated}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Total Donations:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{donor.donationsCount} Times</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center space-x-3">
                    <a
                      href={`tel:${donor.phone}`}
                      className="flex-1 flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-2xl text-xs shadow-md transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Donor</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: EMERGENCY HOTLINES */}
      {activeTab === 'hotlines' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotlines.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.category}
                  </span>
                  <PhoneCall className="w-5 h-5 text-rose-500 animate-pulse" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`tel:${item.number}`}
                    className="flex items-center justify-between w-full bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 p-3.5 rounded-2xl text-rose-600 dark:text-rose-300 font-extrabold text-lg transition"
                  >
                    <span>{item.number}</span>
                    <span className="text-xs bg-rose-600 text-white px-3 py-1 rounded-full">
                      Tap to Call
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AMBULANCE SERVICES */}
      {activeTab === 'ambulance' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ambulances.map((amb) => (
              <div
                key={amb._id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800">
                      {amb.type}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white mt-2">
                      {amb.providerName}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {amb.district} District Coverage
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl text-amber-600 dark:text-amber-400 font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{amb.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <a
                    href={`tel:${amb.hotline}`}
                    className="flex-1 flex items-center justify-center space-x-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl text-xs transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                    <span>Direct Call</span>
                  </a>
                  <button
                    onClick={() => {
                      setAmbulanceForm(prev => ({ ...prev, ambulanceType: amb.type }));
                      setShowAmbulanceModal(true);
                    }}
                    className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-2xl text-xs shadow-md transition cursor-pointer"
                  >
                    Book Online
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL 1: REQUEST BLOOD FORM */}
      {showBloodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowBloodModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Post Urgent Blood Request</h3>
                <p className="text-xs text-slate-500">Notify active voluntary blood donors immediately</p>
              </div>
            </div>

            <form onSubmit={handleBloodSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahim Chowdhury"
                  value={bloodForm.patientName}
                  onChange={(e) => setBloodForm({ ...bloodForm, patientName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Blood Group Required</label>
                  <select
                    value={bloodForm.bloodGroup}
                    onChange={(e) => setBloodForm({ ...bloodForm, bloodGroup: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-rose-500"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Bags / Units Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={bloodForm.unitsNeeded}
                    onChange={(e) => setBloodForm({ ...bloodForm, unitsNeeded: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Hospital Name & Location</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Square Hospital, Dhaka"
                    value={bloodForm.hospitalName}
                    onChange={(e) => setBloodForm({ ...bloodForm, hospitalName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={bloodForm.contactPhone}
                    onChange={(e) => setBloodForm({ ...bloodForm, contactPhone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Submit Blood Request</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: BOOK AMBULANCE FORM */}
      {showAmbulanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setShowAmbulanceModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Emergency Ambulance Dispatch</h3>
                <p className="text-xs text-slate-500">Direct booking request to nearest dispatch center</p>
              </div>
            </div>

            <form onSubmit={handleAmbulanceSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={ambulanceForm.senderName}
                  onChange={(e) => setAmbulanceForm({ ...ambulanceForm, senderName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 mb-1">Pickup Address / Location</label>
                <input
                  type="text"
                  required
                  placeholder="House/Road no, Area, City"
                  value={ambulanceForm.pickupLocation}
                  onChange={(e) => setAmbulanceForm({ ...ambulanceForm, pickupLocation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Destination Hospital</label>
                  <input
                    type="text"
                    placeholder="Hospital Name"
                    value={ambulanceForm.destination}
                    onChange={(e) => setAmbulanceForm({ ...ambulanceForm, destination: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="017XXXXXXXX"
                    value={ambulanceForm.phone}
                    onChange={(e) => setAmbulanceForm({ ...ambulanceForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border-0 text-sm focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm rounded-2xl shadow-lg transition cursor-pointer flex items-center justify-center space-x-2 mt-4"
              >
                <Truck className="w-4 h-4" />
                <span>Confirm Ambulance Request</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
