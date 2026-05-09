import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-heading font-bold text-center mb-16 text-white">{children}</h2>
);

const SectionDivider = () => (
  <div className="w-20 h-1 bg-[#a3e635] mx-auto mb-6"></div>
);

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Intern",
      company: "Exide Industries",
      period: "Jun 2025",
      description:
        "Gained hands-on exposure to SAP Extended Warehouse Management (EWM) processes including inbound logistics outbound logistics, and warehouse monitoring in EXIDE Industries  as intern. Assisted in understanding warehouse structure, storage types, bins, and handling units within SAP EWM. Learned fundamentals of ABAP programming, including reports, data dictionary (DDIC), internal tables, and debugging concepts"

    },
    {
      title: "Volunteer Operation Lead",
      company: "Little Paws Care",
      period: "2024-present",
      description:
        "Led a team of volunteers to organize and execute food drives supporting stray and campus dogs, successfully collecting and distributing of food. Promoted the initiative across campus through awareness campaigns, resulting in increased student  participation and donations. Developed leadership, event management, and community outreach skills while fostering a culture of empathy and social responsibility." 
    },
    {
      title: "Marketing & Outreach Coordinator",
      company: "IOT & KODEWRECK",
      period: "2024-present",
      description:
        " Planned and executed event marketing strategies to increase participant engagement and registrations in events like INNOVANCE 4.0 and AGLO ARENA. Led digital marketing and on-ground promotions across social media platforms and campus  outreach.  Coordinated with organizing teams to align branding, promotions, and communication  strategies.  Assisted in designing campaign messaging and promotional content to maximize event  visibility. "
    }
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: -50, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const experienceVariants = {
    hidden: { opacity: 0, x: -100, rotateY: -25, scale: 0.9 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const hoverVariants = {
    scale: 1.02,
    x: 10,
    rotateY: 3,
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <section id="experience" className="min-h-screen flex items-center bg-black pt-24" ref={ref}>
      <div className="max-w-6xl mx-auto font-inter px-6 py-32">
        <motion.div variants={titleVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ transformStyle: "preserve-3d", perspective: 1000 }}>
          <SectionTitle>Experience</SectionTitle>
          <SectionDivider />
        </motion.div>

        <motion.div className="space-y-12 mt-16" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"} style={{ perspective: 1000 }}>
          {experiences.map((exp, idx) => (
            <motion.div key={idx} variants={experienceVariants} whileHover={hoverVariants} className="border-l-4 border-[#a3e635] pl-6 hover:border-[#22c55e] transition-colors relative" style={{ transformStyle: "preserve-3d" }}>
              <motion.div className="absolute -left-[9px] top-2 w-4 h-4 bg-[#a3e635] rounded-full" initial={{ scale: 0, rotate: -180 }} animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }} transition={{ duration: 0.5, delay: 0.2 + idx * 0.3, ease: "backOut" }} whileHover={{ scale: 1.3, backgroundColor: "#22c55e" }} />

              <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.3 + idx * 0.3, duration: 0.5 }}>
                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                  <motion.h3 className="text-2xl font-heading font-semibold text-white" whileHover={{ color: "#a3e635", x: 5 }} transition={{ duration: 0.2 }}>
                    {exp.title}
                  </motion.h3>
                  <motion.span className="text-sm text-gray-400 font-medium px-3 py-1 bg-[#0a0a0a] border border-white/10 rounded-full" initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ delay: 0.4 + idx * 0.3, duration: 0.4 }} whileHover={{ scale: 1.1, borderColor: "rgba(163, 230, 53, 0.3)" }}>
                    {exp.period}
                  </motion.span>
                </div>

                <motion.p className="text-lg text-[#22c55e] mb-3 font-medium" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 + idx * 0.3, duration: 0.5 }}>
                  {exp.company}
                </motion.p>
                <motion.p className="text-gray-400 leading-relaxed" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.6 + idx * 0.3, duration: 0.5 }}>
                  {exp.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="mt-12 flex justify-center" initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }} transition={{ delay: 0.8 + experiences.length * 0.3, duration: 0.6 }}>
          <div className="w-12 h-12 border-2 border-[#a3e635]/30 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-[#a3e635] rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}