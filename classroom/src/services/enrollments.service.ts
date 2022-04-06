import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

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
}
