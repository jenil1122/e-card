import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-deep-black"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="splash-logo-container relative"
        >
          <img
            src="https://jenil1122.github.io/Contact/logo.png"
            alt="New Abra Ka Dabra Logo"
            className="w-32 h-32 mx-auto object-contain bg-black rounded-full"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-rich-gold mt-6 font-serif text-xl"
        >
          New Abra Ka Dabra
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
