import { useRef } from 'react';
import { useAdminPhotos, useUploadPhoto, useUpdatePhoto, useDeletePhoto } from '../hooks/useAdminPhotos.ts';
import styles from './AdminPage.module.css';

export function PhotosAdminPage() {
    const { data: photos = [], isLoading } = useAdminPhotos();
    const uploadPhoto = useUploadPhoto();
    const updatePhoto = useUpdatePhoto();
    const deletePhoto = useDeletePhoto();
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const fd = new FormData();
        fd.append('file', file);
        fd.append('title', file.name.replace(/\.[^.]+$/, ''));
        uploadPhoto.mutate(fd);
        e.target.value = '';
    }

    if (isLoading) return <p className={styles.loading}>Loading…</p>;

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Photos</h1>

            <div className={styles.uploadRow}>
                <button className={styles.btnPrimary} type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadPhoto.isPending}>
                    {uploadPhoto.isPending ? 'Uploading…' : 'Upload photo'}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleUpload} />
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Preview</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Published</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {photos.map(photo => (
                        <tr key={photo.id}>
                            <td>
                                <img className={styles.thumb} src={photo.imageUrl} alt={photo.title} />
                            </td>
                            <td>{photo.title}</td>
                            <td>{photo.category ?? '—'}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={photo.isFeatured}
                                    onChange={e => updatePhoto.mutate({ id: photo.id, isFeatured: e.target.checked })}
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={photo.isPublished}
                                    onChange={e => updatePhoto.mutate({ id: photo.id, isPublished: e.target.checked })}
                                />
                            </td>
                            <td>
                                <button
                                    className={styles.btnDanger}
                                    type="button"
                                    onClick={() => { if (confirm(`Delete "${photo.title}"?`)) deletePhoto.mutate(photo.id); }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
