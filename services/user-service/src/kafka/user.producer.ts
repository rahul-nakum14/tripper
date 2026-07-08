import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer } from 'kafkajs';
import { KAFKA_TOPICS } from '@ride/shared';

@Injectable()
export class UserProducer implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly producer: Producer;

  constructor(private readonly configService: ConfigService) {
    const broker = this.configService.get<string>('KAFKA_BROKER') || 'localhost:9092';
    this.kafka = new Kafka({
      clientId: 'user-service',
      brokers: [broker],
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async userRegistered(user: { id: string; email: string; role: string }) {
    await this.producer.send({
      topic: KAFKA_TOPICS.USER.REGISTERED,
      messages: [
        {
          key: user.id,
          value: JSON.stringify({
            userId: user.id,
            email: user.email,
            role: user.role,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
  }

  async userProfileUpdated(user: { id: string; email: string }) {
    await this.producer.send({
      topic: KAFKA_TOPICS.USER.PROFILE_UPDATED,
      messages: [
        {
          key: user.id,
          value: JSON.stringify({
            userId: user.id,
            email: user.email,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
  }
}