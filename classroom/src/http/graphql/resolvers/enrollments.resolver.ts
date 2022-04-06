import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { CoursesService } from '../../../services/courses.service';
import { EnrollmentsService } from '../../../services/enrollments.service';
import { StudentsService } from '../../../services/students.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Course } from '../models/course.model';
import { Enrollment } from '../models/enrollment.model';
import { Student } from '../models/student.model';

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
  constructor(
    private readonly enrollmentsService: EnrollmentsService,
    private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
  ) {}

  @Query(() => [Enrollment])
  @UseGuards(AuthorizationGuard)
  async enrollments() {
    return await this.enrollmentsService.listAllEnrollments();
  }

  @ResolveField(() => Student)
  async student(@Parent() enrollment: Enrollment) {
    return await this.studentsService.getStudentById(enrollment.studentId);
  }

  @ResolveField(() => Course)
  async course(@Parent() enrollment: Enrollment) {
    return await this.coursesService.getCourseById(enrollment.courseId);
  }
}
