import {useEffect, useState} from "react";
import style from "./Carousel.module.css"
import { useTranslation } from "react-i18next";
import type { PictureDto } from "../../../../shared/models/Picture";

const AUTOPLAY_INTERVAL_MS = 4000;

export type CarouselProps = {
    pictures: PictureDto[];
}

function Carousel({ pictures }: CarouselProps) {
    const [currentPictureIndex, setCurrentPictureIndex] = useState(0);
    const activePictureIndex = pictures.length > 0 ? currentPictureIndex % pictures.length : 0;
    const currentPicture = pictures[activePictureIndex];
    const { t } = useTranslation('home');

    useEffect(() => {
        if (pictures.length <= 1) return;

        const intervalId = window.setInterval(() => {
            setCurrentPictureIndex((i) => (i + 1) % pictures.length);
        }, AUTOPLAY_INTERVAL_MS);

        return () => window.clearInterval(intervalId);
    }, [pictures.length]);

    if (!currentPicture) return null;

    const pictureNumber = String(activePictureIndex + 1).padStart(3, "0");

    return (
        <div className={style.carouselContainer}>
            <div 
                className={style.frameHeader}
                aria-label={t('carousel.frameAria',{
                    current: activePictureIndex + 1,
                    total: pictures.length
                })}
            >
                <div className={style.decorativeSquare} aria-hidden="true" />
                <p aria-hidden="true">
                    {t('carousel.frame')} <span className={style.frameNumber}>{String(activePictureIndex + 1).padStart(3, "0")}</span> / {String(pictures.length).padStart(3, "0")}
                </p>
            </div>
            <figure className={style.mainFrame}>
                <img
                    key={currentPicture.id}
                    className={style.currentImage}
                    src={currentPicture.url}
                    alt={currentPicture.title}
                />
                <figcaption className={style.imageCaption}>
                    <span className={style.captionTitle}>{currentPicture.title}</span>
                    {currentPicture.cameraSettings?.focalLength && currentPicture.cameraSettings?.shutterSpeed && (
                        <span className={style.captionExif}>{currentPicture.cameraSettings.focalLength}MM · 1/{currentPicture.cameraSettings.shutterSpeed}{currentPicture.cameraSettings.aperture && ` · ${currentPicture.cameraSettings.aperture}`}</span>
                    )}
                </figcaption>
                {pictures.length > 1 && (
                    <div
                        key={activePictureIndex}
                        className={style.progressBar}
                        aria-hidden="true"
                    />
                )}
            </figure>

            <div className={style.thumbnailStrip} aria-label={t('carousel.carouselThumbnails')}>
                {pictures.map((picture, index) => (
                    <button
                        className={`${style.thumbnailButton} ${index === activePictureIndex ? style.thumbnailButtonActive : ""}`}
                        type="button"
                        key={picture.id}
                        onClick={() => setCurrentPictureIndex(index)}
                        aria-label={t('carousel.showPicture', {pictureTitle: picture.title})}
                        aria-current={index === activePictureIndex ? "true" : undefined}
                    >
                        <img
                            className={style.thumbnailImage}
                            src={picture.url}
                            alt={picture.title}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
