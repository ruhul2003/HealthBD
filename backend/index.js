import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/db.js';

import doctorsRouter from './routes/doctors.js';
import hospitalsRouter from './routes/hospitals.js';
import specialistsRouter from './routes/specialists.js';
import costsRouter from './routes/costs.js';
import appointmentsRouter from './routes/appointments.js';
import emergencyRouter from './routes/emergency.js';
import medicinesRouter from './routes/medicines.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Root Health Check Route
app.get('/', (req, res) => {
  res.json({
    app: 'HealthBD API Server',
    status: 'Active',
    version: '1.0.0',
    endpoints: [
      '/api/doctors',
      '/api/hospitals',
      '/api/specialists',
      '/api/costs',
      '/api/appointments',
      '/api/emergency',
      '/api/medicines'
    ]
  });
});

// API Routes
app.use('/api/doctors', doctorsRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/specialists', specialistsRouter);
app.use('/api/costs', costsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/emergency', emergencyRouter);
app.use('/api/medicines', medicinesRouter);

// Database Connection & Server Initialization
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`🚀 HealthBD Backend Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start HealthBD server:', error);
    process.exit(1);
  }
}

startServer();
