import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import PhotoCard from "../PhotoCard/PhotoCard";
import Visualizer from "../Visualizer/Visualizer";
import GallerySkeleton from "./GallerySkeleton";
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

    const [loadedCount, setLoadedCount] = useState(0);
    const allLoaded = photos.length === 0 || loadedCount >= photos.length;

    const photosKey = photos.map(p => p.id).join(',');
    useEffect(() => { setLoadedCount(0); }, [photosKey]);

    const handleImageSettled = useCallback(() => {
        setLoadedCount(c => c + 1);
    }, []);

    const openPhoto = (index: number) => setSearchParams({ photo: String(photos[index].id) }, { replace: true });
    const closePhoto = () => setSearchParams({}, { replace: true });

    useEffect(() => {
        if (photoId !== null && openIndex === -1) setSearchParams({});
    }, [photoId, openIndex, setSearchParams]);

    return (
        <>
            {!allLoaded && <GallerySkeleton count={photos.length} />}
            <div
                className={style.gallery}
                style={!allLoaded ? { visibility: "hidden", height: 0, overflow: "hidden" } : undefined}
                aria-hidden={!allLoaded || undefined}
            >
                {photos.map((photo, index) => (
                    <PhotoCard
                        key={photo.id}
                        photo={photo}
                        onClick={() => openPhoto(index)}
                        onImageLoad={handleImageSettled}
                        onImageError={handleImageSettled}
                        loading="eager"
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
