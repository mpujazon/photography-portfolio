import { type PhotoDto } from './Photo';

export interface AlbumDto {
    id:           number;
    slug:         string;
    title:        string;
    description?: string;
    coverPhotoUrl?:     string;
    isFeatured:   boolean;
}

export interface AlbumDetailDto extends AlbumDto {
    photos: PhotoDto[];
}
