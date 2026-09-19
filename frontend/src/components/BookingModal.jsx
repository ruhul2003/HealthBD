'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, Loader2, Video, Building2 } from 'lucide-react';
import { bookAppointment } from '../lib/api';

export default function BookingModal({ doctor, isOpen, onClose }) {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(doctor?.timing ? doctor.timing.split(' - ')[0] : '5:00 PM');
  const [consultationType, setConsultationType] = useState('In-Person Chamber');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen || !doctor) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone || !appointmentDate) {
      setErrorMessage('Please fill in your name, phone number, and preferred date.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    const res = await bookAppointment({
      doctorId: doctor._id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      hospital: doctor.hospital,
      patientName,
      patientPhone,
      patientEmail,
      appointmentDate,
      appointmentTime,
      consultationType,
      notes
    });

    setSubmitting(false);

    if (res.success) {
      setSuccessResult(res.data);
    } else {
      setErrorMessage(res.message || 'Failed to book appointment.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-600 to-teal-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <p className="text-xs uppercase font-extrabold tracking-wider text-sky-100">Appointment Booking</p>
          <h3 className="text-2xl font-bold mt-1">{doctor.name}</h3>
          <p className="text-sm text-sky-100">{doctor.title} • {doctor.specialty}</p>
        </div>

        {successResult ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/80 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Booking Confirmed!</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your appointment booking request has been confirmed. Below is your booking summary:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl text-left space-y-2 text-sm border border-slate-200 dark:border-slate-700">
              <p><strong className="text-slate-900 dark:text-white">Booking ID:</strong> <span className="text-sky-600 font-mono font-bold">{successResult.bookingId}</span></p>
              <p><strong className="text-slate-900 dark:text-white">Patient Name:</strong> {successResult.patientName}</p>
              <p><strong className="text-slate-900 dark:text-white">Consultation Mode:</strong> <span className="text-sky-600 font-bold">{successResult.consultationType}</span></p>
              <p><strong className="text-slate-900 dark:text-white">Location / Chamber:</strong> {successResult.consultationType === 'Online Video Consultation' ? 'Online Telehealth Video Room' : doctor.hospital}</p>
              <p><strong className="text-slate-900 dark:text-white">Date & Time:</strong> {successResult.appointmentDate} at {successResult.appointmentTime}</p>
              <p><strong className="text-slate-900 dark:text-white">Consultation Fee:</strong> ৳{doctor.fee} BDT</p>
              {successResult.videoConsultationLink && (
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 mb-1">Encrypted Telehealth Video Consultation Link:</p>
                  <a
                    href={successResult.videoConsultationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500 transition"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Video Room Link</span>
                  </a>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {errorMessage && (
              <div className="flex items-center space-x-2 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 text-rose-600 dark:text-rose-400 p-3 rounded-2xl text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Consultation Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">Select Consultation Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConsultationType('In-Person Chamber')}
                  className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                    consultationType === 'In-Person Chamber'
                      ? 'bg-sky-50 dark:bg-sky-950/80 border-sky-500 text-sky-700 dark:text-sky-300 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Chamber Visit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('Online Video Consultation')}
                  className={`flex items-center justify-center space-x-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                    consultationType === 'Online Video Consultation'
                      ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-500 text-teal-700 dark:text-teal-300 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Video Telehealth</span>
                </button>
              </div>
            </div>

            {/* Chamber / Telemedicine Info */}
            <div className="bg-sky-50 dark:bg-sky-950/40 p-3 rounded-2xl border border-sky-200 dark:border-sky-800/60 text-xs space-y-1">
              <p className="font-bold text-sky-900 dark:text-sky-200">
                {consultationType === 'Online Video Consultation' ? 'Online Telemedicine HD Video Chamber' : `Chamber: ${doctor.hospital}`}
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                {consultationType === 'Online Video Consultation' ? 'Connect live with the doctor via encrypted video from anywhere in Bangladesh.' : doctor.hospitalAddress}
              </p>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">Consultation Fee: ৳{doctor.fee} BDT</p>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Patient Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rafiqul Islam"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="01711XXXXXX"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    placeholder="patient@gmail.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Appointment Date *</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none cursor-pointer"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Time Slot</label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none cursor-pointer"
                  >
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="8:00 PM">8:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Chief Symptom / Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Describe your health problem or symptoms..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-sky-600/30 flex items-center justify-center space-x-2 transition disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Booking...</span>
                  </>
                ) : (
                  <span>Confirm Appointment Booking</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
