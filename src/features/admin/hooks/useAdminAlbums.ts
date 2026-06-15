import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch, authHeaders } from '@/lib/api';
import type { Album } from '@/types';

export function useAdminAlbums() {
    return useQuery({
        queryKey: ['admin-albums'],
        queryFn: () => apiFetch<Album[]>('/admin/albums', { headers: authHeaders() }),
    });
}

export function useCreateAlbum() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Album>) =>
            apiFetch<Album>('/admin/albums', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => void qc.invalidateQueries({ queryKey: ['admin-albums'] }),
    });
}

export function useUpdateAlbum() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: Partial<Album> & { id: string }) =>
            apiFetch<Album>(`/admin/albums/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => void qc.invalidateQueries({ queryKey: ['admin-albums'] }),
    });
}

export function useDeleteAlbum() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) =>
            apiFetch(`/admin/albums/${id}`, { method: 'DELETE', headers: authHeaders() }),
        onSuccess: () => void qc.invalidateQueries({ queryKey: ['admin-albums'] }),
    });
}
