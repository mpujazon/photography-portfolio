import { type PictureDto } from './Picture';

export interface AlbumDto {
    id:           number;
    slug:         string;
    title:        string;
    description?: string;
    coverPhotoUrl?:     string;
    isFeatured:   boolean;
}

export interface AlbumDetailDto extends AlbumDto {
    pictures: PictureDto[];
}
