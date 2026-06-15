import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PublicPhotosController } from './public-photos.controller';
import { AdminPhotosController } from './admin-photos.controller';
import { PhotosService } from './photos.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    CloudinaryModule,
    MulterModule.register({ storage: memoryStorage() }),
  ],
  controllers: [PublicPhotosController, AdminPhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
