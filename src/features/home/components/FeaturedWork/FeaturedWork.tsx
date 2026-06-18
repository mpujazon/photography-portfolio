import { Trans, useTranslation } from "react-i18next";
import style from "./FeaturedWork.module.css";
import TertiaryButton from "../../../../shared/components/buttons/tertiary/TertiaryButton";
import { useNavigate } from "react-router";

function FeaturedWork() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();

    return (
        <section className={style.featuredWorkSection}>
            <div className={style.featuredWorkShell}>
            <header className={style.header}>
                <div className={style.header__textContainer}>
                    <span className={style.header__subtitle}>{t("featuredWork.subtitle")}</span>
                    <h2 className={style.header__title}>
                        <Trans i18nKey="featuredWork.title" t={t}>
                            <span className={style.yellow}></span>
                        </Trans>
                    </h2>
                </div>
                <TertiaryButton
                    label={t("featuredWork.allAlbumsCTA") }
                    onClick={() => navigate("/albums")}
                />
            </header>
            </div>
        </section>
    )
}

export default FeaturedWork;