import { forwardRef } from "react";
import type { PhotoDto } from "../../models/Photo";
import styles from "./PhotoCard.module.css";
import { useTranslation } from "react-i18next";
import { cloudinarySrc, cloudinarySrcSet } from "../../utils/cloudinary";

type PhotoCardProps = {
    photo: PhotoDto;
    onClick?: () => void;
}

const PhotoCard = forwardRef<HTMLDivElement, PhotoCardProps>(
    ({ photo, onClick }, ref) => {
        const { t } = useTranslation("common");
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
            }
        };

        return (
            <div
                ref={ref}
                className={styles.photoCard}
                onClick={onClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`${t("photoCard.ariaViewPhoto")} ${photo.title}`}
            >
                <img
                    className={styles.image}
                    src={cloudinarySrc(photo.url, 800)}
                    srcSet={cloudinarySrcSet(photo.url)}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    alt={photo.title}
                    loading="lazy"
                    decoding="async"
                />
                <div className={styles.overlay}>
                    <span className={styles.overlayLabel}>{t("photoCard.viewPhoto")}</span>
                </div>
                <div className={styles.metadata}>
                    <span className={styles.metadataId}>{photo.title}</span>
                    {photo.cameraSettings?.focalLength && photo.cameraSettings?.shutterSpeed && (
                        <span className={styles.metadataExif}>{photo.cameraSettings.focalLength} · {photo.cameraSettings.shutterSpeed}{photo.cameraSettings.aperture && ` · ${photo.cameraSettings.aperture}`}</span>
                    )}
                </div>
            </div>
        );
    }
);

export default PhotoCard;
