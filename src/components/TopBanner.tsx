import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TopBanner = () => {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden bg-[#030014] border-b border-white/[0.08]"
        >
          <motion.div 
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12"
            animate={{ x: ["-200%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <div className="container mx-auto px-4 py-3 flex items-center justify-center text-sm relative z-10">
            <div className="flex items-center flex-wrap justify-center gap-2 sm:gap-4 pr-8 sm:pr-0">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary animate-pulse drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]" />
                <span className="text-white/80 font-medium tracking-wide">
                  Limited Time Offer: Get <span className="text-white font-bold">20% OFF</span> on All Hosting Plans
                </span>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="group relative inline-flex items-center bg-primary/10 border border-primary/30 text-primary font-bold px-3 py-1 rounded-md text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] cursor-pointer overflow-hidden transition-all"
              >
                <div className="absolute inset-0 bg-primary/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">VEXA20</span>
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setVisible(false)} 
              className="absolute right-2 sm:right-6 p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} strokeWidth={2.5} />
            </motion.button>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBanner;