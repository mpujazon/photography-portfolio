import { forwardRef } from "react";
import type { PhotoDto } from "../../models/Photo";
import styles from "./PhotoCard.module.css";
import { useTranslation } from "react-i18next";

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
                    src={photo.url}
                    alt={photo.title}
                />
                <div className={styles.overlay}>
                    <span className={styles.overlayLabel}>{t("photoCard.viewPhoto")}</span>
                </div>
                <div className={styles.metadata}>
                    <span className={styles.metadataId}>{photo.title}</span>
                    {photo.cameraSettings?.focalLength && photo.cameraSettings?.shutterSpeed && (
                        <span className={styles.metadataExif}>{photo.cameraSettings.focalLength}MM · 1/{photo.cameraSettings.shutterSpeed}{photo.cameraSettings.aperture && ` · ${photo.cameraSettings.aperture}`}</span>
                    )}
                </div>
            </div>
        );
    }
);

export default PhotoCard;
