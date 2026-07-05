export const REDIS_KEYS = {
  DRIVER_LOCATION: (driverId: string) => `driver:location:${driverId}`,
  DRIVERS_NEARBY: 'drivers:nearby',
  RATE_LIMIT: (userId: string, endpoint: string) => `rate_limit:${userId}:${endpoint}`,
  JWT_BLACKLIST: (jti: string) => `jwt:blacklist:${jti}`,
  TRIP_STATUS: (tripId: string) => `trip:status:${tripId}`,
};
