import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

interface PurchaseCustomer {
  authUserId: string;
}

interface PurchaseProduct {
  id: string;
  title: string;
  slug: string;
}

interface PurchaseCreatedPayload {
  customer: PurchaseCustomer;
  product: PurchaseProduct;
}

@Controller()
export class PurchasesController {
  @EventPattern('purchases.purchase-created')
  async purchaseCreated(@Payload('value') payload: PurchaseCreatedPayload) {
    console.log(payload);
  }
}
