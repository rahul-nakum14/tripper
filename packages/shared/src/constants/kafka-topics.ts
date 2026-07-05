export const KAFKA_TOPICS = {
  USER: {
    REGISTERED: 'user.registered',
    PROFILE_UPDATED: 'user.profile.updated',
  },
  DRIVER: {
    STATUS_CHANGED: 'driver.status.changed',
    LOCATION_UPDATED: 'driver.location.updated',
  },
  TRIP: {
    CREATED: 'trip.created',
    DRIVER_ASSIGNED: 'trip.driver_assigned',
    IN_PROGRESS: 'trip.in_progress',
    COMPLETED: 'trip.completed',
    CANCELLED: 'trip.cancelled',
  },
  MATCH: {
    FOUND: 'match.found',
    FAILED: 'match.failed',
  },
  NOTIFICATION: {
    SEND: 'notification.send',
  },
};
