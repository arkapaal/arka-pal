import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-heading font-bold text-center mb-8 text-white">{children}</h2>
);

const SectionDivider = () => (
  <div className="w-20 h-1 bg-[#a3e635] mx-auto mb-6"></div>
);

const Button = ({ children, variant = "primary" }) => (
  <button className={`px-6 py-3 rounded-lg font-semibold transition-all ${variant === "secondary" ? "bg-[#0a0a0a] text-white border border-white/10 hover:bg-[#1a1a1a] hover:border-[#a3e635]/30" : "bg-[#a3e635] text-black hover:bg-[#22c55e] hover:shadow-lg hover:shadow-[#a3e635]/20"}`}>
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-sm hover:shadow-lg hover:shadow-[#a3e635]/5 hover:border-[#a3e635]/30 transition-all">
    {children}
  </div>
);

export default function Home() {
  const horizontalRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const whatIDoRef = useRef(null);
  const isWhatIDoInView = useInView(whatIDoRef, { once: true, margin: "-100px" });
  
  // Refs for card stack animations - Web Dev
  const webDevCard1Ref = useRef(null);
  const webDevCard2Ref = useRef(null);
  const webDevCard3Ref = useRef(null);
  
  // Refs for card stack animations - UI/UX
  const uiuxCard1Ref = useRef(null);
  const uiuxCard2Ref = useRef(null);
  const uiuxCard3Ref = useRef(null);

  useEffect(() => {
    const section = horizontalSectionRef.current;
    const wrapper = horizontalRef.current;

    if (!section || !wrapper) return;

    const scrollWidth = wrapper.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(wrapper, {
      x: -scrollWidth,
      ease: "none",
    });

    // Web Development Cards - Pop out from center
    if (webDevCard1Ref.current && webDevCard2Ref.current && webDevCard3Ref.current) {
      // Card 1 - pops to top-left
      gsap.fromTo(
        webDevCard1Ref.current,
        { 
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
          zIndex: 1,
        },
        {
          x: -150,
          y: -120,
          scale: 1,
          rotation: -15,
          opacity: 1,
          zIndex: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth * 0.35}`,
            scrub: 1,
          },
        }
      );

      // Card 2 - pops to top-right
      gsap.fromTo(
        webDevCard2Ref.current,
        { 
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
          zIndex: 2,
        },
        {
          x: 150,
          y: -100,
          scale: 1,
          rotation: 15,
          opacity: 1,
          zIndex: 2,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth * 0.4}`,
            scrub: 1,
          },
        }
      );

      // Card 3 - pops to bottom
      gsap.fromTo(
        webDevCard3Ref.current,
        { 
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
          zIndex: 3,
        },
        {
          x: 0,
          y: 140,
          scale: 1,
          rotation: 5,
          opacity: 1,
          zIndex: 3,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${scrollWidth * 0.45}`,
            scrub: 1,
          },
        }
      );
    }

    // UI/UX Cards - Pop out from center
    if (uiuxCard1Ref.current && uiuxCard2Ref.current && uiuxCard3Ref.current) {
      // Card 1 - pops to left
      gsap.fromTo(
        uiuxCard1Ref.current,
        { 
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
          zIndex: 1,
        },
        {
          x: -160,
          y: -80,
          scale: 1,
          rotation: -20,
          opacity: 1,
          zIndex: 1,
          scrollTrigger: {
            trigger: section,
            start: () => `+=${scrollWidth * 0.5}`,
            end: () => `+=${scrollWidth * 0.85}`,
            scrub: 1,
          },
        }
      );

      // Card 2 - pops to right
      gsap.fromTo(
        uiuxCard2Ref.current,
        { 
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
          zIndex: 2,
        },
        {
          x: 160,
          y: -60,
          scale: 1,
          rotation: 20,
          opacity: 1,
          zIndex: 2,
          scrollTrigger: {
            trigger: section,
            start: () => `+=${scrollWidth * 0.55}`,
            end: () => `+=${scrollWidth * 0.9}`,
            scrub: 1,
          },
        }
      );

      // Card 3 - pops to bottom center
      gsap.fromTo(
        uiuxCard3Ref.current,
        { 
          x: 0,
          y: 0,
          scale: 0,
          rotation: 0,
          opacity: 0,
          zIndex: 3,
        },
        {
          x: 0,
          y: 150,
          scale: 1,
          rotation: -5,
          opacity: 1,
          zIndex: 3,
          scrollTrigger: {
            trigger: section,
            start: () => `+=${scrollWidth * 0.6}`,
            end: () => `+=${scrollWidth * 0.95}`,
            scrub: 1,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const heroTextVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -30 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const whatIDoTitleVariants = {
    hidden: { opacity: 0, y: -50, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <>
      <section id="home" className="min-h-screen flex items-center bg-black pt-24">
        <div className="max-w-6xl mx-auto px-6 py-32">
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ perspective: 1000 }}>
            <motion.div variants={heroTextVariants} initial="hidden" animate="visible" style={{ transformStyle: "preserve-3d" }}>
              <motion.h1 className="text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                Hi, I'm <span className="text-[#a3e635]">Arka</span>
              </motion.h1>

              <motion.p className="text-xl text-gray-400 mb-8 leading-relaxed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                A passionate Full Stack Developer building modern web applications with React, Node.js and databases.
              </motion.p>

              <motion.div className="flex space-x-4" variants={buttonContainerVariants} initial="hidden" animate="visible">
                <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button>View Projects</Button>
                </motion.div>
                <motion.div variants={buttonVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="secondary">Contact Me</Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-6" initial="hidden" animate="visible" style={{ perspective: 1000 }}>
              {[
                { title: "Frontend", content: "React, Vite, Tailwind, HTML, CSS, JavaScript" },
                { title: "Backend", content: "Node.js, Express, REST APIs" },
                { title: "Database", content: "MySQL, MongoDB, PostgreSQL" },
                { title: "Tools", content: "Git, GitHub, VS Code, Docker" },
              ].map((card, index) => (
                <motion.div key={index} initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }} whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} style={{ transformStyle: "preserve-3d" }}>
                  <Card>
                    <h3 className="text-xl font-heading font-semibold mb-2 text-white">{card.title}</h3>
                    <p className="text-gray-400 text-sm">{card.content}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section ref={horizontalSectionRef} className="relative h-screen overflow-hidden bg-gradient-to-r from-black to-[#0a0a0a]">
        <div ref={horizontalRef} className="flex h-full items-center" style={{ width: "300vw" }}>
          {/* Panel 1 - Title */}
          <div className="w-screen h-full flex items-center justify-center px-6">
            <motion.div ref={whatIDoRef} variants={whatIDoTitleVariants} initial="hidden" animate={isWhatIDoInView ? "visible" : "hidden"} style={{ transformStyle: "preserve-3d" }} className="text-center">
              <SectionTitle>What I Do</SectionTitle>
              <SectionDivider />
              <p className="text-xl text-gray-400 mt-6">
                Scroll to explore my expertise →
              </p>
            </motion.div>
          </div>

          {/* Panel 2 - Web Development with card stack */}
          <div className="w-screen h-full flex items-center justify-center px-20 relative" style={{ perspective: "1500px" }}>
            {/* Center point for cards to pop from */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Card 1 - Code Editor */}
              <div 
                ref={webDevCard1Ref}
                className="absolute w-64 h-80 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl border-2 border-[#a3e635]/40 shadow-2xl shadow-[#a3e635]/20 backdrop-blur-sm p-6 flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-6xl mb-4">💻</div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#a3e635] mb-2">Frontend</h4>
                  <p className="text-sm text-gray-400">Building responsive UIs with React & Tailwind</p>
                </div>
              </div>

              {/* Card 2 - Server */}
              <div 
                ref={webDevCard2Ref}
                className="absolute w-64 h-80 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border-2 border-[#22c55e]/40 shadow-2xl shadow-[#22c55e]/20 backdrop-blur-sm p-6 flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-6xl mb-4">⚡</div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#22c55e] mb-2">Backend</h4>
                  <p className="text-sm text-gray-400">Scalable APIs with Node.js & Express</p>
                </div>
              </div>

              {/* Card 3 - Database */}
              <div 
                ref={webDevCard3Ref}
                className="absolute w-64 h-80 bg-gradient-to-br from-[#0a0a0a] to-black rounded-2xl border-2 border-[#a3e635]/60 shadow-2xl shadow-[#a3e635]/30 backdrop-blur-sm p-6 flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-6xl mb-4">🗄️</div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#a3e635] mb-2">Database</h4>
                  <p className="text-sm text-gray-400">MongoDB, PostgreSQL & Redis</p>
                </div>
              </div>
            </div>

            <motion.div className="max-w-2xl relative z-10" whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <Card>
                <div className="p-8">
                  <h3 className="text-4xl font-heading font-bold mb-6 text-[#a3e635]">
                    Web Development
                  </h3>
                  <p className="text-xl text-gray-400 leading-relaxed mb-6">
                    Building fast, responsive and scalable web applications using modern frameworks and best practices.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'Vite', 'Node.js', 'Express', 'Tailwind'].map((tech) => (
                      <span key={tech} className="px-4 py-2 bg-black border border-[#a3e635]/30 text-[#a3e635] rounded-full text-sm font-semibold">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Panel 3 - UI/UX Design with card stack */}
          <div className="w-screen h-full flex items-center justify-center px-20 relative" style={{ perspective: "1500px" }}>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Card 1 - Design Tools */}
              <div 
                ref={uiuxCard1Ref}
                className="absolute w-64 h-80 bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-2xl border-2 border-[#a3e635]/40 shadow-2xl shadow-[#a3e635]/20 backdrop-blur-sm p-6 flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-6xl mb-4">🎨</div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#a3e635] mb-2">Design Tools</h4>
                  <p className="text-sm text-gray-400">Figma, Adobe XD & Sketch</p>
                </div>
              </div>

              {/* Card 2 - User Research */}
              <div 
                ref={uiuxCard2Ref}
                className="absolute w-64 h-80 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border-2 border-[#22c55e]/40 shadow-2xl shadow-[#22c55e]/20 backdrop-blur-sm p-6 flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#22c55e] mb-2">User Research</h4>
                  <p className="text-sm text-gray-400">Understanding user needs & behavior</p>
                </div>
              </div>

              {/* Card 3 - Prototyping */}
              <div 
                ref={uiuxCard3Ref}
                className="absolute w-64 h-80 bg-gradient-to-br from-[#0a0a0a] to-black rounded-2xl border-2 border-[#a3e635]/60 shadow-2xl shadow-[#a3e635]/30 backdrop-blur-sm p-6 flex flex-col justify-between"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="text-6xl mb-4">✨</div>
                <div>
                  <h4 className="text-xl font-heading font-bold text-[#a3e635] mb-2">Prototyping</h4>
                  <p className="text-sm text-gray-400">Interactive wireframes & mockups</p>
                </div>
              </div>
            </div>

            <motion.div className="max-w-2xl relative z-10" whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
              <Card>
                <div className="p-8">
                  <h3 className="text-4xl font-heading font-bold mb-6 text-[#a3e635]">
                    UI / UX Design
                  </h3>
                  <p className="text-xl text-gray-400 leading-relaxed mb-6">
                    Designing clean and user-friendly interfaces with focus on usability and performance.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Figma', 'Responsive Design', 'Accessibility', 'User Research'].map((skill) => (
                      <span key={skill} className="px-4 py-2 bg-black border border-[#a3e635]/30 text-[#a3e635] rounded-full text-sm font-semibold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}