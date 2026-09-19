'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  Building2, 
  Video, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Phone,
  FileText,
  X
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { fetchAppointments, cancelAppointment } from '../../lib/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const query = user?.email ? { email: user.email } : {};
    const res = await fetchAppointments(query);
    setAppointments(res.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment consultation?')) return;
    const res = await cancelAppointment(id);
    if (res.success) {
      setStatusMessage('Appointment cancelled successfully.');
      loadData();
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'all') return true;
    if (activeTab === 'video') return apt.consultationType === 'Online Video Consultation';
    if (activeTab === 'chamber') return apt.consultationType !== 'Online Video Consultation';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 px-3 py-1 rounded-full border border-sky-200 dark:border-sky-800">
              Patient Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              My Appointments & Consultations
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Manage your doctor chamber appointments, telemedicine video sessions, and digital tokens.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-2xl shadow-md transition"
          >
            <span>Book New Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Filters */}
        <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {[
            { id: 'all', label: `All Consultations (${appointments.length})` },
            { id: 'chamber', label: 'Chamber Visits' },
            { id: 'video', label: 'Telehealth Video' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-36 bg-slate-200 dark:bg-slate-800/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No scheduled appointments found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You do not have any appointments under this view. Search our doctor directory to book your next chamber or video consultation.
            </p>
            <Link
              href="/doctors"
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-sky-600 text-white text-xs font-bold rounded-xl hover:bg-sky-700 transition"
            >
              <span>Explore Specialist Doctors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map(apt => (
              <div
                key={apt._id || apt.bookingId}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md">
                      Ref: {apt.bookingId}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      apt.consultationType === 'Online Video Consultation'
                        ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                        : 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                    }`}>
                      {apt.consultationType || 'In-Person Chamber'}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Confirmed
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {apt.doctorName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {apt.specialty} • {apt.hospital}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <span className="flex items-center space-x-1.5 font-semibold">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <span>{apt.appointmentDate}</span>
                    </span>
                    <span className="flex items-center space-x-1.5 font-semibold">
                      <Clock className="w-4 h-4 text-sky-600" />
                      <span>{apt.appointmentTime}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Patient: {apt.patientName}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2 shrink-0">
                  {apt.videoConsultationLink && (
                    <a
                      href={apt.videoConsultationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      <Video className="w-4 h-4" />
                      <span>Enter Telehealth Room</span>
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedSlip(apt)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>View Token Slip</span>
                  </button>

                  <button
                    onClick={() => handleCancel(apt._id)}
                    className="inline-flex items-center space-x-1 text-xs text-rose-600 dark:text-rose-400 hover:underline pt-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel Booking</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Digital Appointment Slip Modal */}
        {selectedSlip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
              <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-600">Official HealthBD Consultation Token</span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Appointment Slip</h3>
                </div>
                <button
                  onClick={() => setSelectedSlip(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Token Ref No:</span>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400 text-sm">{selectedSlip.bookingId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Consultant:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedSlip.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedSlip.specialty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Consultation Mode:</span>
                  <span className="font-bold text-teal-600 dark:text-teal-400">{selectedSlip.consultationType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Patient Name:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSlip.patientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Patient Contact:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedSlip.patientPhone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Scheduled Time:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedSlip.appointmentDate} at {selectedSlip.appointmentTime}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setSelectedSlip(null)}
                  className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
