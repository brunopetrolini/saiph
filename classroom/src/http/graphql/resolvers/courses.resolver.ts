import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoursesService } from '../../../services/courses.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateCourseInput } from '../inputs/create-course.input';

import { Course } from '../models/course.model';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.coursesService.listAllCourses();
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(@Args('data') data: CreateCourseInput) {
    return this.coursesService.createCourse(data);
  }
}
