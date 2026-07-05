export enum TripStatus {
  REQUESTED = 'REQUESTED',
  DRIVER_ASSIGNED = 'DRIVER_ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum RideType {
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
  XL = 'XL',
}

export enum CancellationSource {
  PASSENGER = 'PASSENGER',
  DRIVER = 'DRIVER',
  SYSTEM = 'SYSTEM',
  TIMEOUT = 'TIMEOUT',
}

export interface Trip {
  id: string;
  passengerId: string;
  driverId?: string;
  status: TripStatus;
  rideType: RideType;
  pickupLatitude: number;
  pickupLongitude: number;
  pickupAddress?: string;
  destinationLatitude: number;
  destinationLongitude: number;
  destinationAddress?: string;
  fare?: number;
  currency: string;
  distanceKm?: number;
  durationMinutes?: number;
  cancellationReason?: string;
  cancellationSource?: CancellationSource;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripRequest {
  passengerId: string;
  rideType: RideType;
  pickupLatitude: number;
  pickupLongitude: number;
  pickupAddress?: string;
  destinationLatitude: number;
  destinationLongitude: number;
  destinationAddress?: string;
}
