import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllStudents() {
    return await this.prisma.students.findMany();
  }

  async getStudentById(id: string) {
    return this.prisma.students.findUnique({
      where: { id },
    });
  }
}
