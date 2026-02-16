import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function SmoothScroll({ children }) {
  const smoothWrapper = useRef(null);
  const smoothContent = useRef(null);

  useEffect(() => {
    let smoother;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      smoother = ScrollSmoother.create({
        wrapper: smoothWrapper.current,
        content: smoothContent.current,
        smooth: 1.5, // Smoothness level (higher = smoother but heavier)
        effects: true, // Enable data-speed attributes
        smoothTouch: 0.1, // Smooth scrolling on touch devices
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      if (smoother) {
        smoother.kill();
      }
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={smoothWrapper}>
      <div id="smooth-content" ref={smoothContent}>
        {children}
      </div>
    </div>
  );
}