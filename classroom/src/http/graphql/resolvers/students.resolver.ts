import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { EnrollmentsService } from '../../../services/enrollments.service';

import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Enrollment } from '../models/enrollment.model';
import { Student } from '../models/student.model';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField(() => [Enrollment])
  async enrollments(@Parent() student: Student) {
    return await this.enrollmentsService.getEnrollmentsByStudentId(student.id);
  }
}
