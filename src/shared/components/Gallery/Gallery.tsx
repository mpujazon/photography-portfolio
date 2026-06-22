import { useEffect } from "react";
import { useSearchParams } from "react-router";
import PhotoCard from "../PhotoCard/PhotoCard";
import Visualizer from "../Visualizer/Visualizer";
import type { PhotoDto } from "../../models/Photo";
import style from "./Gallery.module.css";

type GalleryProps = {
    photos: PhotoDto[];
}

function Gallery({ photos }: GalleryProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const photoId = searchParams.get("photo");
    const openIndex = photoId !== null
        ? photos.findIndex(p => String(p.id) === photoId)
        : -1;

    const openPhoto = (index: number) => setSearchParams({ photo: String(photos[index].id) }, { replace: true });
    const closePhoto = () => setSearchParams({}, { replace: true });

    useEffect(() => {
        if (photoId !== null && openIndex === -1) setSearchParams({});
    }, [photoId, openIndex, setSearchParams]);

    return (
        <>
            <div className={style.gallery}>
                {photos.map((photo, index) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        onClick={() => openPhoto(index)}
                    />
                ))}
            </div>

            {openIndex !== -1 && (
                <Visualizer
                    photos={photos}
                    currentIndex={openIndex}
                    onClose={closePhoto}
                    onNavigate={openPhoto}
                />
            )}
        </>
    );
}

export default Gallery;
