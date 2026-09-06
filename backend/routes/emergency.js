import express from 'express';

const router = express.Router();

// Mock Blood Donors Data
const mockDonors = [
  {
    _id: 'bd1',
    name: 'Tanvir Hossain',
    bloodGroup: 'O+',
    district: 'Dhaka',
    area: 'Dhanmondi, Dhaka',
    phone: '+880 1711-223344',
    lastDonated: '2024-01-15',
    availabilityStatus: 'Available',
    donationsCount: 12,
    badge: 'Gold Donor'
  },
  {
    _id: 'bd2',
    name: 'Nusrat Jahan',
    bloodGroup: 'A+',
    district: 'Dhaka',
    area: 'Uttara, Dhaka',
    phone: '+880 1812-998877',
    lastDonated: '2023-11-20',
    availabilityStatus: 'Available',
    donationsCount: 8,
    badge: 'Silver Donor'
  },
  {
    _id: 'bd3',
    name: 'Sabbir Rahman',
    bloodGroup: 'B+',
    district: 'Chittagong',
    area: 'Agrabad, Chittagong',
    phone: '+880 1913-556677',
    lastDonated: '2024-02-01',
    availabilityStatus: 'Available',
    donationsCount: 15,
    badge: 'Star Donor'
  },
  {
    _id: 'bd4',
    name: 'Fariha Yasmin',
    bloodGroup: 'AB+',
    district: 'Dhaka',
    area: 'Mirpur 10, Dhaka',
    phone: '+880 1614-332211',
    lastDonated: '2023-10-10',
    availabilityStatus: 'Available',
    donationsCount: 5,
    badge: 'Regular Donor'
  },
  {
    _id: 'bd5',
    name: 'Kamrul Hasan',
    bloodGroup: 'O-',
    district: 'Sylhet',
    area: 'Zindabazar, Sylhet',
    phone: '+880 1715-778899',
    lastDonated: '2024-03-05',
    availabilityStatus: 'Available',
    donationsCount: 21,
    badge: 'Hero Donor'
  },
  {
    _id: 'bd6',
    name: 'Rakibul Islam',
    bloodGroup: 'A-',
    district: 'Rajshahi',
    area: 'Shaheb Bazar, Rajshahi',
    phone: '+880 1816-445566',
    lastDonated: '2023-12-18',
    availabilityStatus: 'Available',
    donationsCount: 9,
    badge: 'Silver Donor'
  },
  {
    _id: 'bd7',
    name: 'Mehedi Hasan',
    bloodGroup: 'B-',
    district: 'Dhaka',
    area: 'Mohakhali, Dhaka',
    phone: '+880 1917-112233',
    lastDonated: '2024-01-30',
    availabilityStatus: 'Available',
    donationsCount: 7,
    badge: 'Regular Donor'
  },
  {
    _id: 'bd8',
    name: 'Ayesha Siddiqua',
    bloodGroup: 'AB-',
    district: 'Chittagong',
    area: 'Halishahar, Chittagong',
    phone: '+880 1518-990011',
    lastDonated: '2023-09-25',
    availabilityStatus: 'Available',
    donationsCount: 11,
    badge: 'Gold Donor'
  }
];

// Mock Emergency Hotlines
const hotlines = [
  { id: '1', title: 'National Emergency Service', number: '999', description: 'Police, Fire Service, Ambulance', category: 'General', color: 'rose' },
  { id: '2', title: 'Health Call Center (IEPCR)', number: '16263', description: '24/7 Medical Advice & Health Support', category: 'Health', color: 'teal' },
  { id: '3', title: 'Institute of Epidemiology (IEDCR)', number: '10655', description: 'Disease Outbreak & Infection Control', category: 'Medical', color: 'sky' },
  { id: '4', title: 'Mental Health Helpline (Kaan Pete Roi)', number: '+880 1779-554391', description: 'Emotional support & Crisis Intervention', category: 'Mental Health', color: 'indigo' },
  { id: '5', title: 'Poison Information Center', number: '+880 2-9660015', description: 'Emergency Chemical & Poisoning Guidance', category: 'Specialized', color: 'amber' }
];

