import { useEffect, useState } from "react";
import style from "./Carousel.module.css"
import { useTranslation } from "react-i18next";
import { cloudinarySrc, cloudinarySrcSet } from "../../../../shared/utils/cloudinary";
import { useFeaturedPhotos } from "../../hooks/useFeaturedPhotos";
import ErrorMessage from "../../../../shared/components/ErrorMessage/ErrorMessage";

const AUTOPLAY_INTERVAL_MS = 4000;
const THUMBNAIL_COUNT = 5;

function CarouselSkeleton() {
    return (
        <div className={style.carouselContainer} aria-hidden="true">
            <div className={style.frameHeader}>
                <span className={style.skeletonFrameHeader} />
            </div>
            <div className={style.skeletonMainFrame} />
            <div className={style.thumbnailStrip}>
                {Array.from({ length: THUMBNAIL_COUNT }, (_, i) => (
                    <div key={i} className={style.skeletonThumbnail} />
                ))}
            </div>
        </div>
    );
}

function Carousel() {
    const { t } = useTranslation('home');
    const { data: photos, isPending, isError, error, refetch } = useFeaturedPhotos();
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const activePhotoIndex = photos && photos.length > 0 ? currentPhotoIndex % photos.length : 0;
    const currentPhoto = photos?.[activePhotoIndex];

    useEffect(() => {
        if (!photos || photos.length <= 1) return;

        const intervalId = window.setInterval(() => {
            setCurrentPhotoIndex((i) => (i + 1) % photos.length);
        }, AUTOPLAY_INTERVAL_MS);

        return () => window.clearInterval(intervalId);
    }, [photos?.length]);

    useEffect(() => {
        if (!photos) return;
        photos.forEach(({ url }) => {
            const img = new Image();
            img.srcset = cloudinarySrcSet(url);
            img.sizes = "(max-width: 767px) 100vw, 50vw";
        });
    }, [photos]);

    if (isPending) return <CarouselSkeleton />;
    if (isError) return <ErrorMessage description={error.message} onRetry={refetch} />;
    if (!currentPhoto) return null;

    return (
        <div className={style.carouselContainer}>
            <div
                className={style.frameHeader}
                aria-label={t('carousel.frameAria', {
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
                    src={cloudinarySrc(currentPhoto.url, 1200)}
                    srcSet={cloudinarySrcSet(currentPhoto.url)}
                    sizes="(max-width: 767px) 100vw, 50vw"
                    alt={currentPhoto.title}
                    decoding="async"
                    fetchPriority="high"
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
                        aria-label={t('carousel.showPhoto', { photoTitle: photo.title })}
                        aria-current={index === activePhotoIndex ? "true" : undefined}
                    >
                        <img
                            className={style.thumbnailImage}
                            src={cloudinarySrc(photo.url, 200)}
                            alt={photo.title}
                            loading="lazy"
                            decoding="async"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
