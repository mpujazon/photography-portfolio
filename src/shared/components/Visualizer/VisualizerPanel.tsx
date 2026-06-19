import { useState } from "react";
import type { PictureDto } from "../../models/Picture";
import styles from "./Visualizer.module.css";
import { useTranslation } from "react-i18next";

type VisualizerPanelProps = {
    picture:      PictureDto;
    currentIndex: number;
    total:        number;
    onClose:      () => void;
};

function VisualizerPanel({ picture, currentIndex, total, onClose }: VisualizerPanelProps) {
    const { t } = useTranslation("common");
    const [copied, setCopied] = useState(false);
    const idLabel = String(picture.id).padStart(3, "0");

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
                    <span>{picture.category}</span>
                </div>
                <button className={styles.close} onClick={onClose} aria-label={t("visualizerPanel.ariaClose")}>✕</button>
            </div>

            <h2 className={styles.title}>{picture.title}</h2>
            {picture.description && <p className={styles.description}>{picture.description}</p>}

            <div className={styles.divider} />
            <p className={styles.sectionLabel}>EXIF · {t("visualizerPanel.captureDataLabel")}</p>

            <div className={styles.exifGrid}>
                {picture.cameraSettings?.cameraBody   && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.body")}</span><span className={styles.exifValue}>{picture.cameraSettings.cameraBody}</span></div>}
                {picture.cameraSettings?.lens         && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.lens")}</span><span className={styles.exifValue}>{picture.cameraSettings.lens}</span></div>}
                {picture.cameraSettings?.focalLength  && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.focalLength")}</span><span className={styles.exifValue}>{picture.cameraSettings.focalLength}mm</span></div>}
                {picture.cameraSettings?.aperture     && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.aperture")}</span><span className={styles.exifValue}>{picture.cameraSettings.aperture}</span></div>}
                {picture.cameraSettings?.shutterSpeed && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.shutter")}</span><span className={styles.exifValue}>1/{picture.cameraSettings.shutterSpeed}</span></div>}
                {picture.cameraSettings?.iso          && <div className={styles.exifItem}><span className={styles.exifLabel}>{t("visualizerPanel.iso")}</span><span className={styles.exifValue}>{picture.cameraSettings.iso}</span></div>}
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
