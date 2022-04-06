import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllPurchases() {
    return await this.prisma.purchases.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
