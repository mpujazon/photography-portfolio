import { useEffect, useState } from "react";
import type { PhotoDto } from "../../models/Photo";
import styles from "./Visualizer.module.css";
import { useDragZoom } from "./hooks/useDragZoom";
import { useVisualizerKeyboard } from "./hooks/useVisualizerKeyboard";
import VisualizerPanel from "./VisualizerPanel";
import { useTranslation } from "react-i18next";
import { cloudinarySrc } from "../../utils/cloudinary";

type VisualizerProps = {
    photos:       PhotoDto[];
    currentIndex: number;
    onClose:      () => void;
    onNavigate:   (index: number) => void;
};

function Visualizer({ photos, currentIndex, onClose, onNavigate }: VisualizerProps) {
    const { t } = useTranslation("common");
    const photo  = photos[currentIndex];
    const total  = photos.length;
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < total - 1;

    const [previewPhotoId, setPreviewPhotoId] = useState<number | null>(null);
    const [sharpPhotoId,   setSharpPhotoId]   = useState<number | null>(null);
    const hasPreview = previewPhotoId === photo.id;
    const isSharp    = sharpPhotoId   === photo.id;

    const loResSrc = cloudinarySrc(photo.url, 800);
    const hiResSrc = cloudinarySrc(photo.url, 1800);

    const { isZoomed, offset, isDragging, toggleZoom, mouseHandlers, touchHandlers } =
        useDragZoom({ currentIndex, hasPrev, hasNext, onNavigate });

    useVisualizerKeyboard({
        isZoomed, hasPrev, hasNext, currentIndex, onClose, onNavigate,
        onZoomOut: toggleZoom,
    });

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        const img = new window.Image();
        img.src = hiResSrc;
        img.onload = () => setSharpPhotoId(photo.id);
        return () => { img.onload = null; };
    }, [photo.id, hiResSrc]);

    useEffect(() => {
        [currentIndex - 1, currentIndex + 1]
            .filter(i => i >= 0 && i < photos.length)
            .forEach(i => {
                const img = new window.Image();
                img.src = cloudinarySrc(photos[i].url, 1800);
            });
    }, [currentIndex, photos]);

    const wrapperClass = [
        styles.imageWrapper,
        isZoomed && !isDragging ? styles.imageWrapperZoomed   : "",
        isZoomed &&  isDragging ? styles.imageWrapperDragging : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>

                <div
                    className={styles.imageArea}
                    onContextMenu={(e) => e.preventDefault()}
                >
                    <button
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={() => !isZoomed && hasPrev && onNavigate(currentIndex - 1)}
                        disabled={!hasPrev || isZoomed}
                        aria-label={t("visualizer.ariaPrevious")}
                    >‹</button>

                    {!hasPreview && !isSharp && (
                        <div className={styles.imageSkeleton} aria-hidden="true" />
                    )}

                    <div
                        className={wrapperClass}
                        style={isZoomed ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : undefined}
                        {...mouseHandlers}
                        {...touchHandlers}
                    >
                        <img
                            className={`${styles.image} ${isZoomed ? styles.imageZoomed : ""}`}
                            src={isSharp ? hiResSrc : loResSrc}
                            alt={photo.title}
                            draggable={false}
                            decoding="async"
                            fetchPriority="high"
                            onLoad={() => setPreviewPhotoId(photo.id)}
                            style={{
                                opacity: hasPreview || isSharp ? 1 : 0,
                                filter: isSharp ? undefined : "blur(16px)",
                                transition: "filter 0.4s ease, opacity 0.15s ease",
                            }}
                        />
                    </div>

                    <button
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={() => !isZoomed && hasNext && onNavigate(currentIndex + 1)}
                        disabled={!hasNext || isZoomed}
                        aria-label={t("visualizer.ariaNext")}
                    >›</button>

                    {isSharp && (
                        <div className={styles.watermark} aria-hidden="true">LENSBYMIKE</div>
                    )}

                    <button
                        className={`${styles.zoomBtn} ${isZoomed ? styles.zoomBtnActive : ""}`}
                        onClick={toggleZoom}
                        aria-label={isZoomed ? t("visualizer.ariaZoomOut") : t("visualizer.ariaZoomin")}
                    >{isZoomed ? "−" : "+"}</button>
                </div>

                <VisualizerPanel
                    photo={photo}
                    currentIndex={currentIndex}
                    total={total}
                    onClose={onClose}
                />

            </div>
        </div>
    );
}

export default Visualizer;
