import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { PrismaService } from '../prisma/prisma.service';
import { AuthorizationGuard } from './auth/authorization.guard';

@Resolver()
export class TestResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello GraphQl';
  }
}
