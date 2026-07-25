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
