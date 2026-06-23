const SRCSET_WIDTHS = [400, 800, 1200, 1600] as const;

export function cloudinarySrc(url: string, width: number): string {
    if (!url.includes('/upload/')) return url;
    return url.replace('/upload/', `/upload/q_auto,f_webp,w_${width},c_limit/`);
}

export function cloudinarySrcSet(url: string): string {
    if (!url.includes('/upload/')) return url;
    return SRCSET_WIDTHS.map(w => `${cloudinarySrc(url, w)} ${w}w`).join(', ');
}
