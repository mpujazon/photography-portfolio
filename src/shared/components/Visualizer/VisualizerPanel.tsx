import { useState } from "react";
import type { PhotoDto } from "../../models/Photo";
import styles from "./Visualizer.module.css";
import { useTranslation } from "react-i18next";

type VisualizerPanelProps = {
    photo:        PhotoDto;
    currentIndex: number;
    total:        number;
    onClose:      () => void;
};

function VisualizerPanel({ photo, currentIndex, total, onClose }: VisualizerPanelProps) {
    const { t } = useTranslation("common");
    const [copied, setCopied] = useState(false);
    const idLabel = String(photo.id).padStart(3, "0");

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className={styles.panel}>
            <div className={styles.panelHeader}>
                <div className={styles.meta}>
                    <span>{t("visualizerPanel.idLabel")} {idLabel}</span>
                    <span className={styles.metaDot}>·</span>
                    <span>{photo.category}</span>
                </div>
                <button className={styles.close} onClick={onClose} aria-label={t("visualizerPanel.ariaClose")}>✕</button>
            </div>

            <h2 className={styles.title}>{photo.title}</h2>
            {photo.description && <p className={styles.description}>{photo.description}</p>}

            <div className={styles.divider} />
            <p className={styles.sectionLabel}>EXIF · {t("visualizerPanel.captureDataLabel")}</p>

            <div className={styles.exifGrid}>
                {photo.cameraSettings?.camera   && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.body")}</span><span className={styles.exifValue}>{photo.cameraSettings.camera}</span></div>}
                {photo.cameraSettings?.lens         && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.lens")}</span><span className={styles.exifValue}>{photo.cameraSettings.lens}</span></div>}
                {photo.cameraSettings?.focalLength  && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.focalLength")}</span><span className={styles.exifValue}>{photo.cameraSettings.focalLength}</span></div>}
                {photo.cameraSettings?.aperture     && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.aperture")}</span><span className={styles.exifValue}>{photo.cameraSettings.aperture}</span></div>}
                {photo.cameraSettings?.shutterSpeed && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.shutter")}</span><span className={styles.exifValue}>{photo.cameraSettings.shutterSpeed}</span></div>}
                {photo.cameraSettings?.iso          && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.iso")}</span><span className={styles.exifValue}>{photo.cameraSettings.iso}</span></div>}
            </div>

            <div className={styles.divider} />
            <p className={styles.sectionLabel}>{t("visualizerPanel.share")}</p>
            <button
                className={`${styles.shareBtn} ${copied ? styles.shareBtnCopied : ""}`}
                onClick={handleCopyLink}
                aria-label={t("visualizerPanel.ariaShare")}
            >
                {copied ? t("visualizerPanel.linkCopied") : t("visualizerPanel.copyLink")}
            </button>

            <div className={styles.counter}>
                {t("visualizerPanel.currentImage",{
                    currentImage: currentIndex + 1,
                    total: total
                })}
            </div>
        </div>
    );
}

export default VisualizerPanel;
