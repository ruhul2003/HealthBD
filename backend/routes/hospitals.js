import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const router = Router();

// GET /api/hospitals
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { search, city } = req.query;

    const filter = {};

    if (city && city !== 'All') {
      filter.city = { $regex: new RegExp(city, 'i') };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { address: searchRegex },
        { city: searchRegex },
        { departments: searchRegex }
      ];
    }

    const hospitals = await db.collection('hospitals').find(filter).sort({ rating: -1 }).toArray();
    res.json({ success: true, count: hospitals.length, data: hospitals });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ success: false, message: 'Server error fetching hospitals' });
  }
});

// GET /api/hospitals/:id
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid hospital ID format' });
    }

    const hospital = await db.collection('hospitals').findOne({ _id: new ObjectId(id) });

    if (!hospital) {
      return res.status(404).json({ success: false, message: 'Hospital not found' });
    }

    // Fetch doctors working in this hospital
    const affiliatedDoctors = await db.collection('doctors').find({
      hospital: { $regex: new RegExp(hospital.name.split(' ')[0], 'i') }
    }).toArray();

    res.json({ success: true, data: { ...hospital, doctors: affiliatedDoctors } });
  } catch (error) {
    console.error('Error fetching hospital details:', error);
    res.status(500).json({ success: false, message: 'Server error fetching hospital details' });
  }
});

export default router;
