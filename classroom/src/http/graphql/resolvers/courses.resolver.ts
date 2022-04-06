import { Resolver } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';

import { Course } from '../models/course.model';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}
}
