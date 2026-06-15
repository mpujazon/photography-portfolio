import { Module } from '@nestjs/common';
import { PublicAlbumsController } from './public-albums.controller';
import { AdminAlbumsController } from './admin-albums.controller';
import { AlbumsService } from './albums.service';

@Module({
  controllers: [PublicAlbumsController, AdminAlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
