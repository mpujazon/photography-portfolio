import { useParams } from "react-router";
import { useTranslation } from "react-i18next";
import ErrorMessage from "../../../../shared/components/ErrorMessage/ErrorMessage";
import Gallery from "../../../../shared/components/Gallery/Gallery";
import GallerySkeleton from "../../../../shared/components/Gallery/GallerySkeleton";
import { usePublicAlbumDetail } from "../../hooks/usePublicAlbumDetail";
import styles from "./AlbumDetailPage.module.css";

function AlbumDetailSkeleton() {
    return (
        <section className={styles.page} aria-hidden="true">
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    <span className={styles.skeletonLabel} />
                    <span className={styles.skeletonTitle} />
                    <span className={styles.skeletonDescription} />
                </div>
                <div className={styles.metaTable}>
                    {Array.from({ length: 3 }, (_, i) => (
                        <div key={i} className={styles.metaRow}>
                            <span className={styles.skeletonMetaLabel} />
                            <span className={styles.skeletonMetaValue} />
                        </div>
                    ))}
                </div>
            </div>
            <GallerySkeleton />
        </section>
    );
}

function AlbumDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { data, isPending, isError, error, refetch } = usePublicAlbumDetail(slug);
    const { t } = useTranslation("albums");

    if (isPending) return <AlbumDetailSkeleton />;
    if (isError) return (
        <div className={styles.errorWrapper}>
            <ErrorMessage description={error.message} onRetry={refetch} />
        </div>
    );

    const firstPhoto = data.photos[0];
    const category = firstPhoto?.category;
    const gear = [
        firstPhoto?.cameraSettings?.camera,
        firstPhoto?.cameraSettings?.lens,
    ].filter(Boolean).join(" · ");

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    {data.subtitle && (
                        <p className={styles.label}>{data.subtitle}</p>
                    )}
                    <h1 className={styles.title}>{data.title}</h1>
                    {data.description && (
                        <p className={styles.description}>{data.description}</p>
                    )}
                </div>

                <div className={styles.metaTable}>
                    {category && (
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>{t("detail.meta.category")}</span>
                            <span className={styles.metaValue}>{category}</span>
                        </div>
                    )}
                    {gear && (
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>{t("detail.meta.gear")}</span>
                            <span className={styles.metaValue}>{gear}</span>
                        </div>
                    )}
                    <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>{t("detail.meta.frames")}</span>
                        <span className={styles.metaValue}>{data.numberOfPhotos}</span>
                    </div>
                </div>
            </div>
            <Gallery photos={data.photos} />
        </section>
    );
}

export default AlbumDetailPage;
