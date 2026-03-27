import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cpu, Wifi, ShieldCheck, RotateCcw, Settings, TrendingUp, Globe, ArrowUp } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const features = [
  { icon: Cpu, title: "High Performance", desc: "Powered by latest generation processors for blazing speed" },
  { icon: Wifi, title: "Low Latency", desc: "Optimized network infrastructure for minimal lag and delay" },
  { icon: ShieldCheck, title: "Advanced Security", desc: "Multi-layered security protocols to detect and neutralize threats in real time" },
  { icon: RotateCcw, title: "Auto Recovery", desc: "Automatic server recovery and backup systems" },
  { icon: Settings, title: "Full Control", desc: "Complete server control panel with advanced configuration options" },
  { icon: TrendingUp, title: "Resource Scaling", desc: "Dynamic resource allocation based on server demands" },
  { icon: Globe, title: "Global Network", desc: "Worldwide server locations for optimal connectivity" },
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "35/mo", label: "Starting Price" },
  { value: "30+", label: "Audio Sources" },
  { value: "4", label: "Global Regions" },
];

const FeaturesSection = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden bg-black/95" ref={ref}>
      <motion.div 
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none"
        style={{ y: y2 }}
      />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/5 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 backdrop-blur-md"
          >
            <ArrowUp size={16} className="text-primary" />
            We Won't Disappoint
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-6">
            Advanced <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary inline-block"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              Features
            </motion.span>
          </h2>
          
          <motion.p 
            className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Everything you need for reliable hosting, built on enterprise-grade infrastructure with seamless management tools.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, type: "spring", bounce: 0.3 }}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <motion.div
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 relative z-10"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <f.icon size={26} className="text-white group-hover:text-primary transition-colors duration-300" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-wide group-hover:text-primary transition-colors relative z-10">
                {f.title}
              </h3>
              
              <p className="text-sm text-white/50 leading-relaxed relative z-10">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-primary/30 transition-all duration-500 flex flex-col items-center justify-center group hover:bg-primary/[0.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              
              <motion.div 
                className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 group-hover:from-primary group-hover:to-purple-400 transition-all duration-500 mb-3 relative z-10"
              >
                {s.value}
              </motion.div>
              
              <p className="text-sm font-medium text-white/40 uppercase tracking-widest relative z-10">
                {s.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;