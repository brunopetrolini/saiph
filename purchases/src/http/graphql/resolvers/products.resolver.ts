import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

import { ProductsService } from '../../../services/products.service';
import { CreateProductInput } from '../inputs/create-product.input';
import { Product } from '../models/product.model';

@Resolver()
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productsService.listAllProducts();
  }

  @Mutation(() => Product)
  @UseGuards(AuthorizationGuard)
  async createProduct(
    @Args('data') data: CreateProductInput,
  ): Promise<Product> {
    return await this.productsService.createProduct(data);
  }
}
