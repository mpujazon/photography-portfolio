import {type PublicAlbum } from "../../models/Album";
import httpClient from "../httpClient";

export function getPublicAlbums(): Promise<PublicAlbum[]> {
    return httpClient.get<PublicAlbum[]>("/albums");
}