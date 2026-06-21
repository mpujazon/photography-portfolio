import { type PhotoDto } from './Photo';

export interface PublicAlbum {
    id:             number;
    slug:           string;
    title:          string;
    subtitle?:      string;
    description?:   string;
    coverPhotoUrl?: string;
    isFeatured:     boolean;
    numberOfPhotos: number; 
}

export interface PublicAlbumDetail extends PublicAlbum {
    photos: PhotoDto[];
}
