import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    password: string;
    role?: string;
  }) {
    return this.userService.createUser(data);
  }

  @GrpcMethod('UserService', 'GetUser')
  async getUser(data: { id: string }) {
    return this.userService.getUser(data.id);
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: {
    id: string;
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
  }) {
    return this.userService.updateUser(data);
  }
}