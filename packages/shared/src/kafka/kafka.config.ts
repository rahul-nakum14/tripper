export const KAFKA_CONFIG = {
  CLIENT_ID: 'ride-dispatch',
  BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
  CONSUMER_GROUP_PREFIX: 'ride-dispatch',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
};

export const getConsumerGroupId = (serviceName: string): string => {
  return `${KAFKA_CONFIG.CONSUMER_GROUP_PREFIX}-${serviceName}`;
};
