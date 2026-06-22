import { Trans, useTranslation } from "react-i18next";
import style from "./FeaturedAlbum.module.css";
import TertiaryButton from "../../../../shared/components/buttons/tertiary/TertiaryButton";
import { useNavigate } from "react-router";
import Gallery from "../../../../shared/components/Gallery/Gallery";
import GallerySkeleton from "../../../../shared/components/Gallery/GallerySkeleton";
import ErrorMessage from "../../../../shared/components/ErrorMessage/ErrorMessage";
import { useFeaturedAlbum } from "../../hooks/useFeaturedAlbum";

function FeaturedAlbumSkeleton() {
    return (
        <section className={style.featuredAlbumSection} aria-hidden="true">
            <div className={style.featuredAlbumShell}>
                <header className={style.header}>
                    <div className={style.header__textContainer}>
                        <span className={style.skeletonSubtitle} />
                        <span className={style.skeletonTitle} />
                    </div>
                </header>
                <GallerySkeleton />
            </div>
        </section>
    );
}

function FeaturedAlbum() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();
    const { data: album, isPending, isError, error, refetch } = useFeaturedAlbum();

    if (isPending) return <FeaturedAlbumSkeleton />;
    if (isError) return (
        <section className={style.featuredAlbumSection}>
            <div className={style.featuredAlbumShell}>
                <ErrorMessage description={error.message} onRetry={refetch} />
            </div>
        </section>
    );

    return (
        <section className={style.featuredAlbumSection}>
            <div className={style.featuredAlbumShell}>
                <header className={style.header}>
                    <div className={style.header__textContainer}>
                        <span className={style.header__subtitle}>{album.title}</span>
                        <h2 className={style.header__title}>
                            <Trans i18nKey="featuredAlbum.title" t={t}>
                                <span className={style.yellow}></span>
                            </Trans>
                        </h2>
                    </div>
                    <TertiaryButton
                        label={t("featuredAlbum.allAlbumsCTA")}
                        onClick={() => navigate("/albums")}
                    />
                </header>
                <Gallery photos={album.photos.slice(0, 12)} />
            </div>
        </section>
    );
}

export default FeaturedAlbum;
