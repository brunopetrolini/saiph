import { Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from '../../../services/enrollments.service';

import { Enrollment } from '../models/enrollment.model';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(private readonly enrollmentService: EnrollmentsService) {}
}
