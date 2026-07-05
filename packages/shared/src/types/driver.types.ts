export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
  ON_TRIP = 'ON_TRIP',
}

export interface Driver {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: DriverStatus;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  driverId: string;
  make: string;
  model: string;
  year: number;
  color: string;
  licensePlate: string;
  capacity: number;
}

export interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  timestamp: number;
}

export interface CreateDriverRequest {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicle: Omit<Vehicle, 'id' | 'driverId'>;
}
