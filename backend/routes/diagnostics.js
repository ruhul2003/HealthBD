import express from 'express';

const router = express.Router();

// Mock Diagnostic Tests & Investigations Database
const diagnosticTests = [
  {
    id: 'diag-01',
    name: 'Complete Blood Count (CBC) with ESR',
    category: 'Hematology & Pathology',
    sampleType: 'Whole Blood (EDTA tube)',
    fastingRequired: false,
    turnaroundHours: '4 - 6 hours',
    description: 'Measures red blood cells, white blood cells, hemoglobin, platelets, and ESR to diagnose anemia, infection, and leukemias.',
    avgCost: '৳450',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳400' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳450' },
      { labName: 'Labaid Diagnostic', price: '৳500' },
      { labName: 'Square Hospital Diagnostics', price: '৳700' }
    ],
    preparation: 'No special diet or fasting needed. Stay hydrated.'
  },
  {
    id: 'diag-02',
    name: 'HbA1c (Glycated Hemoglobin)',
    category: 'Biochemistry & Diabetes',
    sampleType: 'Venous Blood',
    fastingRequired: false,
    turnaroundHours: '4 - 6 hours',
    description: 'Gold standard test evaluating average blood glucose levels over the past 2 to 3 months for diabetes diagnosis and monitoring.',
    avgCost: '৳850',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳800' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳850' },
      { labName: 'Labaid Diagnostic', price: '৳950' },
      { labName: 'Evercare Hospital Diagnostic', price: '৳1,200' }
    ],
    preparation: 'Can be taken at any time of day regardless of meal intake.'
  },
  {
    id: 'diag-03',
    name: 'Lipid Profile (Fasting)',
    category: 'Biochemistry & Cardiology',
    sampleType: 'Serum Blood',
    fastingRequired: true,
    turnaroundHours: '6 - 8 hours',
    description: 'Measures Total Cholesterol, Triglycerides, HDL (good), LDL (bad), and VLDL to assess cardiovascular risk.',
    avgCost: '৳1,100',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳1,000' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳1,050' },
      { labName: 'Labaid Diagnostic', price: '৳1,200' },
      { labName: 'United Hospital Lab', price: '৳1,600' }
    ],
    preparation: 'Strict overnight fasting of 10 to 12 hours is mandatory. Plain water is permitted.'
  },
  {
    id: 'diag-04',
    name: 'Serum Creatinine with eGFR',
    category: 'Biochemistry & Renal',
    sampleType: 'Serum Blood',
    fastingRequired: false,
    turnaroundHours: '3 - 5 hours',
    description: 'Primary clinical indicator of kidney filtration capacity and early detection of chronic kidney disease.',
    avgCost: '৳450',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳400' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳450' },
      { labName: 'Labaid Diagnostic', price: '৳500' },
      { labName: 'Square Hospital Diagnostics', price: '৳650' }
    ],
    preparation: 'Avoid strenuous heavy weight training or excess cooked red meat 24 hours prior.'
  },
  {
    id: 'diag-05',
    name: 'Thyroid Panel (TSH, Free T3, Free T4)',
    category: 'Endocrinology & Hormones',
    sampleType: 'Serum Blood',
    fastingRequired: false,
    turnaroundHours: '8 - 12 hours',
    description: 'Comprehensive hormonal assessment for hypothyroidism, hyperthyroidism, goiter, and metabolic sluggishness.',
    avgCost: '৳1,800',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳1,650' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳1,750' },
      { labName: 'Labaid Diagnostic', price: '৳1,950' },
      { labName: 'Apollo/Evercare Hospital', price: '৳2,400' }
    ],
    preparation: 'Recommended to take early morning before taking thyroid replacement medication.'
  },
  {
    id: 'diag-06',
    name: 'Ultrasonography (USG) of Whole Abdomen',
    category: 'Radiology & Imaging',
    sampleType: 'Ultrasound Scan',
    fastingRequired: true,
    turnaroundHours: '1 - 2 hours (Immediate Report)',
    description: 'High-frequency sound waves imaging liver, gallbladder (stones), kidneys, spleen, pancreas, urinary bladder, and prostate/uterus.',
    avgCost: '৳2,000',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳1,800' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳2,000' },
      { labName: 'Labaid Diagnostic', price: '৳2,200' },
      { labName: 'Square Hospital Diagnostics', price: '৳3,000' }
    ],
    preparation: '6 hours fasting required for gallbladder distension. Full urinary bladder required.'
  },
  {
    id: 'diag-07',
    name: 'Digital Chest X-Ray (P/A View)',
    category: 'Radiology & Imaging',
    sampleType: 'Digital X-Ray Film & CD',
    fastingRequired: false,
    turnaroundHours: '1 - 2 hours',
    description: 'Evaluates lungs for pneumonia, tuberculosis (TB), pleural effusion, bronchitis, and cardiomegaly.',
    avgCost: '৳650',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳600' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳650' },
      { labName: 'Labaid Diagnostic', price: '৳750' },
      { labName: 'BIRDEM Diagnostic', price: '৳600' }
    ],
    preparation: 'Remove all metallic jewelry, necklaces, and metal buttons around chest area.'
  },
  {
    id: 'diag-08',
    name: 'Echocardiography with Color Doppler (2D Echo)',
    category: 'Cardiology Investigations',
    sampleType: 'Ultrasound of Heart',
    fastingRequired: false,
    turnaroundHours: '2 hours',
    description: 'Detailed visualization of heart chamber size, heart muscle pumping efficiency (Ejection Fraction / EF%), and valve function.',
    avgCost: '৳2,500',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳2,200' },
      { labName: 'National Heart Foundation', price: '৳1,500' },
      { labName: 'Ibn Sina Cardiac Centre', price: '৳2,500' },
      { labName: 'Labaid Cardiac Hospital', price: '৳3,200' }
    ],
    preparation: 'No fasting needed. Wear comfortable buttoned clothing.'
  },
  {
    id: 'diag-09',
    name: 'Dengue NS1 Antigen & Antibody (IgG/IgM)',
    category: 'Infectious Disease & Serology',
    sampleType: 'Venous Blood',
    fastingRequired: false,
    turnaroundHours: '2 - 3 hours',
    description: 'Rapid confirmation for acute Dengue viral infection during febrile illness.',
    avgCost: '৳500',
    labPrices: [
      { labName: 'Popular Diagnostic Centre', price: '৳400' },
      { labName: 'Ibn Sina Diagnostic & Consultation Centre', price: '৳400' },
      { labName: 'Government Hospital Lab', price: '৳100' },
      { labName: 'Labaid Diagnostic', price: '৳500' }
    ],
    preparation: 'No fasting needed. Sample can be collected immediately upon fever onset.'
  }
];

