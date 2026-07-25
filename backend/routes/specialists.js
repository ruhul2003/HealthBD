import { Router } from 'express';
import { getDb } from '../config/db.js';

const router = Router();

// GET /api/specialists
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const specialists = await db.collection('specialists').find({}).toArray();
    res.json({ success: true, count: specialists.length, data: specialists });
  } catch (error) {
    console.error('Error fetching specialists:', error);
    res.status(500).json({ success: false, message: 'Server error fetching specialists' });
  }
});

export default router;
