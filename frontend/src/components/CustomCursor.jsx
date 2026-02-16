import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    // Smooth follow with requestAnimationFrame
    const updateCursor = () => {
      if (cursor && cursorDot) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        cursor.style.left = `${posRef.current.x}px`;
        cursor.style.top = `${posRef.current.y + scrollY}px`;
        cursorDot.style.left = `${posRef.current.x}px`;
        cursorDot.style.top = `${posRef.current.y + scrollY}px`;
      }
      animationFrameRef.current = requestAnimationFrame(updateCursor);
    };

    const moveCursor = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, input, textarea, [role="button"], .cursor-pointer, .group'
      );

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });
    };

    updateInteractiveElements();
    const interval = setInterval(updateInteractiveElements, 2000);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    
    animationFrameRef.current = requestAnimationFrame(updateCursor);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-transform duration-100 ${
          isHovering ? "scale-150" : isClicking ? "scale-75" : "scale-100"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`relative w-12 h-12 rounded-full backdrop-blur-lg transition-all duration-200 ${
            isHovering
              ? "bg-[#a3e635]/20 border-2 border-[#a3e635]/60"
              : "bg-white/5 border border-white/20"
          }`}
          style={{
            backdropFilter: "blur(12px)",
            boxShadow: isHovering
              ? "0 0 40px rgba(163, 230, 53, 0.4), inset 0 0 30px rgba(163, 230, 53, 0.1)"
              : "0 0 25px rgba(255, 255, 255, 0.1), inset 0 0 15px rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
        </div>
      </div>

      <div
        ref={cursorDotRef}
        className={`fixed rounded-full pointer-events-none z-[9999] transition-all duration-75 ${
          isClicking ? "w-3 h-3" : "w-2 h-2"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, #a3e635 0%, #22c55e 100%)",
          boxShadow: "0 0 15px rgba(163, 230, 53, 1), 0 0 30px rgba(163, 230, 53, 0.5)",
        }}
      />
    </>
  );
}