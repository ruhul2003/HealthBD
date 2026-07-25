import { connectToDatabase } from '../config/db.js';

const doctorsData = [
  {
    name: "Prof. Dr. AQM Reza",
    title: "Senior Consultant & Head of Cardiology",
    degree: "MBBS, FCPS (Medicine), MD (Cardiology), FACC (USA)",
    specialty: "Cardiology",
    experienceYears: 22,
    city: "Dhaka",
    hospital: "Square Hospital",
    hospitalAddress: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka",
    fee: 1500,
    rating: 4.9,
    reviewCount: 328,
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Mon", "Tue", "Wed", "Sat"],
    timing: "5:00 PM - 9:00 PM",
    bio: "Prof. Dr. AQM Reza is an internationally renowned Interventional Cardiologist specializing in complex coronary interventions, heart failure management, and pacemaker installations.",
    contactPhone: "+880 1711-000111",
    email: "dr.reza@squarehospital.com",
    languages: ["Bangla", "English"],
    gender: "Male",
    isFeatured: true
  },
  {
    name: "Dr. Farhana Yasmin",
    title: "Consultant Gynecologist & Obstetrician",
    degree: "MBBS, MS (OBGYN), DGO, Fellow in Infertility (India)",
    specialty: "Gynecology & Obstetrics",
    experienceYears: 16,
    city: "Dhaka",
    hospital: "Evercare Hospital Dhaka",
    hospitalAddress: "Plot 81, Block E, Bashundhara R/A, Dhaka",
    fee: 1200,
    rating: 4.8,
    reviewCount: 245,
    photo: "https://images.unsplash.com/photo-1594824813566-78a1ed6493f8?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sun", "Tue", "Thu"],
    timing: "4:00 PM - 8:00 PM",
    bio: "Expert in high-risk pregnancy care, laparoscopic gynecological surgeries, and maternal-fetal wellness with over 16 years of clinical excellence.",
    contactPhone: "+880 1711-000222",
    email: "farhana.yasmin@evercarebd.com",
    languages: ["Bangla", "English"],
    gender: "Female",
    isFeatured: true
  },
  {
    name: "Prof. Dr. Syed Atiqul Haq",
    title: "Senior Specialist Rheumatologist & Medicine Specialist",
    degree: "MBBS, FCPS (Medicine), MD (Rheumatology), FRCP (Glasgow)",
    specialty: "Rheumatology",
    experienceYears: 28,
    city: "Dhaka",
    hospital: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
    hospitalAddress: "Shahbag, Dhaka 1000",
    fee: 2000,
    rating: 4.95,
    reviewCount: 410,
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sun", "Mon", "Wed"],
    timing: "6:00 PM - 9:30 PM",
    bio: "Pioneer in Rheumatology care in Bangladesh. Former Head of Department at BSMMU, managing arthritis, lupus, gout, and complex autoimmune disorders.",
    contactPhone: "+880 1819-998877",
    email: "s.atiqul@bsmmu.edu.bd",
    languages: ["Bangla", "English"],
    gender: "Male",
    isFeatured: true
  },
  {
    name: "Dr. Tanvir Rahman",
    title: "Consultant Neurologist & Stroke Specialist",
    degree: "MBBS, MD (Neurology), Fellowship in Stroke (Singapore)",
    specialty: "Neurology",
    experienceYears: 14,
    city: "Chittagong",
    hospital: "Imperial Hospital Limited",
    hospitalAddress: "Zakir Hossain Road, Pahartali, Chittagong",
    fee: 1000,
    rating: 4.7,
    reviewCount: 189,
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sat", "Mon", "Wed", "Fri"],
    timing: "3:00 PM - 7:00 PM",
    bio: "Specialist in acute stroke intervention, epilepsy management, migraine therapy, and movement disorders with international training.",
    contactPhone: "+880 1812-334455",
    email: "tanvir.neurology@imperialbd.org",
    languages: ["Bangla", "English"],
    gender: "Male",
    isFeatured: true
  },
  {
    name: "Dr. Noshin Tarannum",
    title: "Associate Specialist Pediatrician & Neonatologist",
    degree: "MBBS, DCH (Ireland), MD (Pediatrics)",
    specialty: "Pediatrics",
    experienceYears: 11,
    city: "Dhaka",
    hospital: "Labaid Specialized Hospital",
    hospitalAddress: "House 06, Road 04, Dhanmondi, Dhaka",
    fee: 1000,
    rating: 4.85,
    reviewCount: 215,
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sun", "Mon", "Tue", "Thu"],
    timing: "5:30 PM - 8:30 PM",
    bio: "Dedicated pediatric specialist focusing on newborn care, childhood vaccination, growth monitoring, and pediatric asthma care.",
    contactPhone: "+880 1712-445566",
    email: "noshin.t@labaidgroup.com",
    languages: ["Bangla", "English"],
    gender: "Female",
    isFeatured: true
  },
  {
    name: "Dr. Kamrul Hasan",
    title: "Chief Orthopedic & Trauma Surgeon",
    degree: "MBBS, MS (Orthopedics), Fellowship in Joint Replacement (UK)",
    specialty: "Orthopedics",
    experienceYears: 19,
    city: "Dhaka",
    hospital: "United Hospital Limited",
    hospitalAddress: "Plot 15, Road 71, Gulshan 2, Dhaka",
    fee: 1500,
    rating: 4.9,
    reviewCount: 302,
    photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Mon", "Wed", "Sat"],
    timing: "4:00 PM - 8:00 PM",
    bio: "Renowned orthopedic surgeon performing primary & revision knee & hip replacement surgeries, arthroscopy, and complex fracture fixations.",
    contactPhone: "+880 1911-556677",
    email: "dr.kamrul@uhlbd.com",
    languages: ["Bangla", "English"],
    gender: "Male",
    isFeatured: true
  },
  {
    name: "Dr. Shaheen Chowdhury",
    title: "Senior Consultant Gastroenterologist",
    degree: "MBBS, FCPS (Medicine), MD (Gastroenterology)",
    specialty: "Gastroenterology",
    experienceYears: 17,
    city: "Sylhet",
    hospital: "Popular Diagnostic Centre Sylhet",
    hospitalAddress: "New Medical Road, Kajolshah, Sylhet",
    fee: 900,
    rating: 4.75,
    reviewCount: 162,
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sun", "Tue", "Thu", "Fri"],
    timing: "4:30 PM - 8:30 PM",
    bio: "Expert in endoscopic procedures, liver disease treatment, IBS, fatty liver management, and acid reflux solutions.",
    contactPhone: "+880 1713-778899",
    email: "shaheen.gastro@populardiagnostic.com",
    languages: ["Bangla", "English", "Sylheti"],
    gender: "Male",
    isFeatured: false
  },
  {
    name: "Dr. Nusrat Jahan Ela",
    title: "Consultant Dermatologist & Hair Transplant Surgeon",
    degree: "MBBS, DDV (BSMMU), MCPS (Dermatology), Fellow in Aesthetic Medicine (USA)",
    specialty: "Dermatology",
    experienceYears: 10,
    city: "Dhaka",
    hospital: "Ibn Sina Diagnostic & Imaging Center",
    hospitalAddress: "House 48, Road 9/A, Dhanmondi, Dhaka",
    fee: 1000,
    rating: 4.88,
    reviewCount: 278,
    photo: "https://images.unsplash.com/photo-1594824813566-78a1ed6493f8?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sun", "Mon", "Wed", "Sat"],
    timing: "5:00 PM - 9:00 PM",
    bio: "Specializing in clinical dermatology, acne scarring solutions, laser skin rejuvenation, anti-aging therapies, and hair restoration.",
    contactPhone: "+880 1817-223344",
    email: "nusrat.dermatology@ibnsinatrust.com",
    languages: ["Bangla", "English"],
    gender: "Female",
    isFeatured: true
  },
  {
    name: "Dr. Mahmudul Alam",
    title: "Consultant ENT & Head Neck Surgeon",
    degree: "MBBS, DLO, FCPS (ENT)",
    specialty: "ENT (Ear, Nose, Throat)",
    experienceYears: 15,
    city: "Rajshahi",
    hospital: "Popular Diagnostic Centre Rajshahi",
    hospitalAddress: "Bandh Gate, Greater Road, Rajshahi",
    fee: 800,
    rating: 4.65,
    reviewCount: 140,
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Mon", "Wed", "Fri"],
    timing: "4:00 PM - 8:00 PM",
    bio: "Specialized care for sinus problems, hearing impairment, vocal cord disorders, tonsillectomy, and endoscopic sinus surgery.",
    contactPhone: "+880 1714-889900",
    email: "mahmudul.ent@rajshahipopular.com",
    languages: ["Bangla", "English"],
    gender: "Male",
    isFeatured: false
  },
  {
    name: "Prof. Dr. Sabina Sharmin",
    title: "Chief Medical Oncologist",
    degree: "MBBS, FCPS (Radiotherapy), MPhil (Oncology), Fellow UICC",
    specialty: "Oncology",
    experienceYears: 23,
    city: "Dhaka",
    hospital: "Square Hospital",
    hospitalAddress: "Panthapath, Dhaka",
    fee: 1800,
    rating: 4.92,
    reviewCount: 310,
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&auto=format&fit=crop&q=80",
    availableDays: ["Sun", "Tue", "Thu"],
    timing: "5:00 PM - 8:00 PM",
    bio: "Leading oncologist in Bangladesh offering personalized chemotherapy, targeted cancer therapy, immunotherapy, and breast cancer treatment.",
    contactPhone: "+880 1711-887766",
    email: "sabina.oncology@squarehospital.com",
    languages: ["Bangla", "English"],
    gender: "Female",
    isFeatured: true
  }
];

