import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return await this.prisma.customers.findUnique({
      where: { authUserId },
    });
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    return await this.prisma.customers.create({
      data: { authUserId },
    });
  }
}
