import { usePublicAlbums } from "../hooks/usePublicAlbums";
import style from "./AlbumsPage.module.css";

function AlbumsPage() {
    const { data: albums, isPending, isError, error } = usePublicAlbums();
    
    return (
        <>
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
        </>
    );
}

export default AlbumsPage;