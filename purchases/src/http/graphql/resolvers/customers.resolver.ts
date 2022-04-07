import { UseGuards } from '@nestjs/common';
import {
  Parent,
  Query,
  ResolveField,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql';

import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CustomersService } from '../../../services/customers.service';
import { Customer } from '../models/customer.model';
import { Purchase } from '../models/purchase.model';
import { PurchasesService } from '../../../services/purchases.service';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private readonly customersService: CustomersService,
    private readonly purchasesService: PurchasesService,
  ) {}

  @Query(() => Customer)
  @UseGuards(AuthorizationGuard)
  async me(@CurrentUser() user: AuthUser) {
    return await this.customersService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField(() => Purchase)
  async purchases(@Parent() customer: Customer) {
    return await this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customersService.getCustomerByAuthUserId(reference.authUserId);
  }
}
