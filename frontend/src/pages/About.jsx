import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import image from "../assets/image-arka.jpeg"
const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-heading font-bold text-center mb-16 text-white">{children}</h2>
);

const SectionDivider = () => (
  <div className="w-20 h-1 bg-[#a3e635] mb-6"></div>
);

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -45, transformPerspective: 1000 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transformPerspective: 1000,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100, rotateY: 45, transformPerspective: 1000 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transformPerspective: 1000,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="min-h-screen flex items-center bg-[#0a0a0a] pt-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 py-32">
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <SectionTitle>About Me</SectionTitle>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-16 items-center" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ perspective: 1000 }}>
          <motion.div variants={textVariants} style={{ transformStyle: "preserve-3d" }}>
            <motion.h3 className="text-2xl font-heading font-semibold text-white mb-4" variants={paragraphVariants}>
              Hello, I'm Arka Pal
            </motion.h3>

            <motion.div variants={paragraphVariants}>
              <SectionDivider />
            </motion.div>

            <motion.p className="text-gray-400 mb-4 leading-relaxed" variants={paragraphVariants}>
              I’m a Computer Science student who genuinely enjoys figuring out how things work. Whether it’s understanding algorithms, debugging code at 2AM, or breaking down concepts like gradient descent and search strategies, I like going deeper than just memorizing solutions. For me, tech isn’t just about writing code — it’s about understanding the logic behind it.
            </motion.p>

            <motion.p className="text-gray-400 mb-4 leading-relaxed" variants={paragraphVariants}>
            I love building things and experimenting with new tools. From creating smooth, animated interfaces using Framer Motion and GSAP to exploring backend concepts and enterprise tools like SAP during my internship, I’m always trying to expand my skill set. I enjoy blending creativity with problem-solving — making things that not only work well but also look and feel good.
            </motion.p>

            <motion.p className="text-gray-400 leading-relaxed" variants={paragraphVariants}>
              Right now, I’m focused on growing every day — improving my DSA skills, strengthening my fundamentals, and building projects that challenge me. I’m still exploring my exact niche, but one thing is clear: I want to become a developer who builds meaningful, well-crafted digital experiences.
            </motion.p>
          </motion.div>

          <motion.div className="flex items-center justify-center" variants={imageVariants} style={{ transformStyle: "preserve-3d" }}>
            <motion.div className="w-full h-96 bg-gradient-to-br from-[#0a0a0a] to-black flex items-center justify-center border border-white/10 rounded-lg shadow-lg hover:shadow-[#a3e635]/10" whileHover={{ rotateY: 5, rotateX: 5, scale: 1.02, borderColor: "rgba(163, 230, 53, 0.3)", transition: { duration: 0.3 } }} style={{ transformStyle: "preserve-3d" }}>
              <img
                src={image}
                alt="Arka Pal"
                className="w-full h-full object-cover rounded-lg"
              />

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
