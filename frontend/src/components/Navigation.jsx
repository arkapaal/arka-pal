import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [smoother, setSmoother] = useState(null);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
    { id: "resume", label: "Resume", isResume: true }
  ];

  useEffect(() => {
    const getScrollSmoother = async () => {
      const { ScrollSmoother } = await import('gsap/ScrollSmoother');
      const smootherInstance = ScrollSmoother.get();
      setSmoother(smootherInstance);
    };
    const timer = setTimeout(getScrollSmoother, 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && smoother) {
      smoother.scrollTo(element, true, "top 80px");
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => scrollToSection("home")} className="text-xl font-heading font-bold cursor-pointer text-white hover:text-[#a3e635] transition-colors">
    
        </button>
        <div className="flex gap-8 items-center" >
          {navLinks.map((link) =>
            link.isResume ? (
              <a key={link.id} href="/Resume-Arka Pal.pdf" download className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#a3e635] transition border border-white/10 px-3 py-1.5 rounded-md hover:border-[#a3e635]/30" >
                <Download size={16} />
                {link.label}
              </a>
            ) : (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-sm text-gray-400 hover:text-[#a3e635] transition-colors font-medium">
                {link.label}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}