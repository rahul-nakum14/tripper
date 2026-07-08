import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

export interface UserGrpcService {
  createUser(data: {
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    password: string;
    role?: string;
  }): Observable<any>;
  getUser(data: { id: string }): Observable<any>;
  updateUser(data: {
    id: string;
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
  }): Observable<any>;
}

@Injectable()
export class UserGrpcClient implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '..', '..', '..', '..', 'proto', 'user.proto'),
      url: process.env.USER_SERVICE_GRPC_URL || 'localhost:50051',
    },
  })
  private readonly client: ClientGrpc;

  public service: UserGrpcService;

  onModuleInit() {
    this.service = this.client.getService<UserGrpcService>('UserService');
  }
}