import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user.repository';
import { UserProducer } from '../kafka/user.producer';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userProducer: UserProducer,
  ) {}

  async createUser(data: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    password: string;
    role?: string;
  }) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.userRepo.create({
      email: data.email,
      phone: data.phone,
      firstName: data.first_name,
      lastName: data.last_name,
      passwordHash,
      role: data.role || 'PASSENGER',
    });

    await this.userProducer.userRegistered(user);

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      first_name: user.firstName,
      last_name: user.lastName,
      role: user.role,
      is_verified: user.isVerified,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }

  async getUser(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      first_name: user.firstName,
      last_name: user.lastName,
      role: user.role,
      is_verified: user.isVerified,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
    };
  }

  async updateUser(data: {
    id: string;
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
  }) {
    const user = await this.userRepo.findById(data.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updated = await this.userRepo.update(data.id, {
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone: data.phone }),
      ...(data.first_name && { firstName: data.first_name }),
      ...(data.last_name && { lastName: data.last_name }),
    });

    return {
      id: updated.id,
      email: updated.email,
      phone: updated.phone,
      first_name: updated.firstName,
      last_name: updated.lastName,
      role: updated.role,
      is_verified: updated.isVerified,
      created_at: updated.createdAt.toISOString(),
      updated_at: updated.updatedAt.toISOString(),
    };
  }
}