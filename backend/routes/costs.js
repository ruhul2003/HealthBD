import { Router } from 'express';
import { getDb } from '../config/db.js';

const router = Router();

// GET /api/costs
router.get('/', async (req, res) => {
  try {
    const db = getDb();
    const { category, search } = req.query;

    const filter = {};

    if (category && category !== 'All') {
      filter.category = { $regex: new RegExp(category, 'i') };
    }

    if (search) {
      const searchRegex = new RegExp(search, 'i');
      filter.$or = [
        { procedureName: searchRegex },
        { category: searchRegex },
        { description: searchRegex }
      ];
    }

    const costs = await db.collection('costs').find(filter).sort({ procedureName: 1 }).toArray();
    res.json({ success: true, count: costs.length, data: costs });
  } catch (error) {
    console.error('Error fetching cost estimations:', error);
    res.status(500).json({ success: false, message: 'Server error fetching treatment costs' });
  }
});

export default router;
