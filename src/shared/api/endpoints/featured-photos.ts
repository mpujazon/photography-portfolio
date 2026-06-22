import { type PhotoDto } from "../../models/Photo";
import httpClient from "../httpClient";

export function getFeaturedPhotos(): Promise<PhotoDto[]> {
    return httpClient.get<PhotoDto[]>("/photos/featured");
}
