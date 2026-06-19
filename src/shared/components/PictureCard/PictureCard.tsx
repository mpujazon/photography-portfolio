import { forwardRef } from "react";
import type { PictureDto } from "../../models/Picture";
import styles from "./PictureCard.module.css";
import { useTranslation } from "react-i18next";

type PictureCardProps = {
    picture: PictureDto;
    onClick?: () => void;
}

const PictureCard = forwardRef<HTMLDivElement, PictureCardProps>(
    ({ picture, onClick }, ref) => {
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
                className={styles.pictureCard}
                onClick={onClick}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="button"
                aria-label={`${t("pictureCard.ariaViewPicture")} ${picture.title}`}
            >
                <img
                    className={styles.image} 
                    src={picture.url}
                    alt={picture.title}
                />
                <div className={styles.overlay}>
                    <span className={styles.overlayLabel}>{t("pictureCard.viewPicture")}</span>
                </div>
                <div className={styles.metadata}>
                    <span className={styles.metadataId}>{picture.title}</span>
                    {picture.cameraSettings?.focalLength && picture.cameraSettings?.shutterSpeed && (
                        <span className={styles.metadataExif}>{picture.cameraSettings.focalLength}MM · 1/{picture.cameraSettings.shutterSpeed}{picture.cameraSettings.aperture && ` · ${picture.cameraSettings.aperture}`}</span>
                    )}
                </div>
            </div>
        );
    }
);

export default PictureCard;
