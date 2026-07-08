import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { PrismaModule } from './prisma.module';
import { UserProducer } from './kafka/user.producer';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserProducer],
})
export class AppModule {}