import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch, authHeaders } from '@/lib/api';
import type { Photo } from '@/types';

export function useAdminPhotos() {
    return useQuery({
        queryKey: ['admin-photos'],
        queryFn: () => apiFetch<Photo[]>('/admin/photos', { headers: authHeaders() }),
    });
}

export function useUploadPhoto() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (formData: FormData) =>
            apiFetch<Photo>('/admin/photos', {
                method: 'POST',
                headers: authHeaders(),
                body: formData,
            }),
        onSuccess: () => {
            void qc.invalidateQueries({ queryKey: ['admin-photos'] });
            void qc.invalidateQueries({ queryKey: ['hero-photos'] });
        },
    });
}

export function useUpdatePhoto() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: Partial<Photo> & { id: string }) =>
            apiFetch<Photo>(`/admin/photos/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
                body: JSON.stringify(data),
            }),
        onSuccess: () => {
            void qc.invalidateQueries({ queryKey: ['admin-photos'] });
            void qc.invalidateQueries({ queryKey: ['hero-photos'] });
        },
    });
}

export function useDeletePhoto() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) =>
            apiFetch(`/admin/photos/${id}`, { method: 'DELETE', headers: authHeaders() }),
        onSuccess: () => {
            void qc.invalidateQueries({ queryKey: ['admin-photos'] });
            void qc.invalidateQueries({ queryKey: ['hero-photos'] });
        },
    });
}
