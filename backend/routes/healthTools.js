import express from 'express';

const router = express.Router();

// GET /api/health-tools/metrics
router.get('/metrics', (req, res) => {
  res.json({
    success: true,
    tools: [
      { id: 'bmi', name: 'Body Mass Index (BMI) for South Asians', description: 'Accurate BMI calculation using WHO Asian thresholds with healthy weight range.' },
      { id: 'water', name: 'Daily Water & Hydration Calculator', description: 'Target daily fluid intake calculated by body weight, activity, and climate.' },
      { id: 'bp', name: 'Blood Pressure Category Assessor', description: 'Cardiovascular risk evaluation based on systolic and diastolic readings.' },
      { id: 'heart-rate', name: 'Target Heart Rate Zone Calculator', description: 'Fat burning and aerobic exercise zones calibrated by patient age.' }
    ]
  });
});

// POST /api/health-tools/bmi
router.post('/bmi', (req, res) => {
  const { weightKg, heightCm, age, gender } = req.body;

  if (!weightKg || !heightCm || Number(weightKg) <= 0 || Number(heightCm) <= 0) {
    return res.status(400).json({ success: false, message: 'Valid positive weight (kg) and height (cm) are required.' });
  }

  const heightM = Number(heightCm) / 100;
  const bmiValue = Number((Number(weightKg) / (heightM * heightM)).toFixed(1));

  // WHO South Asian Classification cutoffs
  let category = '';
  let color = '';
  let healthRisk = '';
  let advice = '';

  if (bmiValue < 18.5) {
    category = 'Underweight';
    color = 'sky';
    healthRisk = 'Risk of nutritional deficiency, weakened immunity, and osteoporosis.';
    advice = 'Focus on nutrient-dense meals with adequate proteins, healthy fats, and calorie-dense whole foods.';
  } else if (bmiValue >= 18.5 && bmiValue <= 22.9) {
    category = 'Normal / Healthy Weight (Asian Standard)';
    color = 'emerald';
    healthRisk = 'Lowest risk of cardiometabolic diseases.';
    advice = 'Maintain your current balanced diet and aim for at least 150 minutes of moderate aerobic activity weekly.';
  } else if (bmiValue >= 23.0 && bmiValue <= 27.4) {
    category = 'Overweight / Increased Risk';
    color = 'amber';
    healthRisk = 'Moderate risk for Type 2 diabetes, fatty liver, and hypertension.';
    advice = 'Reduce refined carbohydrates (white rice, sugar) and incorporate 30-45 minutes of daily brisk walking.';
  } else {
    category = 'Obese / High Risk';
    color = 'rose';
    healthRisk = 'High risk for cardiovascular disease, severe metabolic syndrome, and sleep apnea.';
    advice = 'Consult an endocrinologist or certified clinical nutritionist to formulate a supervised weight management plan.';
  }

  // Calculate ideal weight range for height based on Asian normal BMI (18.5 - 22.9)
  const minIdealWeight = Number((18.5 * heightM * heightM).toFixed(1));
  const maxIdealWeight = Number((22.9 * heightM * heightM).toFixed(1));

  res.json({
    success: true,
    data: {
      bmi: bmiValue,
      category,
      color,
      healthRisk,
      advice,
      idealWeightRange: `${minIdealWeight} kg - ${maxIdealWeight} kg`,
      calculatedFor: {
        weightKg: Number(weightKg),
        heightCm: Number(heightCm),
        age: age ? Number(age) : null,
        gender: gender || 'Unspecified'
      }
    }
  });
});

// POST /api/health-tools/water
router.post('/water', (req, res) => {
  const { weightKg, activityLevel } = req.body;

  if (!weightKg || Number(weightKg) <= 0) {
    return res.status(400).json({ success: false, message: 'Valid body weight in kg is required.' });
  }

  // Base hydration: ~35 ml per kg of body weight
  let baseWaterMl = Number(weightKg) * 35;

  // Add extra volume for activity in warm climate (like Bangladesh)
  if (activityLevel === 'moderate') {
    baseWaterMl += 500;
  } else if (activityLevel === 'heavy') {
    baseWaterMl += 1000;
  } else if (activityLevel === 'athlete') {
    baseWaterMl += 1500;
  }

  const roundedLiters = Number((baseWaterMl / 1000).toFixed(1));
  const glassCount = Math.round(baseWaterMl / 250); // 1 standard glass = 250 ml

  res.json({
    success: true,
    data: {
      dailyWaterMl: Math.round(baseWaterMl),
      dailyLiters: roundedLiters,
      glassesCount: glassCount,
      guidance: 'Drink water consistently throughout the day. Avoid consuming more than 1 liter in an hour to protect kidney function.'
    }
  });
});

// POST /api/health-tools/blood-pressure
router.post('/blood-pressure', (req, res) => {
  const { systolic, diastolic } = req.body;
  const sys = Number(systolic);
  const dia = Number(diastolic);

  if (!sys || !dia || sys <= 40 || dia <= 30) {
    return res.status(400).json({ success: false, message: 'Valid systolic and diastolic numbers are required.' });
  }

  let classification = '';
  let level = '';
  let color = '';
  let guidance = '';

  if (sys > 180 || dia > 120) {
    classification = 'Hypertensive Crisis';
    level = 'Emergency';
    color = 'rose';
    guidance = 'Seek emergency medical evaluation immediately. Rest calmly and do not delay contacting a hospital or calling 999.';
  } else if (sys >= 140 || dia >= 90) {
    classification = 'Stage 2 Hypertension';
    level = 'High Risk';
    color = 'red';
    guidance = 'Consult a physician for anti-hypertensive medication review and restrict daily dietary sodium intake.';
  } else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
    classification = 'Stage 1 Hypertension';
    level = 'Moderate Risk';
    color = 'amber';
    guidance = 'Adopt dietary changes (DASH diet), increase physical exercise, and measure BP twice weekly.';
  } else if (sys >= 120 && sys <= 129 && dia < 80) {
    classification = 'Elevated Blood Pressure';
    level = 'Caution';
    color = 'yellow';
    guidance = 'Pre-hypertension state. Lifestyle interventions such as stress reduction and low salt intake are recommended.';
  } else {
    classification = 'Normal Blood Pressure';
    level = 'Optimal';
    color = 'emerald';
    guidance = 'Optimal cardiovascular reading. Continue regular physical activity and healthy nutrition.';
  }

  res.json({
    success: true,
    data: {
      systolic: sys,
      diastolic: dia,
      classification,
      level,
      color,
      guidance
    }
  });
});

export default router;
