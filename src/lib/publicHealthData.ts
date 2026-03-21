import { useState, useEffect } from 'react';

export interface FieldWorker {
  id: string;
  name: string;
  ward: string;
  status: 'Active' | 'Inactive';
  tasksCompleted: number;
}

export interface Appointment {
  id: string;
  type: string;
  doctor: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed';
  location: string;
}

export interface HealthRecord {
  id: string;
  type: string;
  title: string;
  doctor: string;
  date: string;
  hospital: string;
  status: string;
}

const INITIAL_WORKERS: FieldWorker[] = [
  { id: 'W-001', name: 'Sunita Deshmukh', ward: 'Ward 4, Shivaji Nagar', status: 'Active', tasksCompleted: 142 },
  { id: 'W-002', name: 'Anjali Patil', ward: 'Ward 12, Bhavani Peth', status: 'Active', tasksCompleted: 128 },
  { id: 'W-003', name: 'Meena Kulkarni', ward: 'Ward 8, Sadar Bazar', status: 'Active', tasksCompleted: 115 },
  { id: 'W-004', name: 'Priya Shinde', ward: 'Ward 1, Camp', status: 'Active', tasksCompleted: 98 },
  { id: 'W-005', name: 'Rani Gaikwad', ward: 'Ward 2, Ashok Chowk', status: 'Inactive', tasksCompleted: 0 },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 'APT-101', type: 'General Consultation', doctor: 'Dr. Sameer Joshi', date: '2026-03-20', time: '10:30 AM', status: 'Confirmed', location: 'Civil Hospital, Solapur' },
  { id: 'APT-102', type: 'Pediatric Checkup', doctor: 'Dr. Anita Rao', date: '2026-03-25', time: '02:00 PM', status: 'Pending', location: 'SMC Clinic, Ward 4' },
  { id: 'APT-103', type: 'Dermatology', doctor: 'Dr. Vikram Shah', date: '2026-03-15', time: '11:00 AM', status: 'Completed', location: 'Civil Hospital, Solapur' },
];

const INITIAL_RECORDS: HealthRecord[] = [
  { id: 'REC-001', type: 'Lab Report', title: 'Blood Test (CBC)', doctor: 'Dr. Sameer Joshi', date: '2026-03-10', hospital: 'Civil Hospital', status: 'Final' },
  { id: 'REC-002', type: 'Prescription', title: 'Seasonal Fever Meds', doctor: 'Dr. Anita Rao', date: '2026-03-05', hospital: 'SMC Clinic', status: 'Active' },
  { id: 'REC-003', type: 'Vaccination', title: 'Covid-19 Booster', doctor: 'Nurse Meena', date: '2026-02-15', hospital: 'Vaccination Center', status: 'Completed' },
];

export function usePublicHealthData() {
  const [workers, setWorkers] = useState<FieldWorker[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [records, setRecords] = useState<HealthRecord[]>([]);

  useEffect(() => {
    const storedWorkers = localStorage.getItem('smc_workers');
    const storedAppointments = localStorage.getItem('smc_appointments');
    const storedRecords = localStorage.getItem('smc_records');

    if (storedWorkers) setWorkers(JSON.parse(storedWorkers));
    else {
      setWorkers(INITIAL_WORKERS);
      localStorage.setItem('smc_workers', JSON.stringify(INITIAL_WORKERS));
    }

    if (storedAppointments) setAppointments(JSON.parse(storedAppointments));
    else {
      setAppointments(INITIAL_APPOINTMENTS);
      localStorage.setItem('smc_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
    }

    if (storedRecords) setRecords(JSON.parse(storedRecords));
    else {
      setRecords(INITIAL_RECORDS);
      localStorage.setItem('smc_records', JSON.stringify(INITIAL_RECORDS));
    }
  }, []);

  const addWorker = (worker: Omit<FieldWorker, 'id'>) => {
    const newWorker = { ...worker, id: `W-00${workers.length + 1}` };
    const updated = [...workers, newWorker];
    setWorkers(updated);
    localStorage.setItem('smc_workers', JSON.stringify(updated));
  };

  const addAppointment = (apt: Omit<Appointment, 'id'>) => {
    const newApt = { ...apt, id: `APT-${100 + appointments.length + 1}` };
    const updated = [...appointments, newApt];
    setAppointments(updated);
    localStorage.setItem('smc_appointments', JSON.stringify(updated));
  };

  const addRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord = { ...record, id: `REC-00${records.length + 1}` };
    const updated = [...records, newRecord];
    setRecords(updated);
    localStorage.setItem('smc_records', JSON.stringify(updated));
  };

  return {
    workers,
    appointments,
    records,
    addWorker,
    addAppointment,
    addRecord
  };
}
