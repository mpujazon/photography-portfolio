import { useQuery } from "@tanstack/react-query";
import { getFeaturedAlbum } from "../../../shared/api/endpoints/featured-album";

export function useFeaturedAlbum() {
    return useQuery({
        queryKey: ["public", "albums", "featured"],
        queryFn: getFeaturedAlbum,
    });
}
