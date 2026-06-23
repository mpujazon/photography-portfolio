import { useTranslation } from "react-i18next";
import styles from "./AboutHero.module.css";
import { cloudinarySrc, cloudinarySrcSet } from "../../../../shared/utils/cloudinary";

const ABOUT_PICTURE_URL = "https://res.cloudinary.com/lensbymike/image/upload/v1782213676/about-picture_p4rrpp.png";

function AboutHero() {
    const { t } = useTranslation("about");
    return (
        <section className={styles.section}>
            <div className={styles.textColumn}>
                <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
                <h1 className={styles.heading}>
                    <span className={styles.nameLine}>{t("hero.firstName")}</span>
                    <span className={styles.nameLineAccent}>{t("hero.lastName")}</span>
                </h1>
                <p className={styles.paragraph}>{t("hero.paragraph")}</p>
            </div>

            <div className={styles.imageColumn}>
                <img
                    className={styles.image}
                    src={cloudinarySrc(ABOUT_PICTURE_URL, 800)}
                    srcSet={cloudinarySrcSet(ABOUT_PICTURE_URL)}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    alt={t("hero.imageAlt")}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
                <div className={styles.caption}>
                    <span>{t("hero.captionType")}</span>
                    <span>{t("hero.captionLocation")}</span>
                </div>
            </div>
        </section>
    );
}

export default AboutHero;
