import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import type { Photo, SiteConfigEntry } from '@/types';

export function useHeroPhotos() {
  return useQuery({
    queryKey: ['hero-photos'],
    queryFn: () => apiFetch<Photo[]>('/public/photos/featured'),
  });
}

export function useSiteConfig() {
  return useQuery({
    queryKey: ['site-config'],
    queryFn: () => apiFetch<SiteConfigEntry[]>('/public/site-config'),
  });
}
