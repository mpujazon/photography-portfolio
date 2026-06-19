import { useEffect, useRef, useState } from "react";

type DragState = {
    startX:   number;
    startY:   number;
    startOx:  number;
    startOy:  number;
    currentX: number;
    currentY: number;
    moved:    boolean;
};

type UseDragZoomParams = {
    currentIndex: number;
    hasPrev: boolean;
    hasNext: boolean;
    onNavigate: (index: number) => void;
};

type UseDragZoomResult = {
    isZoomed:  boolean;
    offset:    { x: number; y: number };
    isDragging: boolean;
    toggleZoom: () => void;
    mouseHandlers: {
        onMouseDown:  (e: React.MouseEvent) => void;
        onMouseMove:  (e: React.MouseEvent) => void;
        onMouseUp:    () => void;
        onMouseLeave: () => void;
    };
    touchHandlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove:  (e: React.TouchEvent) => void;
        onTouchEnd:   (e: React.TouchEvent) => void;
    };
};

export function useDragZoom({ currentIndex, hasPrev, hasNext, onNavigate }: UseDragZoomParams): UseDragZoomResult {
    const [isZoomed,   setIsZoomed]   = useState(false);
    const [offset,     setOffset]     = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<DragState | null>(null);

    useEffect(() => {
        setIsZoomed(false);
        setOffset({ x: 0, y: 0 });
    }, [currentIndex]);

    const toggleZoom = () => {
        if (isZoomed) { setIsZoomed(false); setOffset({ x: 0, y: 0 }); }
        else setIsZoomed(true);
    };

    /* ── Mouse ── */
    const onMouseDown = (e: React.MouseEvent) => {
        if (isZoomed) e.preventDefault();
        dragRef.current = { startX: e.clientX, startY: e.clientY, startOx: offset.x, startOy: offset.y, currentX: e.clientX, currentY: e.clientY, moved: false };
        if (isZoomed) setIsDragging(true);
    };

    const onMouseMove = (e: React.MouseEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const dx = e.clientX - drag.startX;
        const dy = e.clientY - drag.startY;
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) drag.moved = true;
        if (isZoomed) setOffset({ x: drag.startOx + dx, y: drag.startOy + dy });
    };

    const onMouseUp = () => {
        const drag = dragRef.current;
        dragRef.current = null;
        setIsDragging(false);
        if (drag && !drag.moved) toggleZoom();
    };

    const onMouseLeave = () => {
        dragRef.current = null;
        setIsDragging(false);
    };

    /* ── Touch ── */
    const onTouchStart = (e: React.TouchEvent) => {
        const t = e.touches[0];
        dragRef.current = { startX: t.clientX, startY: t.clientY, startOx: offset.x, startOy: offset.y, currentX: t.clientX, currentY: t.clientY, moved: false };
    };

    const onTouchMove = (e: React.TouchEvent) => {
        const drag = dragRef.current;
        if (!drag) return;
        const t  = e.touches[0];
        const dx = t.clientX - drag.startX;
        const dy = t.clientY - drag.startY;
        drag.currentX = t.clientX;
        drag.currentY = t.clientY;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) drag.moved = true;
        if (isZoomed) setOffset({ x: drag.startOx + dx, y: drag.startOy + dy });
    };

    const onTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        const drag = dragRef.current;
        dragRef.current = null;
        if (!drag) return;

        if (!drag.moved) { toggleZoom(); return; }

        if (!isZoomed) {
            const dx = drag.currentX - drag.startX;
            const dy = drag.currentY - drag.startY;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx < 0 && hasNext) onNavigate(currentIndex + 1);
                if (dx > 0 && hasPrev) onNavigate(currentIndex - 1);
            }
        }
    };

    return {
        isZoomed,
        offset,
        isDragging,
        toggleZoom,
        mouseHandlers: { onMouseDown, onMouseMove, onMouseUp, onMouseLeave },
        touchHandlers: { onTouchStart, onTouchMove, onTouchEnd },
    };
}
