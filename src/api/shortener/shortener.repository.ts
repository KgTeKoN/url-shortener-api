import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { urlMappings, Prisma } from '@prisma/client';

@Injectable()
export class ShortenerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.urlMappingsCreateInput): Promise<urlMappings> {
    return this.prismaService.urlMappings.create({
      data,
    });
  }

  async findUnique(where: Prisma.urlMappingsWhereUniqueInput): Promise<urlMappings> {
    return this.prismaService.urlMappings.findUnique({
      where,
    });
  }
}
