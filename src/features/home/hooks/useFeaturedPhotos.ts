import { useQuery } from "@tanstack/react-query";
import { getFeaturedPhotos } from "../../../shared/api/endpoints/featured-photos";

export function useFeaturedPhotos() {
    return useQuery({
        queryKey: ["public", "photos", "featured"],
        queryFn: getFeaturedPhotos,
    });
}
