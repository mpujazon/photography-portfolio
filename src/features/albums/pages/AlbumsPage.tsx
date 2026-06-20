import AlbumsPageHeader from "../components/AlbumsPageHeader/AlbumsPageHeader";
import { usePublicAlbums } from "../hooks/usePublicAlbums";
import style from "./AlbumsPage.module.css";

function AlbumsPage() {
    const { data: albums, isPending, isError, error } = usePublicAlbums();
    
    return (
        <section className={style.page}>
            <AlbumsPageHeader/>
            {
                albums?.map(album => 
                    <p
                        style={{color:"white"}}
                        key={album.id}
                    >
                            {album.title} 
                    </p>
                )
            }
        </section>
    );
}

export default AlbumsPage;