const hospitalsData = [
  {
    name: "Square Hospital Ltd.",
    type: "Tertiary Care Private Hospital",
    city: "Dhaka",
    address: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, Panthapath, Dhaka 1205",
    phone: "+880 2-8159457",
    emergencyHotline: "10616",
    totalBeds: 400,
    availableICUBeds: 12,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&auto=format&fit=crop&q=80",
    departments: ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Gynecology", "Pediatrics", "ICU & Emergency"],
    facilities: ["24/7 Emergency", "Coronary Care Unit", "Helipad Service", "Advanced Diagnostic Lab", "Pharmacy", "Ambulance"],
    establishedYear: 2006
  },
  {
    name: "Evercare Hospital Dhaka",
    type: "JCI Accredited Multi-Specialty Hospital",
    city: "Dhaka",
    address: "Plot 81, Block E, Bashundhara R/A, Dhaka 1229",
    phone: "+880 2-8431661",
    emergencyHotline: "10678",
    totalBeds: 425,
    availableICUBeds: 15,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    departments: ["Cardiology", "Neurosurgery", "Gastroenterology", "Nephrology", "Transplant Unit", "Pediatric ICU"],
    facilities: ["JCI Accredited", "24/7 Trauma Care", "Robotic Surgery", "Blood Bank", "International Patient Care"],
    establishedYear: 2005
  },
  {
    name: "Labaid Specialized Hospital",
    type: "Cardiac & Specialized Medical Center",
    city: "Dhaka",
    address: "House 06, Road 04, Dhanmondi, Dhaka 1205",
    phone: "+880 2-9676356",
    emergencyHotline: "10606",
    totalBeds: 250,
    availableICUBeds: 8,
    rating: 4.75,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80",
    departments: ["Cardiology", "Cardiothoracic Surgery", "Kidney Care", "General Surgery", "Radiology"],
    facilities: ["Cath Lab", "Open Heart Surgery", "Executive Health Checkup", "Dialysis Center", "24/7 Pharmacy"],
    establishedYear: 2004
  },
  {
    name: "United Hospital Limited",
    type: "Super-Specialty Hospital",
    city: "Dhaka",
    address: "Plot 15, Road 71, Gulshan 2, Dhaka 1212",
    phone: "+880 2-9852413",
    emergencyHotline: "10666",
    totalBeds: 500,
    availableICUBeds: 18,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop&q=80",
    departments: ["Heart Centre", "Neuro Centre", "Oncology Centre", "Orthopedic Centre", "Critical Care"],
    facilities: ["Linear Accelerator", "PET-CT Scan", "Stroke Unit", "Neonatal ICU", "Air Ambulance Service"],
    establishedYear: 2006
  },
  {
    name: "BSMMU (Bangabandhu Sheikh Mujib Medical University)",
    type: "Premier Autonomous Public Medical University & Hospital",
    city: "Dhaka",
    address: "Shahbag, Dhaka 1000",
    phone: "+880 2-55165760",
    emergencyHotline: "02-55165600",
    totalBeds: 1500,
    availableICUBeds: 25,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&auto=format&fit=crop&q=80",
    departments: ["Internal Medicine", "Rheumatology", "Endocrinology", "Pediatrics", "Urology", "Physical Medicine"],
    facilities: ["Super-Specialized Hospital Unit", "Research Labs", "Low-cost Quality Care", "National Reference Lab"],
    establishedYear: 1998
  },
  {
    name: "Imperial Hospital Limited",
    type: "State-of-the-Art Tertiary Care Center",
    city: "Chittagong",
    address: "Zakir Hossain Road, Pahartali, Chittagong",
    phone: "+880 31-659000",
    emergencyHotline: "09612-222333",
    totalBeds: 375,
    availableICUBeds: 10,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
    departments: ["Cardiology", "Neurology", "Mother & Child Care", "Diagnostic Imaging", "Emergency & Trauma"],
    facilities: ["Modern Operation Theatres", "Child-Friendly Ward", "Dialysis Unit", "24/7 Ambulance"],
    establishedYear: 2019
  }
];

