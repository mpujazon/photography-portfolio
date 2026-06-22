import { useTranslation } from "react-i18next";
import styles from "./ContactHero.module.css";

function ContactHero() {
    const { t } = useTranslation("contact");
    return (
        <section className={styles.section}>
            <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
            <h1 className={styles.heading}>
                <span className={styles.headingWhite}>{t("hero.headingWhite")}</span>
                <span className={styles.headingAccent}>{t("hero.headingAccent")}</span>
            </h1>
            <p className={styles.paragraph}>{t("hero.paragraph")}</p>
        </section>
    );
}

export default ContactHero;
