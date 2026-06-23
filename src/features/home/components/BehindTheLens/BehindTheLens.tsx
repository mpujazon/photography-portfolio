import { useTranslation } from "react-i18next";
import styles from "./BehindTheLens.module.css";
import { cloudinarySrc, cloudinarySrcSet } from "../../../../shared/utils/cloudinary";

const BEHIND_THE_LENS_URL = "https://res.cloudinary.com/lensbymike/image/upload/v1782213676/BehindTheLens_xrr8st.jpg";

function BehindTheLens() {
    const { t } = useTranslation("home");
    return (
        <section className={styles.section}>
            <div className={styles.imageColumn}>
                <img
                    className={styles.image}
                    src={cloudinarySrc(BEHIND_THE_LENS_URL, 800)}
                    srcSet={cloudinarySrcSet(BEHIND_THE_LENS_URL)}
                    sizes="(min-width: 768px) 50vw, 100vw"
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
