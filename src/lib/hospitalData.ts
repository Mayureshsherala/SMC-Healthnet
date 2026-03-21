import { useState, useEffect } from 'react';

export type BedType = 'General' | 'ICU' | 'Oxygen';
export type ResourceStatus = 'Available' | 'Low' | 'Unavailable' | 'Maintenance';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface HospitalBed {
  id: string;
  type: BedType;
  total: number;
  occupied: number;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  total: number;
  available: number;
  status: ResourceStatus;
  lastUpdated: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Medicine' | 'Vaccine';
  stock: number;
  threshold: number;
  unit: string;
  status: StockStatus;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  emergency: string;
  ambulance: boolean;
  departments: string[];
  beds: HospitalBed[];
  equipment: Equipment[];
  inventory: InventoryItem[];
}

const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'SMC General Hospital',
    address: 'Railway Lines, Solapur, Maharashtra 413001',
    phone: '0217-2740300',
    emergency: '102',
    ambulance: true,
    departments: ['General Medicine', 'Pediatrics', 'Orthopedics', 'Cardiology', 'Emergency'],
    beds: [
      { id: 'b1', type: 'General', total: 200, occupied: 145 },
      { id: 'b2', type: 'ICU', total: 40, occupied: 32 },
      { id: 'b3', type: 'Oxygen', total: 60, occupied: 48 },
    ],
    equipment: [
      { id: 'e1', name: 'Ventilators', category: 'Critical Care', total: 25, available: 8, status: 'Available', lastUpdated: '2026-03-18 09:00' },
      { id: 'e2', name: 'Oxygen Cylinders', category: 'Respiratory', total: 150, available: 45, status: 'Available', lastUpdated: '2026-03-18 10:30' },
      { id: 'e3', name: 'Patient Monitors', category: 'Monitoring', total: 80, available: 12, status: 'Low', lastUpdated: '2026-03-18 08:15' },
      { id: 'e4', name: 'Wheelchairs', category: 'Mobility', total: 50, available: 5, status: 'Low', lastUpdated: '2026-03-18 11:00' },
    ],
    inventory: [
      { id: 'i1', name: 'Paracetamol 500mg', category: 'Medicine', stock: 5000, threshold: 1000, unit: 'Tablets', status: 'In Stock' },
      { id: 'i2', name: 'Covishield', category: 'Vaccine', stock: 450, threshold: 500, unit: 'Doses', status: 'Low Stock' },
      { id: 'i3', name: 'Insulin', category: 'Medicine', stock: 80, threshold: 100, unit: 'Vials', status: 'Low Stock' },
      { id: 'i4', name: 'Amoxicillin', category: 'Medicine', stock: 1200, threshold: 500, unit: 'Capsules', status: 'In Stock' },
    ]
  },
  {
    id: 'h2',
    name: 'Chhatrapati Shivaji Maharaj Sarvopchar Rugnalaya',
    address: 'Civil Hospital Road, Solapur',
    phone: '0217-2319300',
    emergency: '108',
    ambulance: true,
    departments: ['Surgery', 'Obstetrics', 'Gynecology', 'Neurology', 'Trauma'],
    beds: [
      { id: 'b4', type: 'General', total: 500, occupied: 410 },
      { id: 'b5', type: 'ICU', total: 80, occupied: 75 },
      { id: 'b6', type: 'Oxygen', total: 120, occupied: 110 },
    ],
    equipment: [
      { id: 'e5', name: 'Ventilators', category: 'Critical Care', total: 50, available: 5, status: 'Low', lastUpdated: '2026-03-18 07:00' },
      { id: 'e6', name: 'Oxygen Concentrators', category: 'Respiratory', total: 100, available: 20, status: 'Available', lastUpdated: '2026-03-18 09:45' },
    ],
    inventory: [
      { id: 'i5', name: 'Remdesivir', category: 'Medicine', stock: 20, threshold: 50, unit: 'Vials', status: 'Low Stock' },
      { id: 'i6', name: 'Covaxin', category: 'Vaccine', stock: 800, threshold: 200, unit: 'Doses', status: 'In Stock' },
    ]
  }
];

export const useHospitalData = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(() => {
    const saved = localStorage.getItem('smc_hospitals');
    return saved ? JSON.parse(saved) : INITIAL_HOSPITALS;
  });

  useEffect(() => {
    localStorage.setItem('smc_hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  const updateBeds = (hospitalId: string, bedId: string, occupied: number) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId) {
        return {
          ...h,
          beds: h.beds.map(b => b.id === bedId ? { ...b, occupied } : b)
        };
      }
      return h;
    }));
  };

  const updateInventory = (hospitalId: string, itemId: string, stock: number) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId) {
        return {
          ...h,
          inventory: h.inventory.map(i => {
            if (i.id === itemId) {
              const status = stock <= 0 ? 'Out of Stock' : stock <= i.threshold ? 'Low Stock' : 'In Stock';
              return { ...i, stock, status };
            }
            return i;
          })
        };
      }
      return h;
    }));
  };

  const updateEquipment = (hospitalId: string, equipId: string, available: number, status: ResourceStatus) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === hospitalId) {
        return {
          ...h,
          equipment: h.equipment.map(e => e.id === equipId ? { 
            ...e, 
            available, 
            status, 
            lastUpdated: new Date().toLocaleString() 
          } : e)
        };
      }
      return h;
    }));
  };

  return { hospitals, updateBeds, updateInventory, updateEquipment };
};
