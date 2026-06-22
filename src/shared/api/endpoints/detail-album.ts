import { type PublicAlbumDetail } from "../../models/Album";
import httpClient from "../httpClient";

export function getPublicAlbumBySlug(slug: string): Promise<PublicAlbumDetail> {
    return httpClient.get<PublicAlbumDetail>(`/albums/${slug}`);
}