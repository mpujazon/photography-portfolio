import { Trans, useTranslation } from "react-i18next";
import style from "./FeaturedAlbum.module.css";
import TertiaryButton from "../../../../shared/components/buttons/tertiary/TertiaryButton";
import { useNavigate } from "react-router";
import Gallery from "../../../../shared/components/Gallery/Gallery";
import type { PictureDto } from "../../../../shared/models/Picture";

type FeaturedAlbumProps = {
    pictures: PictureDto[];
}

function FeaturedAlbum(props: FeaturedAlbumProps) {
    const { t } = useTranslation("home");
    const navigate = useNavigate();

    return (
        <section className={style.featuredAlbumSection}>
            <div className={style.featuredAlbumShell}>
                <header className={style.header}>
                    <div className={style.header__textContainer}>
                        <span className={style.header__subtitle}>ALBUM NAMe</span>
                        <h2 className={style.header__title}>
                            <Trans i18nKey="featuredAlbum.title" t={t}>
                                <span className={style.yellow}></span>
                            </Trans>
                        </h2>
                    </div>
                    <TertiaryButton
                        label={t("featuredAlbum.allAlbumsCTA") }
                        onClick={() => navigate("/albums")}
                    />
                </header>
                <Gallery pictures={props.pictures}/>
            </div>
        </section>
    )
}

export default FeaturedAlbum;
