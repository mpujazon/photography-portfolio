import { useEffect } from "react";

type UseVisualizerKeyboardParams = {
    isZoomed:     boolean;
    hasPrev:      boolean;
    hasNext:      boolean;
    currentIndex: number;
    onClose:      () => void;
    onNavigate:   (index: number) => void;
    onZoomOut:    () => void;
};

export function useVisualizerKeyboard({
    isZoomed, hasPrev, hasNext, currentIndex, onClose, onNavigate, onZoomOut,
}: UseVisualizerKeyboardParams): void {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                if (isZoomed) onZoomOut();
                else onClose();
            }
            if (isZoomed) return;
            if (e.key === "ArrowLeft"  && hasPrev) onNavigate(currentIndex - 1);
            if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentIndex, hasPrev, hasNext, isZoomed, onClose, onNavigate, onZoomOut]);
}