// Mock Ambulance Services
const ambulances = [
  {
    _id: 'amb1',
    providerName: 'Al-Markazul Islami Ambulance',
    type: 'ICU & Freezing Ambulance',
    district: 'Dhaka',
    hotline: '+880 9612-444333',
    ratePerKm: '৳50 / km',
    operating24h: true,
    rating: 4.9
  },
  {
    _id: 'amb2',
    providerName: 'Shomaj Sheba Ambulance Care',
    type: 'Standard AC Ambulance',
    district: 'Dhaka',
    hotline: '+880 1711-001122',
    ratePerKm: '৳40 / km',
    operating24h: true,
    rating: 4.7
  },
  {
    _id: 'amb3',
    providerName: 'Chittagong Medical Express',
    type: 'Emergency Life Support (ELS)',
    district: 'Chittagong',
    hotline: '+880 1819-334455',
    ratePerKm: '৳45 / km',
    operating24h: true,
    rating: 4.8
  },
  {
    _id: 'amb4',
    providerName: 'Sylhet Air & Ground Ambulance',
    type: 'Air & ICU Ambulance',
    district: 'Sylhet',
    hotline: '+880 1912-778899',
    ratePerKm: '৳60 / km',
    operating24h: true,
    rating: 5.0
  }
];

// GET /api/emergency/hotlines
router.get('/hotlines', (req, res) => {
  res.json({ success: true, data: hotlines });
});

// GET /api/emergency/donors
router.get('/donors', (req, res) => {
  const { bloodGroup, district } = req.query;
  let result = [...mockDonors];

  if (bloodGroup && bloodGroup !== 'All') {
    result = result.filter(d => d.bloodGroup.toUpperCase() === bloodGroup.toUpperCase());
  }

  if (district && district !== 'All') {
    result = result.filter(d => d.district.toLowerCase() === district.toLowerCase());
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/emergency/ambulances
router.get('/ambulances', (req, res) => {
  const { district } = req.query;
  let result = [...ambulances];

  if (district && district !== 'All') {
    result = result.filter(a => a.district.toLowerCase() === district.toLowerCase());
  }

  res.json({ success: true, count: result.length, data: result });
});

// POST /api/emergency/request-blood
router.post('/request-blood', (req, res) => {
  const { patientName, bloodGroup, hospitalName, contactPhone, unitsNeeded, urgencyLevel } = req.body;

  if (!patientName || !bloodGroup || !contactPhone) {
    return res.status(400).json({ success: false, message: 'Missing required fields for blood request.' });
  }

  res.status(201).json({
    success: true,
    message: `Blood request for ${unitsNeeded || 1} unit(s) of ${bloodGroup} registered successfully! Nearby donors will be notified.`,
    requestDetails: {
      requestId: 'REQ-' + Math.floor(100000 + Math.random() * 900000),
      patientName,
      bloodGroup,
      hospitalName,
      contactPhone,
      urgencyLevel: urgencyLevel || 'Immediate',
      createdAt: new Date().toISOString()
    }
  });
});

// POST /api/emergency/book-ambulance
router.post('/book-ambulance', (req, res) => {
  const { senderName, pickupLocation, destination, phone, ambulanceType } = req.body;

  if (!pickupLocation || !phone) {
    return res.status(400).json({ success: false, message: 'Pickup location and phone number are required.' });
  }

  res.status(201).json({
    success: true,
    message: `Ambulance dispatch request received for ${pickupLocation}. Dispatcher will call ${phone} immediately!`,
    bookingDetails: {
      bookingId: 'AMB-' + Math.floor(100000 + Math.random() * 900000),
      senderName,
      pickupLocation,
      destination,
      phone,
      ambulanceType: ambulanceType || 'Standard AC',
      status: 'Dispatching',
      createdAt: new Date().toISOString()
    }
  });
});

export default router;
