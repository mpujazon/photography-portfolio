import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { PublicAlbum } from '../../../../shared/models/Album';
import styles from './AlbumCard.module.css';
import { cloudinarySrc } from '../../../../shared/utils/cloudinary';

type AlbumCardProps = {
    album: PublicAlbum;
    index: number;
}

function AlbumCard({ album, index }: AlbumCardProps) {
    const { t } = useTranslation("albums");
    const titleId = `album-title-${album.id}`;

    return (
        <article className={styles.card} aria-labelledby={titleId}>
            <span className={styles.albumNumber} aria-hidden="true">
                {String(index).padStart(2, '0')}
            </span>

            <div className={styles.albumInfo}>
                <h2 id={titleId} className={styles.title}>
                    <Link to={`/albums/${album.slug}`} className={styles.cardLink}>
                        {album.title}
                    </Link>
                </h2>
                <span className={styles.subtitle}>{album.subtitle}</span>
                {album.description && (
                    <p className={styles.paragraph}>{album.description}</p>
                )}
            </div>

            <div className={styles.coverContainer}>
                {album.coverPhotoUrl && (
                    <img
                        src={cloudinarySrc(album.coverPhotoUrl, 800)}
                        alt=""
                        className={styles.coverImage}
                        loading="lazy"
                        decoding="async"
                    />
                )}
                <div className={styles.coverOverlay} aria-hidden="true">
                    <span className={styles.subtitle}>{album.numberOfPhotos} {t("albumCard.frames")}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.yellow}
                        width="21"
                        height="8"
                        viewBox="0 0 21 8"
                        fill="none"
                        aria-hidden="true"
                        focusable="false"
                    >
                        <path d="M15.8555 0.000488281C16.808 1.0389 17.6316 1.82845 18.3262 2.36914C19.0209 2.90983 19.6762 3.31266 20.2921 3.57764V4.06104C19.5831 4.40479 18.8956 4.84342 18.2296 5.37695C17.5635 5.91048 16.7686 6.69287 15.8448 7.72412H15.0176C15.6908 6.28467 16.3962 5.17822 17.1339 4.40479H6.10352e-05V3.31982H17.1339C16.5896 2.62516 16.21 2.10954 15.9952 1.77295C15.7803 1.43636 15.4616 0.84554 15.0391 0.000488281H15.8555V0.000488281" fill="currentColor"/>
                    </svg>
                </div>
            </div>
        </article>
    );
}

export default AlbumCard;