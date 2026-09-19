const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchDoctors(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/doctors?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch doctors');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchDoctors:', err);
    return { success: false, data: [] };
  }
}

export async function fetchDoctorById(id) {
  try {
    const res = await fetch(`${API_BASE}/doctors/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch doctor details');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchDoctorById:', err);
    return { success: false, data: null };
  }
}

export async function fetchHospitals(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/hospitals?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch hospitals');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchHospitals:', err);
    return { success: false, data: [] };
  }
}

export async function fetchHospitalById(id) {
  try {
    const res = await fetch(`${API_BASE}/hospitals/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch hospital details');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchHospitalById:', err);
    return { success: false, data: null };
  }
}

export async function fetchSpecialists() {
  try {
    const res = await fetch(`${API_BASE}/specialists`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch specialists');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchSpecialists:', err);
    return { success: false, data: [] };
  }
}

export async function fetchTreatmentCosts(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/costs?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch treatment costs');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchTreatmentCosts:', err);
    return { success: false, data: [] };
  }
}

export async function bookAppointment(appointmentData) {
  try {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    return await res.json();
  } catch (err) {
    console.error('API Error bookAppointment:', err);
    return { success: false, message: 'Connection error while booking appointment.' };
  }
}

export async function fetchEmergencyHotlines() {
  try {
    const res = await fetch(`${API_BASE}/emergency/hotlines`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch emergency hotlines');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchEmergencyHotlines:', err);
    return { success: false, data: [] };
  }
}

export async function fetchBloodDonors(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/emergency/donors?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch blood donors');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchBloodDonors:', err);
    return { success: false, data: [] };
  }
}

export async function fetchAmbulances(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/emergency/ambulances?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch ambulances');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchAmbulances:', err);
    return { success: false, data: [] };
  }
}

export async function submitBloodRequest(requestData) {
  try {
    const res = await fetch(`${API_BASE}/emergency/request-blood`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error submitBloodRequest:', err);
    return { success: false, message: 'Error submitting blood request.' };
  }
}

export async function bookAmbulance(bookingData) {
  try {
    const res = await fetch(`${API_BASE}/emergency/book-ambulance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error bookAmbulance:', err);
    return { success: false, message: 'Error submitting ambulance request.' };
  }
}

export async function fetchMedicines(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/medicines?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch medicines');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchMedicines:', err);
    return { success: false, data: [] };
  }
}

export async function fetchMedicineCategories() {
  try {
    const res = await fetch(`${API_BASE}/medicines/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch medicine categories');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchMedicineCategories:', err);
    return { success: false, data: ['All'] };
  }
}

export async function fetchMedicineById(id) {
  try {
    const res = await fetch(`${API_BASE}/medicines/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch medicine detail');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchMedicineById:', err);
    return { success: false, data: null };
  }
}

export async function calculateBMI(data) {
  try {
    const res = await fetch(`${API_BASE}/health-tools/bmi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error calculateBMI:', err);
    return { success: false, message: 'Could not connect to health tools service.' };
  }
}

export async function calculateWaterIntake(data) {
  try {
    const res = await fetch(`${API_BASE}/health-tools/water`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error calculateWaterIntake:', err);
    return { success: false, message: 'Could not connect to health tools service.' };
  }
}

export async function calculateBloodPressure(data) {
  try {
    const res = await fetch(`${API_BASE}/health-tools/blood-pressure`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error calculateBloodPressure:', err);
    return { success: false, message: 'Could not connect to health tools service.' };
  }
}

export async function fetchDiagnosticTests(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/diagnostics?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch diagnostics');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchDiagnosticTests:', err);
    return { success: false, data: [] };
  }
}

export async function fetchDiagnosticCategories() {
  try {
    const res = await fetch(`${API_BASE}/diagnostics/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch diagnostic categories');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchDiagnosticCategories:', err);
    return { success: false, data: ['All'] };
  }
}

export async function bookDiagnosticTest(data) {
  try {
    const res = await fetch(`${API_BASE}/diagnostics/book-test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error bookDiagnosticTest:', err);
    return { success: false, message: 'Could not submit test booking inquiry.' };
  }
}

export async function fetchDoctorReviews(doctorId) {
  try {
    const res = await fetch(`${API_BASE}/doctors/${doctorId}/reviews`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch doctor reviews');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchDoctorReviews:', err);
    return { success: false, data: [] };
  }
}

export async function submitDoctorReview(doctorId, reviewData) {
  try {
    const res = await fetch(`${API_BASE}/doctors/${doctorId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    return await res.json();
  } catch (err) {
    console.error('API Error submitDoctorReview:', err);
    return { success: false, message: 'Could not submit review.' };
  }
}

export async function fetchArticles(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/articles?${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch articles');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchArticles:', err);
    return { success: false, data: [] };
  }
}

export async function fetchArticleCategories() {
  try {
    const res = await fetch(`${API_BASE}/articles/categories`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch article categories');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchArticleCategories:', err);
    return { success: false, data: ['All'] };
  }
}

export async function fetchArticleById(id) {
  try {
    const res = await fetch(`${API_BASE}/articles/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch article detail');
    return await res.json();
  } catch (err) {
    console.error('API Error fetchArticleById:', err);
    return { success: false, data: null };
  }
}





