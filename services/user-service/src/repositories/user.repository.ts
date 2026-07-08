import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByPhone(phone: string) {
    return this.prisma.user.findUnique({ where: { phone } });
  }

  async create(data: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    passwordHash: string;
    role: string;
  }) {
    return this.prisma.user.create({ data });
  }

  async update(
    id: string,
    data: Partial<{
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      isVerified: boolean;
    }>,
  ) {
    return this.prisma.user.update({ where: { id }, data });
  }
}