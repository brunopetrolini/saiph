import { Injectable, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';
import { PurchasesService } from '../../../services/purchases.service';
import { Purchase } from '../models/purchase.model';

@Injectable()
export class PurchasesResolver {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  async purchases() {
    return await this.purchasesService.listAllPurchases();
  }
}
