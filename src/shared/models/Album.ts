import { type PhotoDto } from './Photo';

export interface PublicAlbum {
    id:           number;
    slug:         string;
    title:        string;
    description?: string;
    coverPhotoUrl?:     string;
    isFeatured:   boolean;
}

export interface PublicAlbumDetail extends PublicAlbum {
    photos: PhotoDto[];
}
