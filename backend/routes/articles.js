import express from 'express';

const router = express.Router();

// Mock Health Articles & Medical Knowledgebase Data
const articlesList = [
  {
    id: 'art-01',
    title: 'Dengue Fever Warning Signs, Hydration Protocol & When to Hospitalize',
    slug: 'dengue-fever-warning-signs-hydration-bangladesh',
    category: 'Infectious Disease',
    author: 'Prof. Dr. A. B. M. Abdullah',
    authorTitle: 'Senior Medicine Specialist',
    readTime: '5 min read',
    publishedDate: 'September 12, 2024',
    coverImage: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=80',
    summary: 'Essential emergency checklist for Dengue fever patients in Bangladesh. Critical fluid management guidelines and red-flag danger signs.',
    keyTakeaways: [
      'Avoid pain relievers like Aspirin, Ibuprofen, or Diclofenac—only Paracetamol is safe for Dengue.',
      'The critical phase occurs when fever drops (Days 3-7); this is when plasma leakage can cause Dengue Shock Syndrome.',
      'Maintain adequate fluid intake: coconut water (dab er pani), ORS (oral saline), clear soup, and lemon water.'
    ],
    content: `Dengue fever continues to be a severe public health challenge across urban and rural Bangladesh. While most patients recover with supportive home care, distinguishing between mild dengue and severe dengue shock syndrome is vital for saving lives.

### The Three Phases of Dengue
1. **Febrile Phase (Days 1 to 3):** High fever (103°F-105°F), severe retro-orbital headache, joint ache, and flushed skin.
2. **Critical Phase (Days 4 to 6):** As fever begins subsiding, watch vigilantly for plasma leakage. Capillary permeability peaks during these 24-48 hours.
3. **Convalescent Phase:** Appetite returns, rash fades, and platelet counts normalize spontaneously.

### Immediate Danger Signs Requiring Emergency ER Admission
- Persistent vomiting (inability to retain fluids)
- Severe persistent abdominal pain
- Bleeding from gums, nose, or black stools
- Extreme lethargy, confusion, or cold clammy extremities
- Sudden drop in urine output for more than 6 hours`
  },
  {
    id: 'art-02',
    title: 'Managing Type 2 Diabetes with a Traditional Bangladeshi Diet',
    slug: 'managing-type-2-diabetes-bangladeshi-diet',
    category: 'Endocrinology & Nutrition',
    author: 'Dr. Nusrat Sultana',
    authorTitle: 'Consultant Diabetologist, BIRDEM',
    readTime: '6 min read',
    publishedDate: 'August 28, 2024',
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
    summary: 'Practical dietary modifications for Bangladeshi households to control blood sugar without eliminating traditional cuisine.',
    keyTakeaways: [
      'Switch from polished white rice to parboiled brown rice or red rice (laal chaal) with a lower glycemic index.',
      'Fill half your lunch plate with green leafy vegetables (shobji and shaak) before adding rice.',
      'Limit evening sweet tea and replace sugary biscuits with roasted chickpeas (chhola) or almonds.'
    ],
    content: `Diabetes affects over 13 million people in Bangladesh. The South Asian phenotype has a genetic predisposition to insulin resistance and higher visceral adiposity at lower body mass indexes.

### The Plate Method for Bangladeshi Meals
A sustainable approach doesn't require abandoning comforting Bengali food:
- **50% of Plate:** Non-starchy vegetables (potol, dherosh, lau, korola, palong shaak, lal shaak).
- **25% of Plate:** Lean protein (ilish, rui, magur fish, skinless chicken, boiled egg white, dal).
- **25% of Plate:** Complex carbohydrates (1 cup cooked red rice or 2 whole wheat rotis).

### Fasting Blood Sugar vs HbA1c Monitoring
Relying solely on morning finger-prick fasting tests can give false reassurance. Check an HbA1c test every 90 days to verify average glucose control.`
  },
  {
    id: 'art-03',
    title: 'Recognizing Early Signs of Heart Attack vs Acid Reflux (Gas Pain)',
    slug: 'heart-attack-vs-acid-reflux-chest-pain',
    category: 'Cardiology',
    author: 'Prof. Dr. AQM Reza',
    authorTitle: 'Chief Interventional Cardiologist',
    readTime: '4 min read',
    publishedDate: 'July 19, 2024',
    coverImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
    summary: 'In Bangladesh, life-threatening myocardial infarction is dangerously often dismissed as ordinary gastric pain.',
    keyTakeaways: [
      'Heart attack pain often feels like a heavy squeezing pressure or band across the chest, not just burning.',
      'Pain radiating to the left jaw, shoulder, or arm accompanied by cold sweats is a cardiac emergency.',
      'Never drive yourself to the hospital; dial 999 or 10616 for immediate ambulance transfer.'
    ],
    content: `A frequent medical emergency in Bangladeshi hospitals is a patient presenting late with cardiac damage because they spent hours taking antacid syrups for "gas".

### Key Diagnostic Differences
- **Acid Reflux / Gastric Heartburn:** Burning sensation located behind the breastbone, frequently occurs after spicy or oily meals, worsens when lying flat, and often relieves after sipping water or taking an omeprazole/antacid.
- **Myocardial Infarction (Heart Attack):** Crushing heavy weight, sensation of an elephant sitting on the chest, shortness of breath, sudden nausea, and cold profuse perspiration. May occur during rest or exertion.

### Golden Hour Protocol
The first 60 minutes after symptom onset are critical for restoring coronary artery blood flow via emergency angioplasty or thrombolytic therapy.`
  },
  {
    id: 'art-04',
    title: 'Heatstroke Prevention & Dehydration Management in Urban Bangladesh',
    slug: 'heatstroke-prevention-dehydration-bangladesh',
    category: 'Emergency Medicine',
    author: 'Dr. Tanvir Hossain',
    authorTitle: 'Critical Care Specialist',
    readTime: '4 min read',
    publishedDate: 'June 05, 2024',
    coverImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
    summary: 'Guidelines for coping with high humidity and heatwaves in Dhaka and across Bangladesh.',
    keyTakeaways: [
      'Heat exhaustion can turn into fatal heatstroke within 30 minutes if body core temperature reaches 104°F (40°C).',
      'The hallmark of severe heatstroke is hot, red, dry skin and sudden neurological confusion or fainting.',
      'Immediately cool the person with ice water towels placed in armpits and groins while contacting an ambulance.'
    ],
    content: `With summer heat indexes regularly surpassing 42°C in Bangladesh, outdoor commuters, rickshaw pullers, and elderly citizens are at acute danger of thermal injury.

### Distinguishing Heat Exhaustion from Heatstroke
- **Heat Exhaustion:** Heavy sweating, faintness, rapid weak pulse, cold pale skin, and muscle cramps. Person remains conscious and responds to rest in shade and cool saline.
- **Heat Stroke:** Medical emergency! Sweating stops, skin turns dry and hot, high core fever, slurred speech, delirium, or loss of consciousness.`
  }
];

// GET /api/articles
router.get('/', (req, res) => {
  const { search, category } = req.query;
  let results = [...articlesList];

  if (search) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      a => a.title.toLowerCase().includes(q) ||
           a.summary.toLowerCase().includes(q) ||
           a.author.toLowerCase().includes(q) ||
           a.content.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'All') {
    results = results.filter(a => a.category.toLowerCase() === category.toLowerCase());
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/articles/categories
router.get('/categories', (req, res) => {
  const categories = Array.from(new Set(articlesList.map(a => a.category)));
  res.json({
    success: true,
    data: ['All', ...categories]
  });
});

// GET /api/articles/:id
router.get('/:id', (req, res) => {
  const article = articlesList.find(a => a.id === req.params.id || a.slug === req.params.id);
  if (!article) {
    return res.status(404).json({ success: false, message: 'Article not found' });
  }
  res.json({ success: true, data: article });
});

export default router;
