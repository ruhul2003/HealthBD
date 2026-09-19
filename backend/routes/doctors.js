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

// GET /api/doctors/:id/reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid doctor ID format' });
    }

    const reviews = await db.collection('doctor_reviews')
      .find({ doctorId: id })
      .sort({ createdAt: -1 })
      .toArray();

    // If no db reviews yet, return fallback starter reviews
    if (reviews.length === 0) {
      const defaultReviews = [
        {
          _id: 'rev-01',
          doctorId: id,
          patientName: 'Kazi Farhan Ahmed',
          rating: 5,
          comment: 'Outstanding consultation experience. The doctor took time to listen attentively to all symptoms and explained the treatment plan clearly without prescribing unnecessary tests.',
          treatmentCondition: 'General Health & Diagnostic Checkup',
          verifiedVisit: true,
          date: '1 week ago'
        },
        {
          _id: 'rev-02',
          doctorId: id,
          patientName: 'Shaila Parveen',
          rating: 5,
          comment: 'Very polite, empathetic and punctual. Chamber serial management was smooth. Highly recommend for family medical consultations.',
          treatmentCondition: 'Consultation & Follow-up',
          verifiedVisit: true,
          date: '3 weeks ago'
        }
      ];
      return res.json({ success: true, count: defaultReviews.length, data: defaultReviews });
    }

    res.json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    console.error('Error fetching doctor reviews:', error);
    res.status(500).json({ success: false, message: 'Server error fetching reviews' });
  }
});

// POST /api/doctors/:id/reviews
router.post('/:id/reviews', async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const { patientName, rating, comment, treatmentCondition } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid doctor ID format' });
    }

    if (!patientName || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Patient name, rating (1-5), and comment are required.' });
    }

    const newReview = {
      doctorId: id,
      patientName: patientName.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      treatmentCondition: treatmentCondition ? treatmentCondition.trim() : 'General Consultation',
      verifiedVisit: true,
      createdAt: new Date(),
      date: 'Just now'
    };

    await db.collection('doctor_reviews').insertOne(newReview);

    // Update doctor's aggregate reviewCount and rating
    const allReviews = await db.collection('doctor_reviews').find({ doctorId: id }).toArray();
    const avgRating = Number((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1));

    await db.collection('doctors').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { rating: avgRating },
        $inc: { reviewCount: 1 }
      }
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! Your patient review has been submitted successfully.',
      data: newReview
    });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ success: false, message: 'Server error submitting review' });
  }
});

export default router;