const costsData = [
  {
    procedureName: "Coronary Angiogram (CAG)",
    category: "Cardiology",
    avgCostBDT: 25000,
    minCostBDT: 18000,
    maxCostBDT: 35000,
    duration: "Day Care / 1 Day Stay",
    hospitalType: "Private Tertiary Hospital",
    description: "Diagnostic procedure to evaluate coronary artery blockage using contrast material and X-ray imaging.",
    includes: ["Cath Lab Charges", "Cardiologist Fee", "Contrast Media", "1 Day Bed Charge"]
  },
  {
    procedureName: "Coronary Angioplasty (Stenting - 1 Stent)",
    category: "Cardiology",
    avgCostBDT: 180000,
    minCostBDT: 140000,
    maxCostBDT: 260000,
    duration: "2 - 3 Days Stay",
    hospitalType: "Private Specialized Center",
    description: "Percutaneous coronary intervention with FDA-approved Drug-Eluting Stent (DES) insertion.",
    includes: ["1 US-FDA Drug Eluting Stent", "Cath Lab & ICU stay", "Surgeon & Anesthesia Fees", "Medicines"]
  },
  {
    procedureName: "Normal Vaginal Delivery (NVD)",
    category: "Maternity & Gynecology",
    avgCostBDT: 35000,
    minCostBDT: 20000,
    maxCostBDT: 55000,
    duration: "1 - 2 Days Stay",
    hospitalType: "Private / General Hospital",
    description: "Spontaneous normal childbirth with continuous fetal monitoring and pediatrician newborn assessment.",
    includes: ["Delivery Room Charges", "Obstetrician & Pediatrician Fee", "Standard Cabin Stay", "Newborn Routine Care"]
  },
  {
    procedureName: "Cesarean Section (C-Section Surgery)",
    category: "Maternity & Gynecology",
    avgCostBDT: 65000,
    minCostBDT: 45000,
    maxCostBDT: 110000,
    duration: "3 - 4 Days Stay",
    hospitalType: "Private Tertiary Hospital",
    description: "Surgical delivery procedure performed under spinal or epidural anesthesia.",
    includes: ["OT Charges", "Surgeon, Anesthetist & Pediatrician Fees", "3 Days Cabin Stay", "Post-op Care"]
  },
  {
    procedureName: "Whole Body MRI Scan (1.5T / 3.0T)",
    category: "Diagnostic & Imaging",
    avgCostBDT: 12000,
    minCostBDT: 8500,
    maxCostBDT: 18000,
    duration: "Outpatient (45 Mins)",
    hospitalType: "Diagnostic Center / Hospital",
    description: "High-resolution Magnetic Resonance Imaging scan for precise anatomical cross-section evaluation.",
    includes: ["Scan Procedure", "Contrast (if applicable)", "Radiologist Official Report"]
  },
  {
    procedureName: "Total Knee Replacement (Single Knee)",
    category: "Orthopedics & Surgery",
    avgCostBDT: 280000,
    minCostBDT: 220000,
    maxCostBDT: 380000,
    duration: "5 - 7 Days Stay",
    hospitalType: "Specialized Orthopedic Hospital",
    description: "Surgical replacement of damaged knee joint components with imported high-grade prosthetic implant.",
    includes: ["Imported Knee Prosthesis", "OT & Anesthesia", "Post-op Physiotherapy", "Cabin & ICU Stay"]
  },
  {
    procedureName: "ICU Bed Charge (Per Day)",
    category: "ICU & Critical Care",
    avgCostBDT: 15000,
    minCostBDT: 8000,
    maxCostBDT: 28000,
    duration: "Daily Rate",
    hospitalType: "Private Tertiary Hospital",
    description: "24/7 intensive monitoring bed with dedicated nursing ratio (1:1) and mechanical ventilator setup.",
    includes: ["Bed & Monitor Charges", "1:1 Dedicated Nursing", "Resident Medical Officer Duty", "Oxygen Supply"]
  },
  {
    procedureName: "Cataract Surgery (Phaco Surgery + IOL)",
    category: "Ophthalmology / Eye",
    avgCostBDT: 30000,
    minCostBDT: 18000,
    maxCostBDT: 55000,
    duration: "Outpatient (2 Hours)",
    hospitalType: "Specialized Eye Hospital",
    description: "Sutureless micro-incision Phacoemulsification eye surgery with foldable Intraocular Lens (IOL).",
    includes: ["Foldable Intraocular Lens", "Phaco Machine & OT Fee", "Surgeon Fee", "Post-op Eye Drops"]
  }
];

