import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function InteractiveAvatar() {
  const avatarRef = useRef(null);
  const containerRef = useRef(null);
  const trailsRef = useRef([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const avatar = avatarRef.current;

    if (!container || !avatar) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      // Parallax effect - avatar follows mouse
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      gsap.to(avatar, {
        x: deltaX * 30,
        y: deltaY * 30,
        rotation: deltaX * 5,
        duration: 0.8,
        ease: "power2.out",
      });

      // Create glass trail
      createGlassTrail(x, y);
    };

    // Create glass trail effect
    const createGlassTrail = (x, y) => {
      const trail = document.createElement("div");
      trail.className = "glass-trail";
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      container.appendChild(trail);
      trailsRef.current.push(trail);

      // Animate trail
      gsap.fromTo(
        trail,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 2,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            container.removeChild(trail);
            trailsRef.current = trailsRef.current.filter((t) => t !== trail);
          },
        }
      );
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      trailsRef.current.forEach((trail) => {
        if (container.contains(trail)) {
          container.removeChild(trail);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
    >
      {/* Avatar/Image */}
      <div ref={avatarRef} className="relative">
        {/* Replace with your actual image/SVG */}
        <img
          src="frontend\public\fun-3d-cartoon-teenage-boy.jpg"  // Put your image here
          alt="Avatar"
          className="w-96 h-96 object-contain filter drop-shadow-2xl"
          draggable="false"
        />
        
        {/* Glow effect behind avatar */}
        <div className="absolute inset-0 bg-[#a3e635]/20 blur-3xl -z-10 animate-pulse" />
      </div>

      {/* Glass trail styles injected */}
      <style jsx>{`
        .glass-trail {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(163, 230, 53, 0.3) 0%,
            rgba(34, 197, 94, 0.1) 50%,
            transparent 100%
          );
          backdrop-filter: blur(10px);
          border: 2px solid rgba(163, 230, 53, 0.4);
          box-shadow: 0 0 30px rgba(163, 230, 53, 0.3),
            inset 0 0 20px rgba(163, 230, 53, 0.1);
          pointer-events: none;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  );
}