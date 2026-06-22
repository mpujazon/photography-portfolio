import { useQuery } from "@tanstack/react-query";
import { getPublicAlbumBySlug } from "../../../shared/api/endpoints/detail-album";


export function usePublicAlbumDetail(slug: string | undefined) {
    return useQuery({
        queryKey: ["public", "albums", slug],
        queryFn: () => getPublicAlbumBySlug(slug!),
        enabled: Boolean(slug),
    })
}