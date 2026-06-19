import { useEffect } from "react";
import type { PictureDto } from "../../models/Picture";
import styles from "./Visualizer.module.css";
import { useDragZoom } from "./hooks/useDragZoom";
import { useVisualizerKeyboard } from "./hooks/useVisualizerKeyboard";
import VisualizerPanel from "./VisualizerPanel";
import { useTranslation } from "react-i18next";

type VisualizerProps = {
    pictures:     PictureDto[];
    currentIndex: number;
    onClose:      () => void;
    onNavigate:   (index: number) => void;
};

function Visualizer({ pictures, currentIndex, onClose, onNavigate }: VisualizerProps) {
    const { t } = useTranslation("common");
    const picture = pictures[currentIndex];
    const total   = pictures.length;
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < total - 1;

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

    const wrapperClass = [
        styles.imageWrapper,
        isZoomed && !isDragging ? styles.imageWrapperZoomed   : "",
        isZoomed &&  isDragging ? styles.imageWrapperDragging : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.container} onClick={(e) => e.stopPropagation()}>

                <div className={styles.imageArea}>
                    <button
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={() => !isZoomed && hasPrev && onNavigate(currentIndex - 1)}
                        disabled={!hasPrev || isZoomed}
                        aria-label={t("visualizer.ariaPrevious")}
                    >‹</button>

                    <div
                        className={wrapperClass}
                        style={isZoomed ? { transform: `translate(${offset.x}px, ${offset.y}px)` } : undefined}
                        {...mouseHandlers}
                        {...touchHandlers}
                    >
                        <img
                            className={`${styles.image} ${isZoomed ? styles.imageZoomed : ""}`}
                            src={picture.url}
                            alt={picture.title}
                            draggable={false}
                        />
                    </div>

                    <button
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={() => !isZoomed && hasNext && onNavigate(currentIndex + 1)}
                        disabled={!hasNext || isZoomed}
                        aria-label={t("visualizer.ariaNext")}
                    >›</button>

                    <button
                        className={`${styles.zoomBtn} ${isZoomed ? styles.zoomBtnActive : ""}`}
                        onClick={toggleZoom}
                        aria-label={isZoomed ? t("visualizer.ariaZoomOut") : t("visualizer.ariaZoomin")}
                    >{isZoomed ? "−" : "+"}</button>
                </div>

                <VisualizerPanel
                    picture={picture}
                    currentIndex={currentIndex}
                    total={total}
                    onClose={onClose}
                />

            </div>
        </div>
    );
}

export default Visualizer;
