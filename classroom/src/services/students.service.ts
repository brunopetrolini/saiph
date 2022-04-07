import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllStudents() {
    return await this.prisma.students.findMany();
  }

  async getStudentByAuthUserId(authUserId: string) {
    return await this.prisma.students.findUnique({
      where: { authUserId },
    });
  }

  async getStudentById(id: string) {
    return this.prisma.students.findUnique({
      where: { id },
    });
  }

  async createStudent({ authUserId }: CreateStudentParams) {
    return await this.prisma.students.create({
      data: { authUserId },
    });
  }
}
