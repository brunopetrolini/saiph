import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllProducts(): Promise<Products[]> {
    return await this.prisma.products.findMany();
  }
}
