import { useTranslation } from "react-i18next";
import styles from "./BehindTheLens.module.css";

function BehindTheLens() {
    const { t } = useTranslation("home");
    return (
        <section className={styles.section}>
            <div className={styles.imageColumn}>
                <img
                    className={styles.image}
                    src="/BehindTheLens.jpg"
                    alt={t("behindTheLens.imageAlt")}
                    loading="lazy"
                    decoding="async"
                />
            </div>

            <div className={styles.textColumn}>
                <p className={styles.eyebrow}>{t("behindTheLens.subtitle")}</p>
                <blockquote className={styles.quote}>
                    {t("behindTheLens.quote")}
                </blockquote>
                <p className={styles.paragraph}>
                    {t("behindTheLens.paragraph")}
                </p>
                <p className={styles.author}>
                    Miguel Pujazón
                    <span className={styles.authorDot}>·</span>
                    Barcelona
                    <span className={styles.authorDot}>·</span>
                    {t("behindTheLens.catalonia")}
                </p>
            </div>
        </section>
    );
}

export default BehindTheLens;
