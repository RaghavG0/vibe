import { useState, useCallback, useEffect } from "react";

export function useCarousel(totalItems: number, itemsPerView: number) {
  const [currentIndex, setCurrentIndexState] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // New: setCurrentIndex with shouldAnimate option
  const setCurrentIndex = useCallback(
    (index: number, animate: boolean = true) => {
      setShouldAnimate(animate);
      setCurrentIndexState(index);
    },
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentIndexState((prev) =>
      prev + itemsPerView >= totalItems ? 0 : prev + 1
    );
    setShouldAnimate(true);
  }, [itemsPerView, totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndexState((prev) =>
      prev === 0 ? Math.max(0, totalItems - itemsPerView) : prev - 1
    );
    setShouldAnimate(true);
  }, [itemsPerView, totalItems]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return {
    currentIndex,
    setCurrentIndex,
    shouldAnimate,
    setShouldAnimate,
    isAutoPlaying,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
  };
}