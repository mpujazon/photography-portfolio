import { useQuery } from "@tanstack/react-query";
import { getPublicAlbums } from "../../../shared/api/endpoints/albums";

export function usePublicAlbums() {
    return useQuery({
        queryKey: ["public", "albums"],
        queryFn: getPublicAlbums
    })
}