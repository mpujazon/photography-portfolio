import { forwardRef, useState, useEffect, useRef, useCallback } from "react";
import type { PhotoDto } from "../../models/Photo";
import styles from "./PhotoCard.module.css";
import { useTranslation } from "react-i18next";
import { cloudinarySrc, cloudinarySrcSet } from "../../utils/cloudinary";

type PhotoCardProps = {
    photo: PhotoDto;
    onClick?: () => void;
    onImageLoad?: () => void;
    onImageError?: () => void;
    loading?: "lazy" | "eager";
}

const PhotoCard = forwardRef<HTMLDivElement, PhotoCardProps>(
    ({ photo, onClick, onImageLoad, onImageError, loading = "lazy" }, ref) => {
        const { t } = useTranslation("common");
        const [hasError, setHasError] = useState(false);
        const settledRef = useRef(false);

        useEffect(() => {
            setHasError(false);
            settledRef.current = false;
        }, [photo.id]);

        const handleLoad = useCallback(() => {
            if (settledRef.current) return;
            settledRef.current = true;
            onImageLoad?.();
        }, [onImageLoad]);

        const handleError = useCallback(() => {
            if (settledRef.current) return;
            settledRef.current = true;
            setHasError(true);
            onImageError?.();
        }, [onImageError]);

        // Fires synchronously when the <img> enters the DOM.
        // If the image is already in browser cache (complete before onLoad can fire),
        // we call onImageLoad here so loadedCount is never stuck.
        const imgRef = useCallback((el: HTMLImageElement | null) => {
            if (el === null) {
                settledRef.current = false;
                return;
            }
            if (el.complete && el.naturalWidth > 0 && !settledRef.current) {
                settledRef.current = true;
                onImageLoad?.();
            }
        }, [onImageLoad]);

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
                {hasError ? (
                    <div className={styles.imageFallback} />
                ) : (
                    <img
                        ref={imgRef}
                        className={styles.image}
                        src={cloudinarySrc(photo.url, 800)}
                        srcSet={cloudinarySrcSet(photo.url)}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        alt={photo.title}
                        loading={loading}
                        decoding="async"
                        onLoad={handleLoad}
                        onError={handleError}
                    />
                )}
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
