import { useState } from 'react';
import { useAdminAlbums, useCreateAlbum, useUpdateAlbum, useDeleteAlbum } from '../hooks/useAdminAlbums.ts';
import styles from './AdminPage.module.css';

export function AlbumsAdminPage() {
    const { data: albums = [], isLoading } = useAdminAlbums();
    const createAlbum = useCreateAlbum();
    const updateAlbum = useUpdateAlbum();
    const deleteAlbum = useDeleteAlbum();

    const [newTitle, setNewTitle] = useState('');
    const [newSlug, setNewSlug] = useState('');

    function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        if (!newTitle || !newSlug) return;
        createAlbum.mutate({ title: newTitle, slug: newSlug }, {
            onSuccess: () => { setNewTitle(''); setNewSlug(''); }
        });
    }

    if (isLoading) return <p className={styles.loading}>Loading…</p>;

    return (
        <div className={styles.page}>
            <h1 className={styles.heading}>Albums</h1>

            <form className={styles.createForm} onSubmit={handleCreate}>
                <input
                    className={styles.input}
                    placeholder="Title"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    required
                />
                <input
                    className={styles.input}
                    placeholder="Slug (e.g. elms-2026)"
                    value={newSlug}
                    onChange={e => setNewSlug(e.target.value)}
                    required
                />
                <button className={styles.btnPrimary} type="submit" disabled={createAlbum.isPending}>
                    Add album
                </button>
            </form>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Published</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {albums.map(album => (
                        <tr key={album.id}>
                            <td>{album.title}</td>
                            <td>{album.slug}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={album.isPublished}
                                    onChange={e => updateAlbum.mutate({ id: album.id, isPublished: e.target.checked })}
                                />
                            </td>
                            <td>
                                <button
                                    className={styles.btnDanger}
                                    type="button"
                                    onClick={() => { if (confirm(`Delete "${album.title}"?`)) deleteAlbum.mutate(album.id); }}
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
