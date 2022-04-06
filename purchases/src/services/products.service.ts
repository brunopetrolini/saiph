import { Injectable } from '@nestjs/common';
import { Products } from '@prisma/client';
import slugify from 'slugify';

import { PrismaService } from '../prisma/prisma.service';

interface CreateProductParams {
  title: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllProducts(): Promise<Products[]> {
    return await this.prisma.products.findMany();
  }

  async createProduct({ title }: CreateProductParams): Promise<Products> {
    const slug = slugify(title, { lower: true });

    const productWithSameSlug = await this.prisma.products.findUnique({
      where: { slug },
    });

    if (productWithSameSlug) {
      throw new Error('Another product with same slug already exists.');
    }

    return await this.prisma.products.create({
      data: { title, slug },
    });
  }
}
