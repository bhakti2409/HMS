import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  initialDoctors,
  initialPatients,
  initialAppointments,
  initialMedicines,
} from '../data/initialData';

// ---------- Context API + useReducer ----------
// One reducer manages all hospital data: doctors, patients, appointments, medicines, cart and orders.

const STORAGE_KEY = 'hmsData';

const defaultState = {
  doctors: initialDoctors,
  patients: initialPatients,
  appointments: initialAppointments,
  medicines: initialMedicines,
  cart: [],
  orders: [],
};

// next id = (highest id in the list) + 1
const nextId = (list) => (list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1);

function hospitalReducer(state, action) {
  switch (action.type) {
    // ----- Doctors -----
    case 'ADD_DOCTOR':
      return { ...state, doctors: [...state.doctors, { ...action.payload, id: nextId(state.doctors) }] };
    case 'DELETE_DOCTOR':
      return { ...state, doctors: state.doctors.filter((d) => d.id !== action.payload) };
    case 'TOGGLE_DOCTOR_AVAILABILITY':
      return {
        ...state,
        doctors: state.doctors.map((d) => (d.id === action.payload ? { ...d, available: !d.available } : d)),
      };

    // ----- Patients -----
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, { ...action.payload, id: nextId(state.patients) }] };
    case 'DELETE_PATIENT':
      return { ...state, patients: state.patients.filter((p) => p.id !== action.payload) };

    // ----- Appointments -----
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [...state.appointments, { ...action.payload, id: nextId(state.appointments), status: 'Pending' }],
      };
    case 'UPDATE_APPOINTMENT_STATUS':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? { ...a, status: action.payload.status } : a
        ),
      };
    case 'DELETE_APPOINTMENT':
      return { ...state, appointments: state.appointments.filter((a) => a.id !== action.payload) };

    // ----- Pharmacy (admin) -----
    case 'ADD_MEDICINE':
      return { ...state, medicines: [...state.medicines, { ...action.payload, id: nextId(state.medicines) }] };
    case 'RESTOCK_MEDICINE':
      return {
        ...state,
        medicines: state.medicines.map((m) =>
          m.id === action.payload.id ? { ...m, stock: m.stock + action.payload.quantity } : m
        ),
      };
    case 'DELETE_MEDICINE':
      return { ...state, medicines: state.medicines.filter((m) => m.id !== action.payload) };

    // ----- Cart (patient) -----
    case 'ADD_TO_CART': {
      const medicine = action.payload;
      const exists = state.cart.find((item) => item.id === medicine.id);
      if (exists) {
        // do not allow more than the stock available
        if (exists.quantity >= medicine.stock) return state;
        return {
          ...state,
          cart: state.cart.map((item) => (item.id === medicine.id ? { ...item, quantity: item.quantity + 1 } : item)),
        };
      }
      return { ...state, cart: [...state.cart, { id: medicine.id, name: medicine.name, price: medicine.price, stock: medicine.stock, quantity: 1 }] };
    }
    case 'INCREASE_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity < item.stock ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREASE_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };

    // ----- Place order: reduce stock, save order, empty the cart -----
    case 'PLACE_ORDER': {
      const order = { ...action.payload, id: nextId(state.orders) };
      const medicines = state.medicines.map((m) => {
        const ordered = state.cart.find((item) => item.id === m.id);
        return ordered ? { ...m, stock: m.stock - ordered.quantity } : m;
      });
      return { ...state, medicines, orders: [...state.orders, order], cart: [] };
    }

    default:
      return state;
  }
}

const HospitalContext = createContext(null);

// load saved data from localStorage (if any)
const loadState = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? { ...defaultState, ...saved } : defaultState;
  } catch (e) {
    return defaultState;
  }
};

export function HospitalProvider({ children }) {
  const [state, dispatch] = useReducer(hospitalReducer, undefined, loadState);

  // save to localStorage every time the data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <HospitalContext.Provider value={{ state, dispatch }}>{children}</HospitalContext.Provider>;
}

// custom hook: const { state, dispatch } = useHospital();
export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) throw new Error('useHospital must be used inside HospitalProvider');
  return context;
};
