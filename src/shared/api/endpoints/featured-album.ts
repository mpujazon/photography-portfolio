import { type PublicAlbumDetail } from "../../models/Album";
import httpClient from "../httpClient";

export function getFeaturedAlbum(): Promise<PublicAlbumDetail> {
    return httpClient.get<PublicAlbumDetail>("/albums/featured");
}
