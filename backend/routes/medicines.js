import express from 'express';

const router = express.Router();

// Mock Comprehensive Bangladesh Medicine Directory
const medicinesList = [
  {
    id: 'med-01',
    brandName: 'Napa Extra',
    genericName: 'Paracetamol + Caffeine',
    strength: '500 mg + 65 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Beximco Pharmaceuticals Ltd.',
    category: 'Analgesic & Antipyretic',
    pricePerUnit: '৳3.00',
    packSize: 'Strip of 10 tablets',
    indications: 'Fever, headache, migraine, toothache, muscle aches, and general pain relief.',
    adultDosage: '1-2 tablets every 4-6 hours as needed; do not exceed 8 tablets in 24 hours.',
    sideEffects: 'Mild nausea, restlessness from caffeine. Excessive dosage risks liver toxicity.',
    isOTC: true
  },
  {
    id: 'med-02',
    brandName: 'Seclo 20',
    genericName: 'Omeprazole',
    strength: '20 mg',
    dosageForm: 'Capsule',
    manufacturer: 'Square Pharmaceuticals PLC',
    category: 'Anti-ulcerant & PPI',
    pricePerUnit: '৳7.00',
    packSize: 'Strip of 10 capsules',
    indications: 'Gastric ulcer, GERD (acid reflux), erosive esophagitis, heartburn, and Zollinger-Ellison syndrome.',
    adultDosage: '1 capsule once daily before breakfast, or as prescribed by a physician.',
    sideEffects: 'Abdominal headache, mild diarrhea, flatulence, nausea, dizziness.',
    isOTC: false
  },
  {
    id: 'med-03',
    brandName: 'Sergel 20',
    genericName: 'Esomeprazole Magnesium Trihydrate',
    strength: '20 mg',
    dosageForm: 'Tablet (Delayed Release)',
    manufacturer: 'Healthcare Pharmaceuticals Ltd.',
    category: 'Anti-ulcerant & PPI',
    pricePerUnit: '৳9.00',
    packSize: 'Box of 60 tablets',
    indications: 'Acid-peptic disorder, severe gastroesophageal reflux, healing of erosive esophagitis.',
    adultDosage: '20 mg or 40 mg once daily, taken 30-60 minutes before meals.',
    sideEffects: 'Headache, dry mouth, constipation, abdominal discomfort.',
    isOTC: false
  },
  {
    id: 'med-04',
    brandName: 'Monas 10',
    genericName: 'Montelukast Sodium',
    strength: '10 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Acme Laboratories Ltd.',
    category: 'Respiratory & Antiasthmatic',
    pricePerUnit: '৳17.50',
    packSize: 'Strip of 10 tablets',
    indications: 'Prophylaxis and chronic treatment of bronchial asthma, relief of allergic rhinitis symptoms.',
    adultDosage: '10 mg once daily taken in the evening with or without food.',
    sideEffects: 'Upper respiratory infection, fever, headache, abdominal pain.',
    isOTC: false
  },
  {
    id: 'med-05',
    brandName: 'Ciprocin 500',
    genericName: 'Ciprofloxacin Hydrochloride',
    strength: '500 mg',
    dosageForm: 'Film Coated Tablet',
    manufacturer: 'Square Pharmaceuticals PLC',
    category: 'Antibiotic (Fluoroquinolone)',
    pricePerUnit: '৳15.00',
    packSize: 'Box of 30 tablets',
    indications: 'Urinary tract infections (UTI), enteric fever (typhoid), infectious diarrhea, and bone infections.',
    adultDosage: '500 mg twice daily every 12 hours for 5 to 7 days.',
    sideEffects: 'Nausea, diarrhea, tendon discomfort, photosensitivity. Complete full prescribed course.',
    isOTC: false
  },
  {
    id: 'med-06',
    brandName: 'Fexo 120',
    genericName: 'Fexofenadine Hydrochloride',
    strength: '120 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Square Pharmaceuticals PLC',
    category: 'Antihistamine (Non-sedating)',
    pricePerUnit: '৳9.00',
    packSize: 'Strip of 10 tablets',
    indications: 'Seasonal allergic rhinitis (sneezing, runny nose, itchy throat), chronic idiopathic urticaria.',
    adultDosage: '120 mg once daily with water. Avoid taking with fruit juices (grapefruit/orange).',
    sideEffects: 'Very low incidence of drowsiness, mild headache, fatigue.',
    isOTC: true
  },
  {
    id: 'med-07',
    brandName: 'Comet 500',
    genericName: 'Metformin Hydrochloride',
    strength: '500 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Square Pharmaceuticals PLC',
    category: 'Antidiabetic (Biguanide)',
    pricePerUnit: '৳4.50',
    packSize: 'Strip of 10 tablets',
    indications: 'Type 2 diabetes mellitus glycemic control as monotherapy or with other oral agents.',
    adultDosage: '500 mg 1-2 times daily with meals to minimize gastrointestinal discomfort.',
    sideEffects: 'Metallic taste, diarrhea, abdominal cramps, loss of appetite.',
    isOTC: false
  },
  {
    id: 'med-08',
    brandName: 'Rostab 10',
    genericName: 'Rosuvastatin Calcium',
    strength: '10 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Incepta Pharmaceuticals Ltd.',
    category: 'Cardiovascular & Statin',
    pricePerUnit: '৳22.00',
    packSize: 'Strip of 10 tablets',
    indications: 'Hypercholesterolemia, primary dyslipidemia, reduction of cardiovascular event risk.',
    adultDosage: '5-10 mg once daily at any time of day, with or without food.',
    sideEffects: 'Myalgia, headache, asthenia, abdominal pain, mild transaminase elevation.',
    isOTC: false
  },
  {
    id: 'med-09',
    brandName: 'Angilock 50',
    genericName: 'Losartan Potassium',
    strength: '50 mg',
    dosageForm: 'Tablet',
    manufacturer: 'Square Pharmaceuticals PLC',
    category: 'Antihypertensive (ARB)',
    pricePerUnit: '৳8.00',
    packSize: 'Strip of 10 tablets',
    indications: 'Essential hypertension, nephropathy in type 2 diabetic patients with proteinuria.',
    adultDosage: '50 mg once daily; physician may titrate up to 100 mg daily.',
    sideEffects: 'Dizziness, hypotension, hyperkalemia. Avoid in pregnancy.',
    isOTC: false
  },
  {
    id: 'med-10',
    brandName: 'Zithrin 500',
    genericName: 'Azithromycin Dihydrate',
    strength: '500 mg',
    dosageForm: 'Capsule',
    manufacturer: 'Beximco Pharmaceuticals Ltd.',
    category: 'Antibiotic (Macrolide)',
    pricePerUnit: '৳35.00',
    packSize: 'Box of 6 capsules',
    indications: 'Upper & lower respiratory tract infections, tonsillitis, sinusitis, skin infections.',
    adultDosage: '500 mg once daily for 3 to 5 consecutive days, 1 hour before or 2 hours after food.',
    sideEffects: 'Gastrointestinal upset, diarrhea, nausea, transient liver enzymes elevation.',
    isOTC: false
  },
  {
    id: 'med-11',
    brandName: 'Bextram Gold',
    genericName: 'Multivitamins & Minerals with Antioxidants',
    strength: '32 Essential Vitamins & Minerals',
    dosageForm: 'Tablet',
    manufacturer: 'Beximco Pharmaceuticals Ltd.',
    category: 'Vitamins & Supplements',
    pricePerUnit: '৳7.50',
    packSize: 'Bottle of 30 tablets',
    indications: 'Prevention and treatment of vitamin & mineral deficiencies, general vitality, immunity boost.',
    adultDosage: '1 tablet daily after main meal or as advised by a doctor.',
    sideEffects: 'Mild stomach upset if taken on an empty stomach. Urine may turn bright yellow due to B2.',
    isOTC: true
  },
  {
    id: 'med-12',
    brandName: 'D-Rise 40000',
    genericName: 'Cholecalciferol (Vitamin D3)',
    strength: '40,000 IU',
    dosageForm: 'Soft Gelatin Capsule',
    manufacturer: 'Incepta Pharmaceuticals Ltd.',
    category: 'Vitamins & Supplements',
    pricePerUnit: '৳45.00',
    packSize: 'Box of 8 capsules',
    indications: 'Treatment and prevention of Vitamin D deficiency, osteoporosis, bone mineralization support.',
    adultDosage: '1 capsule weekly or bi-weekly according to physician instruction.',
    sideEffects: 'Hypercalcemia if overdosed. Safe when consumed according to medical guidelines.',
    isOTC: false
  }
];

// GET /api/medicines
router.get('/', (req, res) => {
  const { search, category, manufacturer, isOTC } = req.query;
  let results = [...medicinesList];

  if (search) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      m => m.brandName.toLowerCase().includes(q) ||
           m.genericName.toLowerCase().includes(q) ||
           m.indications.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    results = results.filter(m => m.category.toLowerCase().includes(category.toLowerCase()));
  }

  if (manufacturer && manufacturer !== 'All') {
    results = results.filter(m => m.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()));
  }

  if (isOTC !== undefined && isOTC !== '') {
    const otcBool = isOTC === 'true';
    results = results.filter(m => m.isOTC === otcBool);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/medicines/categories
router.get('/categories', (req, res) => {
  const categories = Array.from(new Set(medicinesList.map(m => m.category)));
  res.json({
    success: true,
    data: ['All', ...categories]
  });
});

// GET /api/medicines/:id
router.get('/:id', (req, res) => {
  const med = medicinesList.find(m => m.id === req.params.id);
  if (!med) {
    return res.status(404).json({ success: false, message: 'Medicine not found' });
  }
  res.json({ success: true, data: med });
});

export default router;
