import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../config/db.js';

const router = Router();

// GET /api/doctors
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { search, specialty, city, hospital, maxFee, gender, isFeatured, sortBy } = req.query;

    const filter = {};

    if (specialty && specialty !== 'All') {
      filter.specialty = { $regex: new RegExp(specialty, 'i') };
    }

    if (city && city !== 'All') {
      filter.city = { $regex: new RegExp(city, 'i') };
    }

    if (hospital && hospital !== 'All') {
      filter.hospital = { $regex: new RegExp(hospital, 'i') };
    }

    if (gender && gender !== 'All') {
      filter.gender = gender;
    }

    if (isFeatured === 'true') {
      filter.isFeatured = true;
    }

    if (maxFee) {
      filter.fee = { $lte: Number(maxFee) };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { name: searchRegex },
        { specialty: searchRegex },
        { hospital: searchRegex },
        { city: searchRegex },
        { title: searchRegex },
        { degree: searchRegex }
      ];
    }

    let sortOptions = { rating: -1 };
    if (sortBy === 'fee_asc') {
      sortOptions = { fee: 1 };
    } else if (sortBy === 'fee_desc') {
      sortOptions = { fee: -1 };
    } else if (sortBy === 'experience') {
      sortOptions = { experienceYears: -1 };
    } else if (sortBy === 'rating') {
      sortOptions = { rating: -1 };
    }

    const doctors = await db.collection('doctors').find(filter).sort(sortOptions).toArray();
    res.json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ success: false, message: 'Server error fetching doctors' });
  }
});

// GET /api/doctors/:id
router.get('/:id', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid doctor ID format' });
    }

    const doctor = await db.collection('doctors').findOne({ _id: new ObjectId(id) });

    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    res.json({ success: true, data: doctor });
  } catch (error) {
    console.error('Error fetching doctor details:', error);
    res.status(500).json({ success: false, message: 'Server error fetching doctor details' });
  }
});

export default router;
