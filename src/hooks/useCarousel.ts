import { useState, useCallback, useEffect } from "react";

export function useCarousel(totalItems: number, itemsPerView: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= totalItems ? 0 : prev + 1
    );
  }, [itemsPerView, totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, totalItems - itemsPerView) : prev - 1
    );
  }, [itemsPerView, totalItems]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return {
    currentIndex,
    setCurrentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
  }
}
