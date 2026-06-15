import { Controller, Get, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('public/albums')
export class PublicAlbumsController {
  constructor(private albums: AlbumsService) {}

  @Get()
  findAll() {
    return this.albums.findAllPublic();
  }

  @Get(':slug/photos')
  findBySlug(@Param('slug') slug: string) {
    return this.albums.findBySlugPublic(slug);
  }
}
