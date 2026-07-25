import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const router = Router();

// POST /api/appointments - Book appointment
router.post('/', async (req, res) => {
  try {
    const db = getDb();
    const { doctorId, doctorName, specialty, hospital, patientName, patientPhone, patientEmail, appointmentDate, appointmentTime, notes } = req.body;

    if (!doctorId || !patientName || !patientPhone || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ success: false, message: 'Please provide all required appointment details.' });
    }

    const newAppointment = {
      doctorId: ObjectId.isValid(doctorId) ? new ObjectId(doctorId) : doctorId,
      doctorName,
      specialty,
      hospital,
      patientName,
      patientPhone,
      patientEmail,
      appointmentDate,
      appointmentTime,
      notes: notes || '',
      status: 'Confirmed',
      bookingId: 'HBD-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date()
    };

    const result = await db.collection('appointments').insertOne(newAppointment);
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      data: { ...newAppointment, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, message: 'Server error booking appointment' });
  }
});

// GET /api/appointments - Fetch user appointments
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { email, phone } = req.query;

    const filter = {};
    if (email) filter.patientEmail = email;
    if (phone) filter.patientPhone = phone;

    const appointments = await db.collection('appointments').find(filter).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Server error fetching appointments' });
  }
});

export default router;
