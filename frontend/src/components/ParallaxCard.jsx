import { motion, useMotionValue, useTransform } from "framer-motion";

const ParallaxCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <motion.div
        className="w-80 h-48 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-xl"
        style={{ rotateX, rotateY, perspective: 1000 }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      />
    </div>
  );
};

export default ParallaxCard;
