import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

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
}
