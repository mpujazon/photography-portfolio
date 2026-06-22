import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import PrimaryButton from "../../../../shared/components/buttons/primary/PrimaryButton.tsx";
import styles from "./AboutBody.module.css";

function AboutBody() {
    const { t } = useTranslation("about");
    const navigate = useNavigate();

    return (
        <section className={styles.section}>
            <div className={styles.longVersion}>
                <p className={styles.eyebrow}>{t("body.longVersionLabel")}</p>
                <p className={styles.bodyParagraph}>{t("body.p1")}</p>
                <p className={styles.bodyParagraph}>{t("body.p2")}</p>
                <p className={styles.bodyParagraph}>{t("body.p3")}</p>
            </div>

            <div className={styles.kitMethod}>
                <p className={styles.eyebrow}>{t("body.kitLabel")}</p>
                <dl className={styles.kitList}>
                    <div className={styles.kitRow}>
                        <dt className={styles.kitTerm}>{t("body.bodiesLabel")}</dt>
                        <dd className={styles.kitDesc}>{t("body.bodies")}</dd>
                    </div>
                    <div className={styles.kitRow}>
                        <dt className={styles.kitTerm}>{t("body.sportGlassLabel")}</dt>
                        <dd className={styles.kitDesc}>{t("body.sportGlass")}</dd>
                    </div>
                    <div className={styles.kitRow}>
                        <dt className={styles.kitTerm}>{t("body.streetGlassLabel")}</dt>
                        <dd className={styles.kitDesc}>{t("body.streetGlass")}</dd>
                    </div>
                    <div className={styles.kitRow}>
                        <dt className={styles.kitTerm}>{t("body.methodLabel")}</dt>
                        <dd className={styles.kitDesc}>{t("body.method")}</dd>
                    </div>
                    <div className={styles.kitRow}>
                        <dt className={styles.kitTerm}>{t("body.postLabel")}</dt>
                        <dd className={styles.kitDesc}>{t("body.post")}</dd>
                    </div>
                </dl>
                <div className={styles.ctaWrapper}>
                    <PrimaryButton
                        label={t("body.cta")}
                        onClick={() => navigate("/contact")}
                    />
                </div>
            </div>
        </section>
    );
}

export default AboutBody;
