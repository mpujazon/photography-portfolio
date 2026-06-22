import { useTranslation } from "react-i18next";
import { usePublicAlbums } from "../../../albums/hooks/usePublicAlbums.ts";
import styles from "./AboutStats.module.css";

const SHOOTING_SINCE = 2018;

function pad(n: number): string {
    return String(n).padStart(2, "0");
}

function AboutStats() {
    const { t } = useTranslation("about");
    const { data: albums } = usePublicAlbums();

    const years = new Date().getFullYear() - SHOOTING_SINCE;
    const albumCount = albums?.length;

    return (
        <div className={styles.wrapper}>
            <div className={styles.grid}>
                <div className={styles.cell}>
                    <span className={styles.number}>{pad(years)}</span>
                    <span className={styles.label}>{t("stats.yearsLabel")}</span>
                </div>
                <div className={styles.cell}>
                    <span className={styles.number}>
                        {albumCount !== undefined ? pad(albumCount) : "—"}
                    </span>
                    <span className={styles.label}>{t("stats.albumsLabel")}</span>
                </div>
                <div className={styles.cell}>
                    <span className={styles.number} aria-hidden="true">∞</span>
                    <span className={styles.label}>{t("stats.framesLabel")}</span>
                </div>
            </div>
        </div>
    );
}

export default AboutStats;
