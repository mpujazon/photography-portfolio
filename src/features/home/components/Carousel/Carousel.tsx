import {useEffect, useState} from "react";
import style from "./Carousel.module.css"
import { useTranslation } from "react-i18next";
import type { PhotoDto } from "../../../../shared/models/Photo";

const AUTOPLAY_INTERVAL_MS = 4000;

export type CarouselProps = {
    photos: PhotoDto[];
}

function Carousel({ photos }: CarouselProps) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const activePhotoIndex = photos.length > 0 ? currentPhotoIndex % photos.length : 0;
    const currentPhoto = photos[activePhotoIndex];
    const { t } = useTranslation('home');

    useEffect(() => {
        if (photos.length <= 1) return;

        const intervalId = window.setInterval(() => {
            setCurrentPhotoIndex((i) => (i + 1) % photos.length);
        }, AUTOPLAY_INTERVAL_MS);

        return () => window.clearInterval(intervalId);
    }, [photos.length]);

    if (!currentPhoto) return null;

    const photoNumber = String(activePhotoIndex + 1).padStart(3, "0");

    return (
        <div className={style.carouselContainer}>
            <div
                className={style.frameHeader}
                aria-label={t('carousel.frameAria',{
                    current: activePhotoIndex + 1,
                    total: photos.length
                })}
            >
                <div className={style.decorativeSquare} aria-hidden="true" />
                <p aria-hidden="true">
                    {t('carousel.frame')} <span className={style.frameNumber}>{String(activePhotoIndex + 1).padStart(3, "0")}</span> / {String(photos.length).padStart(3, "0")}
                </p>
            </div>
            <figure className={style.mainFrame}>
                <img
                    key={currentPhoto.id}
                    className={style.currentImage}
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                />
                <figcaption className={style.imageCaption}>
                    <span className={style.captionTitle}>{currentPhoto.title}</span>
                    {currentPhoto.cameraSettings?.focalLength && currentPhoto.cameraSettings?.shutterSpeed && (
                        <span className={style.captionExif}>{currentPhoto.cameraSettings.focalLength} · {currentPhoto.cameraSettings.shutterSpeed}{currentPhoto.cameraSettings.aperture && ` · ${currentPhoto.cameraSettings.aperture}`}</span>
                    )}
                </figcaption>
                {photos.length > 1 && (
                    <div
                        key={activePhotoIndex}
                        className={style.progressBar}
                        aria-hidden="true"
                    />
                )}
            </figure>

            <div className={style.thumbnailStrip} aria-label={t('carousel.carouselThumbnails')}>
                {photos.map((photo, index) => (
                    <button
                        className={`${style.thumbnailButton} ${index === activePhotoIndex ? style.thumbnailButtonActive : ""}`}
                        type="button"
                        key={photo.id}
                        onClick={() => setCurrentPhotoIndex(index)}
                        aria-label={t('carousel.showPhoto', {photoTitle: photo.title})}
                        aria-current={index === activePhotoIndex ? "true" : undefined}
                    >
                        <img
                            className={style.thumbnailImage}
                            src={photo.url}
                            alt={photo.title}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
