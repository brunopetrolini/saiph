import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { EnrollmentsService } from '../../../services/enrollments.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrollment } from '../models/enrollment.model';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    return await this.enrollmentsService.listAllEnrollments();
  }
}
