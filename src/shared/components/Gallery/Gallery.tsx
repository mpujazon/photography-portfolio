import { useEffect } from "react";
import { useSearchParams } from "react-router";
import PictureCard from "../PictureCard/PictureCard";
import Visualizer from "../Visualizer/Visualizer";
import type { PictureDto } from "../../models/Picture";
import style from "./Gallery.module.css";

type GalleryProps = {
    pictures: PictureDto[];
}

function Gallery({ pictures }: GalleryProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const photoId = searchParams.get("photo");
    const openIndex = photoId !== null
        ? pictures.findIndex(p => String(p.id) === photoId)
        : -1;

    const openPicture = (index: number) => setSearchParams({ photo: String(pictures[index].id) });
    const closePicture = () => setSearchParams({});

    useEffect(() => {
        if (photoId !== null && openIndex === -1) setSearchParams({});
    }, [photoId, openIndex, setSearchParams]);

    return (
        <>
            <div className={style.gallery}>
                {pictures.map((picture, index) => (
                    <PictureCard
                        key={picture.id}
                        picture={picture}
                        onClick={() => openPicture(index)}
                    />
                ))}
            </div>

            {openIndex !== -1 && (
                <Visualizer
                    pictures={pictures}
                    currentIndex={openIndex}
                    onClose={closePicture}
                    onNavigate={openPicture}
                />
            )}
        </>
    );
}

export default Gallery;
