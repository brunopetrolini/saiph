import { Query, Resolver } from '@nestjs/graphql';
import { Products } from '@prisma/client';

import { ProductsService } from '../../../services/products.service';
import { Product } from '../models/product.model';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products(): Promise<Products[]> {
    return await this.productsService.listAllProducts();
  }
}
