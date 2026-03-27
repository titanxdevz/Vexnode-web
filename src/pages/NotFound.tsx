import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ServerCrash, ChevronRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#030014]">
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030014]/80 to-[#030014] z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none z-0" />

      <motion.div 
        className="absolute inset-0 z-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 60% 60%, rgba(255, 119, 198, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 text-primary/40 blur-sm z-[-1]"
          >
            <ServerCrash size={120} strokeWidth={1} />
          </motion.div>
          
          <h1 className="text-[120px] sm:text-[180px] font-heading font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/20 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-4">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
            Connection Lost in the Void
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-md mx-auto leading-relaxed">
            The node you are looking for seems to have gone offline or never existed. Let's get you back to the main server.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="/"
            className="group relative inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] hover:border-primary/50 hover:bg-white/[0.05] text-white px-8 py-4 rounded-xl font-semibold backdrop-blur-md transition-all overflow-hidden shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Home size={20} className="text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10">Return to Base</span>
            <ChevronRight size={18} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;