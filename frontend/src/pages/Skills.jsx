import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-heading font-bold text-center mb-20 text-white">{children}</h2>
);

export default function Skills() {
  const ref = useRef(null);
  const logoTrackRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "Node.js", "Tailwind CSS", "GSAP"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Python", "Flask", "REST APIs" ,"ABAP"]
    },
    {
      category: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL","Redis "]
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Jest"]
    }
  ];

  // Companies/Technologies logos (you can replace with actual logo images)
  const brands = [
    "React", "Node.js", "MongoDB", "PostgreSQL", "AWS", "Docker",
    "TypeScript", "Next.js", "Tailwind", "Express", "Redis", "GraphQL"
  ];

  useEffect(() => {
    if (logoTrackRef.current) {
      const track = logoTrackRef.current;
      const totalWidth = track.scrollWidth / 2;

      gsap.to(track, {
        x: -totalWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      const handleMouseEnter = () => gsap.to(track, { timeScale: 0, duration: 0.3 });
      const handleMouseLeave = () => gsap.to(track, { timeScale: 1, duration: 0.3 });

      track.addEventListener('mouseenter', handleMouseEnter);
      track.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        gsap.killTweensOf(track);
        track.removeEventListener('mouseenter', handleMouseEnter);
        track.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  const skillsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center bg-[#0a0a0a] pt-24" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 py-32">
        <motion.div variants={titleVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionTitle>Skills & Technologies</SectionTitle>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-16" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {skillCategories.map((item, idx) => (
            <motion.div key={idx} variants={categoryVariants} className="space-y-6">
              <h3 className="text-xl font-heading font-medium text-white tracking-wide">
                {item.category}
              </h3>

              <motion.div className="flex flex-wrap gap-3" variants={skillsContainerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                {item.skills.map((skill, i) => (
                  <motion.div key={i} variants={skillVariants} whileHover={{ scale: 1.05, transition: { duration: 0.2 } }} className="group px-4 py-2 bg-black border border-white/10 rounded-lg cursor-default transition-all duration-300 relative overflow-hidden" style={{ boxShadow: '0 0 0 rgba(0, 0, 0, 0)' }} onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(163, 230, 53, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)';
                      e.currentTarget.style.borderColor = 'rgba(163, 230, 53, 0.5)';
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#a3e635]/10 via-[#22c55e]/10 to-[#a3e635]/10 blur-xl"></div>
                    
                    <span className="text-gray-400 group-hover:text-[#a3e635] text-sm font-medium relative z-10 transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Logo Carousel Section */}
      <div className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-mono text-gray-500">
              {"{ Technologies I Work With }"}
            </p>
          </div>

          <div className="overflow-hidden relative">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>

            {/* Logo track */}
            <div ref={logoTrackRef} className="flex items-center gap-16 whitespace-nowrap">
              {/* First set */}
              {brands.map((brand, idx) => (
                <div
                  key={`brand-1-${idx}`}
                  className="flex-shrink-0 text-3xl font-bold text-white/40 hover:text-[#a3e635] transition-all duration-300 cursor-pointer hover:scale-110 transform"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {brand}
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {brands.map((brand, idx) => (
                <div
                  key={`brand-2-${idx}`}
                  className="flex-shrink-0 text-3xl font-bold text-white/40 hover:text-[#a3e635] transition-all duration-300 cursor-pointer hover:scale-110 transform"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}