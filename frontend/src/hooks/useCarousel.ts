import { useState, useCallback, useEffect } from "react";

export function useCarousel(
  totalItems: number,
  itemsPerView: number,
  autoplay: boolean = true
) {
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay);

  // We add clones to the start and end, so the initial index is offset.
  // This lets us start on the "real" first slide.
  const [currentIndex, setCurrentIndex] = useState(itemsPerView);

  // --- Navigation Logic ---
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // --- Autoplay ---
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // --- The Infinite Loop Handler ---
  // This effect "jumps" the carousel without an animation when it reaches the cloned slides.
  useEffect(() => {
    // If we've scrolled to the cloned items at the END
    if (currentIndex === totalItems + itemsPerView) {
      const timer = setTimeout(() => {
        setIsTransitioning(false); // Turn off animation
        setCurrentIndex(itemsPerView); // Jump to the real first slide
      }, 500); // Must match your transition duration
      return () => clearTimeout(timer);
    }

    // If we've scrolled to the cloned items at the START
    if (currentIndex === itemsPerView - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false); // Turn off animation
        setCurrentIndex(totalItems + itemsPerView - 1); // Jump to the real last slide
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, itemsPerView, totalItems]);

  // --- Re-enable transitions ---
  // This effect turns transitions back on after a jump.
  useEffect(() => {
    if (isTransitioning === false) {
      requestAnimationFrame(() => {
        setIsTransitioning(true);
      });
    }
  }, [isTransitioning]);
  
  // --- Active Dot Calculation ---
  // Calculates which dot should be active based on the middle item in view.
  // It uses the modulo operator to wrap around correctly for an infinite loop.
  const middleItemOffset = Math.floor(itemsPerView / 2);
  const activeDotIndex = (currentIndex - itemsPerView + middleItemOffset) % totalItems;


  return {
    currentIndex,
    isTransitioning,
    activeDotIndex,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
    // We expose a direct setter for the dots to use
    // It calculates the correct starting index for the slide window.
    handleDotClick: (index: number) => {
      setCurrentIndex(index + itemsPerView);
    },
  };
}