const specialistsData = [
  { name: "Cardiology", description: "Heart, coronary artery diseases, blood pressure & pacemakers", icon: "HeartPulse", count: 120 },
  { name: "Gynecology & Obstetrics", description: "Women's reproductive health, maternity care, and fertility treatment", icon: "UserCheck", count: 150 },
  { name: "Neurology", description: "Brain, spinal cord, stroke, epilepsy, and nervous system disorders", icon: "Brain", count: 85 },
  { name: "Orthopedics", description: "Bone fractures, joint replacements, arthritis, and spine care", icon: "Bone", count: 95 },
  { name: "Pediatrics", description: "Child health, infant nutrition, vaccination, and growth monitoring", icon: "Baby", count: 110 },
  { name: "Gastroenterology", description: "Stomach, liver, digestion, acid reflux, and endoscopy care", icon: "Activity", count: 70 },
  { name: "Oncology", description: "Cancer diagnosis, chemotherapy, radiation, and surgical oncology", icon: "ShieldAlert", count: 60 },
  { name: "Dermatology", description: "Skin, hair loss, laser skin care, and allergic reactions", icon: "Sparkles", count: 90 },
  { name: "ENT (Ear, Nose, Throat)", description: "Sinusitis, hearing disorders, throat surgery, and tonsils", icon: "Stethoscope", count: 65 },
  { name: "Rheumatology", description: "Rheumatoid arthritis, lupus, joint inflammation, and gout", icon: "Thermometer", count: 45 }
];

