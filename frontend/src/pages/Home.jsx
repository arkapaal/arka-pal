import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── UI Components ────────────────────────────────────────────────────────────

const Card = ({ children }) => (
  <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-sm hover:shadow-lg hover:shadow-[#a3e635]/5 hover:border-[#a3e635]/30 transition-all">
    {children}
  </div>
);

const Button = ({ children, variant = "primary" }) => (
  <button className={`px-6 py-3 rounded-lg font-semibold transition-all ${variant === "secondary" ? "bg-[#0a0a0a] text-white border border-white/10 hover:bg-[#1a1a1a] hover:border-[#a3e635]/30" : "bg-[#a3e635] text-black hover:bg-[#22c55e] hover:shadow-lg hover:shadow-[#a3e635]/20"}`}>
    {children}
  </button>
);

// ─── Projects Data ────────────────────────────────────────────────────────────

const projects = [
  {
    number: "01",
    title: "Hastas.ai",
    category: "AI Application",
    description: "An SIH problem statement based web-app that detects mudras using computer vision and machine learning models trained on hand gesture datasets.",
    longDesc: "Built during Smart India Hackathon, this app uses a Flask backend with a trained ML model to detect Indian classical dance hand gestures (mudras) in real-time via webcam.",
    tech: ["React", "Node.js", "Flask", "Python", "TensorFlow", "OpenCV"],
    year: "2024",
    link: "https://hastas-ai-a4zo.vercel.app/",
    tag: "Hackathon Project",
  },
  {
    number: "02",
    title: "Chatji",
    category: "Chat Application",
    description: "An anonymous real-time chat application that hides your identity — no sign-up, no history, just pure anonymous conversation.",
    longDesc: "Chatji uses Socket.io for real-time bidirectional communication. Users get assigned a random identity on join. All messages are ephemeral — closing the tab wipes everything.",
    tech: ["Next.js", "Socket.io", "Tailwind CSS", "Node.js", "Express"],
    year: "2023",
    link: "https://chatji.vercel.app/",
    tag: "Real-time App",
  },
  {
    number: "03",
    title: "Portfolio",
    category: "Web Application",
    description: "A portfolio crafted with React JS and GSAP featuring smooth scroll animations, horizontal sections and a Spotify now-playing widget.",
    longDesc: "This very portfolio — built to showcase creativity as much as code. Uses GSAP ScrollTrigger for horizontal scroll sections and Framer Motion for component animations.",
    tech: ["React", "Vite", "Tailwind CSS", "GSAP", "Framer Motion", "Express"],
    year: "2023",
    link: "https://arka-pal.vercel.app/",
    tag: "Personal Project",
  },
];

// ─── Project Panel ────────────────────────────────────────────────────────────

const ProjectPanel = ({ project }) => (
  <div className="w-screen h-full flex items-center justify-center px-16 relative flex-shrink-0">
    <span className="absolute right-16 top-1/2 -translate-y-1/2 text-[220px] font-black text-white/[0.03] select-none leading-none pointer-events-none">
      {project.number}
    </span>

    <div className="w-full max-w-6xl grid grid-cols-2 gap-16 items-center">

      {/* Left — text */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#a3e635] font-semibold">{project.tag}</span>
          <span className="w-8 h-px bg-[#a3e635]/40" />
          <span className="text-xs text-gray-500">{project.year}</span>
        </div>

        <h2 className="text-6xl text-white mb-3 leading-none">
          {project.title}
        </h2>

        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">{project.category}</p>

        <p className="text-xl text-gray-300 leading-relaxed mb-4">
          {project.description}
        </p>

        <p className="text-sm text-gray-500 leading-relaxed mb-8">
          {project.longDesc}
        </p>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-7 py-3 bg-[#a3e635] text-black font-bold rounded-xl hover:bg-[#22c55e] transition-colors duration-300"
        >
          <span>View Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </motion.a>
      </div>

      {/* Right — decorative card + tech stack */}
      <div className="flex flex-col gap-6">
        <div className="relative p-8 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#a3e635]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#22c55e]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <div className="text-6xl mb-6">{project.emoji}</div>
            <div className="w-full h-px bg-white/5 mb-6" />
            <div className="space-y-2 font-mono text-xs">
              <div className="flex gap-2">
                <span className="text-[#a3e635]">const</span>
                <span className="text-white">project</span>
                <span className="text-gray-500">=</span>
                <span className="text-[#22c55e]">"{project.title}"</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#a3e635]">const</span>
                <span className="text-white">year</span>
                <span className="text-gray-500">=</span>
                <span className="text-[#22c55e]">"{project.year}"</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[#a3e635]">const</span>
                <span className="text-white">status</span>
                <span className="text-gray-500">=</span>
                <span className="text-[#22c55e]">"deployed ✓"</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1.5 bg-black border border-[#a3e635]/20 text-[#a3e635] text-xs font-semibold rounded-full hover:border-[#a3e635]/60 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function Home() {
  const horizontalSectionRef = useRef(null);
  const horizontalRef = useRef(null);
  const whatIDoRef = useRef(null);
  const isWhatIDoInView = useInView(whatIDoRef, { once: true, margin: "-100px" });

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

    tl.to(wrapper, { x: -scrollWidth, ease: "none" });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const heroTextVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -30 },
    visible: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const whatIDoTitleVariants = {
    hidden: { opacity: 0, y: -50, rotateX: -45 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section id="home" className="min-h-screen flex items-center bg-black pt-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ perspective: 1000 }}>

            <motion.div variants={heroTextVariants} initial="hidden" animate="visible" style={{ transformStyle: "preserve-3d" }}>
              
              <motion.h1
                className="text-5xl md:text-6xl font-heading  text-white leading-tight mb-6"
                initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hi, I'm <span className="text-[#a3e635]">Arka</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
              >
                A passionate Full Stack Developer building modern web applications with React, Node.js and databases.
              </motion.p>
              <motion.div
                className="flex space-x-4"
                initial="hidden" animate="visible"
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.5 } } }}
              >
                {[{ label: "View Projects" }, { label: "Contact Me", sectionId: "contact", variant: "secondary" }].map(({ label, sectionId, variant }) => (
                  <motion.div
                    key={label}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={() => {scrollToSection(sectionId)}} variant={variant}>
                      {label}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-6" initial="hidden" animate="visible" style={{ perspective: 1000 }}>
              {[
                { title: "Frontend", content: "React, Vite, Tailwind, HTML, CSS, JavaScript" },
                { title: "Backend", content: "Node.js, Express, REST APIs" },
                { title: "Database", content: "MySQL, MongoDB, PostgreSQL" },
                { title: "Tools", content: "Git, GitHub, VS Code, Docker" },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
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

      {/* ── Horizontal Scroll: Featured Projects ─────────────────────────── */}
      <section ref={horizontalSectionRef} className="relative h-screen overflow-hidden bg-black">
        <div
          ref={horizontalRef}
          className="flex h-full items-center"
          style={{ width: `${(projects.length ) * 100}vw` }}
        >
          {/* Panel 1 — Title */}
          <div className="w-screen h-full flex items-center justify-center px-6 relative flex-shrink-0">
            <motion.div
              ref={whatIDoRef}
              variants={whatIDoTitleVariants}
              initial="hidden"
              animate={isWhatIDoInView ? "visible" : "hidden"}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-[#a3e635] mb-4 font-semibold">Portfolio</p>
              <h2 className="text-6xl md:text-7xl text-white leading-tight mb-4">
                Featured<br /><span className="text-[#a3e635]">Projects</span>
              </h2>
              <div className="w-20 h-1 bg-[#a3e635] mx-auto mb-6" />
              <p className="text-xl text-gray-400 max-w-md mx-auto mb-8">
                A collection of work that showcases my skills in development and design.
              </p>
              <motion.div
                className="flex items-center justify-center gap-2 text-gray-500 text-sm"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>Scroll to explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Panels — One project each */}
          {projects.map((project) => (
            <ProjectPanel key={project.number} project={project} />
          ))}

        </div>
      </section>
    </>
  );
}