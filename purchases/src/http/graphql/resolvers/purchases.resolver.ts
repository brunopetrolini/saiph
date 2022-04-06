import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { CreatePurchaseInput } from '../inputs/create-purchase.input';
import { Product } from '../models/product.model';
import { Purchase } from '../models/purchase.model';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly productsService: ProductsService,
    private readonly customersService: CustomersService,
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

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return await this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }
}
