import { Trans, useTranslation } from "react-i18next";
import styles from "./ContactHero.module.css";

function ContactHero() {
    const { t } = useTranslation("contact");
    return (
        <section className={styles.section}>
            <p className={styles.eyebrow}>{t("hero.eyebrow")}</p>
            <h1 className={styles.heading}>
                <Trans i18nKey="hero.heading" ns="contact">
                    Get in<span className={styles.headingAccent}>Touch</span>
                </Trans>
            </h1>
            <p className={styles.paragraph}>{t("hero.paragraph")}</p>
        </section>
    );
}

export default ContactHero;
