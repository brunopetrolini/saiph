import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreatePurchaseParams {
  productId: string;
  customerId: string;
}

@Injectable()
export class PurchasesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllPurchases() {
    return await this.prisma.purchases.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async listAllFromCustomer(customerId: string) {
    return await this.prisma.purchases.findMany({
      where: { customersId: customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPurchase({ productId, customerId }: CreatePurchaseParams) {
    const product = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Product not found.');
    }

    return await this.prisma.purchases.create({
      data: {
        customersId: customerId,
        productsId: productId,
      },
    });
  }
}