// GET /api/diagnostics
router.get('/', (req, res) => {
  const { search, category, fastingRequired } = req.query;
  let results = [...diagnosticTests];

  if (search) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      t => t.name.toLowerCase().includes(q) ||
           t.category.toLowerCase().includes(q) ||
           t.description.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    results = results.filter(t => t.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (fastingRequired !== undefined && fastingRequired !== '') {
    const fastingBool = fastingRequired === 'true';
    results = results.filter(t => t.fastingRequired === fastingBool);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/diagnostics/categories
router.get('/categories', (req, res) => {
  const categories = Array.from(new Set(diagnosticTests.map(t => t.category)));
  res.json({
    success: true,
    data: ['All', ...categories]
  });
});

// GET /api/diagnostics/:id
router.get('/:id', (req, res) => {
  const test = diagnosticTests.find(t => t.id === req.params.id);
  if (!test) {
    return res.status(404).json({ success: false, message: 'Diagnostic test not found' });
  }
  res.json({ success: true, data: test });
});

// POST /api/diagnostics/book-test
router.post('/book-test', (req, res) => {
  const { testName, patientName, phone, preferredLab, sampleCollectionType, appointmentDate } = req.body;

  if (!testName || !patientName || !phone) {
    return res.status(400).json({ success: false, message: 'Test name, patient name, and phone number are required.' });
  }

  res.status(201).json({
    success: true,
    message: `Test booking inquiry for ${testName} confirmed! ${preferredLab || 'Diagnostic center'} will reach you at ${phone}.`,
    bookingDetails: {
      bookingRef: 'LAB-' + Math.floor(100000 + Math.random() * 900000),
      testName,
      patientName,
      phone,
      preferredLab: preferredLab || 'Any Nearby Accredited Lab',
      sampleCollectionType: sampleCollectionType || 'Walk-in Visit',
      appointmentDate: appointmentDate || new Date().toISOString().split('T')[0],
      status: 'Booking Initiated'
    }
  });
});

export default router;
