import styles from './AlbumCardSkeleton.module.css';

function AlbumCardSkeleton() {
    return (
        <article className={styles.card} aria-hidden="true">
            <div className={styles.albumNumber} />

            <div className={styles.albumInfo}>
                <div className={styles.title} />
                <div className={styles.subtitle} />
                <div className={styles.paragraph} />
            </div>

            <div className={styles.coverContainer} />
        </article>
    );
}

export default AlbumCardSkeleton;
