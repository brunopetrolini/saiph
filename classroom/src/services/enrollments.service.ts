import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

interface CreateEnrollmentParams {
  courseId: string;
  studentId: string;
}
@Injectable()
export class EnrollmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllEnrollments() {
    return await this.prisma.enrollments.findMany({
      where: { canceledAt: null },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getEnrollmentsByStudentId(id: string) {
    return await this.prisma.enrollments.findMany({
      where: {
        studentsId: id,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getEnrollmentByCourseAndStudentId({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return await this.prisma.enrollments.findFirst({
      where: {
        courseId,
        studentsId: studentId,
        canceledAt: null,
      },
    });
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return await this.prisma.enrollments.create({
      data: {
        courseId,
        studentsId: studentId,
      },
    });
  }
}