async function seed() {
  try {
    const { db } = await connectToDatabase();

    console.log("Clearing existing collections...");
    await db.collection("doctors").deleteMany({});
    await db.collection("hospitals").deleteMany({});
    await db.collection("costs").deleteMany({});
    await db.collection("specialists").deleteMany({});

    console.log("Inserting Doctors data...");
    const doctorRes = await db.collection("doctors").insertMany(doctorsData);
    console.log(`Successfully inserted ${doctorRes.insertedCount} doctors into 'doctors' collection.`);

    console.log("Inserting Hospitals data...");
    const hospitalRes = await db.collection("hospitals").insertMany(hospitalsData);
    console.log(`Successfully inserted ${hospitalRes.insertedCount} hospitals into 'hospitals' collection.`);

    console.log("Inserting Treatment Costs data...");
    const costRes = await db.collection("costs").insertMany(costsData);
    console.log(`Successfully inserted ${costRes.insertedCount} treatment cost records into 'costs' collection.`);

    console.log("Inserting Specialist Categories data...");
    const specRes = await db.collection("specialists").insertMany(specialistsData);
    console.log(`Successfully inserted ${specRes.insertedCount} specialist categories into 'specialists' collection.`);

    console.log("--- SEEDING COMPLETED SUCCESSFULLY ---");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
