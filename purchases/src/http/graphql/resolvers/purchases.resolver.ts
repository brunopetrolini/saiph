import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/products.service';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly productsService: ProductsService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async purchases() {
    return await this.purchasesService.listAllPurchases();
  }

  @ResolveField(() => Product)
  async product(@Parent() purchase: Purchase) {
    return await this.productsService.getProductById(purchase.productId);
  }
}
