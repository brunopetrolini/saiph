import { Module } from '@nestjs/common';

import { PurchasesController } from './controllers/purchases.controller';

@Module({
  controllers: [PurchasesController],
})
export class MessagingModule {}
