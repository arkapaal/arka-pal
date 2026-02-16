import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-heading font-bold text-center mb-16 text-white">{children}</h2>
);

const SectionDivider = () => (
  <div className="w-20 h-1 bg-[#a3e635] mb-6"></div>
);

const Button = ({ children }) => (
  <button className="px-6 py-3 bg-[#a3e635] text-black rounded-lg font-semibold hover:bg-[#22c55e] hover:shadow-lg hover:shadow-[#a3e635]/20 transition-all">
    {children}
  </button>
);

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="min-h-screen flex items-center bg-black pt-24" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 py-32">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} transition={{ duration: 0.6 }}>
          <SectionTitle>Lets Connect</SectionTitle>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-2xl font-heading font-semibold text-white mb-4">
              Get In Touch
            </h3>

            <SectionDivider />

            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  Email
                </h4>
                <p className="text-gray-400">emailtoarka@gmail.com</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2">
                  Location
                </h4>
                <p className="text-gray-400">Bhubneshwar,Patia</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-white">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-[#a3e635] focus:outline-none rounded-lg transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-[#a3e635] focus:outline-none rounded-lg transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-white">Message</label>
                <textarea name="message" rows="6" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-[#0a0a0a] border border-white/10 text-white focus:border-[#a3e635] focus:outline-none resize-none rounded-lg transition-colors"></textarea>
              </div>

              <Button>Send Message</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}