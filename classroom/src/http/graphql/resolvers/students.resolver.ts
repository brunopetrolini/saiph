import { Resolver } from '@nestjs/graphql';
import { StudentsService } from '../../../services/students.service';

import { Student } from '../models/student.model';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}
}
