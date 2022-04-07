import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '../prisma/prisma.service';

interface CreateCourseParams {
  title: string;
  slug?: string;
}

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllCourses() {
    return await this.prisma.courses.findMany();
  }

  async getCourseById(id: string) {
    return await this.prisma.courses.findUnique({
      where: { id },
    });
  }

  async getCourseBySlug(slug: string) {
    return await this.prisma.courses.findUnique({
      where: { slug },
    });
  }

  async createCourse({ title, slug }: CreateCourseParams) {
    const courseSlug = slug ?? slugify(title, { lower: true });

    const course = await this.prisma.courses.findUnique({
      where: { slug },
    });

    if (!course) {
      throw new Error('Course already exists.');
    }

    return this.prisma.courses.create({
      data: { title, slug: courseSlug },
    });
  }
}
