import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch, authHeaders } from '@/lib/api';
import type { SiteConfigEntry } from '@/types';

export function useAdminConfig() {
    return useQuery({
        queryKey: ['admin-site-config'],
        queryFn: () => apiFetch<SiteConfigEntry[]>('/admin/site-config', { headers: authHeaders() }),
    });
}

export function useUpdateConfig() {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (entries: Record<string, string>) =>
            apiFetch<SiteConfigEntry[]>('/admin/site-config', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', ...authHeaders() },
                body: JSON.stringify(entries),
            }),
        onSuccess: () => {
            void qc.invalidateQueries({ queryKey: ['admin-site-config'] });
            void qc.invalidateQueries({ queryKey: ['site-config'] });
        },
    });
}
