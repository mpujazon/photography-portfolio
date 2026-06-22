import styles from "./GallerySkeleton.module.css";

type GallerySkeletonProps = {
    count?: number;
};

function GallerySkeleton({ count = 9 }: GallerySkeletonProps) {
    return (
        <div className={styles.gallery} aria-hidden="true">
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className={styles.block} />
            ))}
        </div>
    );
}

export default GallerySkeleton;
