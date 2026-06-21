import { useTranslation } from "react-i18next";
import ErrorMessage from "../../../shared/components/ErrorMessage/ErrorMessage";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumCardSkeleton from "../components/AlbumCard/AlbumCardSkeleton";
import AlbumsPageHeader from "../components/AlbumsPageHeader/AlbumsPageHeader";
import { usePublicAlbums } from "../hooks/usePublicAlbums";
import style from "./AlbumsPage.module.css";

function AlbumsPage() {
    const { data: albums, isPending, isError, error, refetch} = usePublicAlbums();
    const { t } = useTranslation("albums");

    const content = () => {
        if(isPending) return Array.from({ length: 5 }, (_, i) => <AlbumCardSkeleton key={i} />);
        if(isError) return <ErrorMessage description={error.message} onRetry={refetch}/>;
        if (albums.length === 0) return <p className={style.emptyState}>{t('emptyState')}</p>;
        return albums?.map((album, index) => 
                        <AlbumCard 
                            album={album}
                            index={index + 1}
                            key={album.id}
                        />
                    )
        }
    return (
        <section className={style.page}>
            <AlbumsPageHeader/>
            <div className={style.albumsList}>
                {content()}
            </div>
        </section>
    );
}

export default AlbumsPage;