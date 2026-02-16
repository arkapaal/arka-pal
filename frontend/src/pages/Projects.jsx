import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-heading font-bold text-center mb-8 text-white">{children}</h2>
);

const Card = ({ children }) => (
  <div className="p-6 bg-[#0a0a0a] border border-white/10 rounded-lg hover:border-[#a3e635]/30 transition-all">
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="px-3 py-1 bg-black border border-white/10 text-gray-400 text-xs font-medium rounded-full hover:border-[#a3e635]/30 transition-colors">
    {children}
  </span>
);

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const projects = [
    {
      title: "Hastas.ai",
      category: "AI-application",
      description:
        "An SIH problem statement based web-app that detects mudras ",
      tech: ["React", "Node.js","Flask","python"],
      link: "https://hastas-ai-a4zo.vercel.app/"
    },
    {
      title: "chatji",
      category: "chat-application",
      description:
        "An chat application that hides your identity",
      tech: ["Next.js", "Socket", "Tailwind CSS"],
      year: "2023",
      link: "https://chatji.vercel.app/"
    },
    {
      title: "Portfolio",
      category: "Web application",
      description:
        "A portfolio crafted with react js and gsap which is updated with time",
      tech: ["React", "Vite", "Tailwind css", "Vercel"],
      year: "2023",
      link: "https://arka-pal.vercel.app/"
    },
    {
      title: "Weather Analytics Dashboard",
      category: "Data Visualization",
      description:
        "Interactive weather forecasting application with real-time data visualization, location-based alerts, and historical analysis.",
      tech: ["React", "Chart.js", "OpenWeather API", "D3.js"],
      year: "2022",
      link: "https://github.com/yourusername/weather-dashboard"
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, delay: 0.2 } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="projects" className="min-h-screen flex items-center bg-black pt-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 py-32">
        <motion.div variants={titleVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <SectionTitle>Featured Projects</SectionTitle>
        </motion.div>

        <motion.p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto text-center" variants={subtitleVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          A collection of projects that showcase my skills in development and design.
          Each project represents a unique challenge and creative solution.
        </motion.p>

        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ perspective: 1200 }}>
          {projects.map((project, idx) => (
            <motion.a key={idx} href={project.link} target="_blank" rel="noopener noreferrer" variants={projectVariants} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }} className="block group relative" style={{ transformStyle: "preserve-3d" }}>
              <Card>
                <div className="flex justify-between items-start mb-4 flex-wrap gap-2">
                  <div>
                    <motion.h3 className="text-2xl font-heading font-semibold text-white mb-1 group-hover:text-[#a3e635] transition-colors duration-300">
                      {project.title}
                    </motion.h3>
                    <p className="text-sm text-gray-500">
                      {project.category}
                    </p>
                  </div>
                  <motion.span className="text-sm text-gray-400 px-3 py-1 bg-black border border-white/10 rounded-full" whileHover={{ scale: 1.1, borderColor: "rgba(163, 230, 53, 0.3)" }}>
                    {project.year}
                  </motion.span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <motion.div className="flex flex-wrap gap-2" variants={badgeContainerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                  {project.tech.map((techItem, i) => (
                    <motion.div key={i} variants={badgeVariants} whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}>
                      <Badge>{techItem}</Badge>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="mt-6 flex items-center text-[#a3e635] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>View Project</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Card>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}