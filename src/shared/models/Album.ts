import { type PictureDto } from './Picture';

export interface AlbumDto {
    id:           number;
    slug:         string;
    title:        string;
    coverUrl:     string;
    isFeatured:   boolean;
    description?: string;
}

export interface AlbumDetailDto extends AlbumDto {
    pictures: PictureDto[];
}
