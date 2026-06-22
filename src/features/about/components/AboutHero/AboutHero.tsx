import { useTranslation } from "react-i18next";
import styles from "./AboutHero.module.css";

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
                    src="/about-picture.png"
                    alt={t("hero.imageAlt")}
                    loading="eager"
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
