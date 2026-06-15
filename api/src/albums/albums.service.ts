import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { Prisma } from '@prisma/client';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  findAllPublic() {
    return this.prisma.album.findMany({
      where: { isPublished: true },
      include: { coverPhoto: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findBySlugPublic(slug: string) {
    const album = await this.prisma.album.findUnique({
      where: { slug, isPublished: true },
      include: {
        photos: {
          where: { isPublished: true },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  findAllAdmin() {
    return this.prisma.album.findMany({
      include: { coverPhoto: true },
      orderBy: { orderIndex: 'asc' },
    });
  }

  create(data: Prisma.AlbumCreateInput) {
    return this.prisma.album.create({ data });
  }

  async update(id: string, data: Prisma.AlbumUpdateInput) {
    await this.ensureExists(id);
    return this.prisma.album.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.album.delete({ where: { id } });
  }

  async reorder(items: { id: string; orderIndex: number }[]) {
    await this.prisma.$transaction(
      items.map(({ id, orderIndex }) =>
        this.prisma.album.update({ where: { id }, data: { orderIndex } }),
      ),
    );
  }

  private async ensureExists(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new NotFoundException('Album not found');
  }
}
