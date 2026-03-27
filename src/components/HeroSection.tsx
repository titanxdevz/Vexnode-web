import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, ExternalLink, Server, Shield, Clock, Headphones, Sparkles, Zap, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";

const FloatingParticles = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
    blur: Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            filter: `blur(${particle.blur}px)`,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const featureCards = [
    { icon: Server, title: t.features.instant, desc: t.features.instantDesc },
    { icon: Shield, title: t.features.ddos, desc: t.features.ddosDesc },
    { icon: Clock, title: t.features.uptime, desc: t.features.uptimeDesc },
    { icon: Headphones, title: t.features.support, desc: t.features.supportDesc },
  ];

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.section 
      className="relative flex items-center overflow-hidden py-20 lg:py-32 min-h-[100dvh] bg-[#030014]"
      style={{ y, opacity }}
    >
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#030014]/50 backdrop-blur-[2px]" />
      </div>

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030014] z-0" />
      
      <FloatingParticles />

      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(var(--primary-rgb), 0.25), transparent 40%)`
          )
        }}
      />
      
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(255, 119, 198, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(120, 219, 255, 0.4) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(120, 119, 198, 0.4) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="group relative inline-flex items-center gap-2 bg-black/40 border border-white/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium backdrop-blur-xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer shadow-xl">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <Zap size={16} className="animate-pulse" />
                <span className="relative z-10">{t.hero.limitedTime}</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
                <img 
                  src="/logo.png" 
                  alt="VexaNode" 
                  className="relative h-16 w-auto rounded-2xl border border-white/10 shadow-2xl"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight drop-shadow-md">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Vexa</span>
                  <span className="text-white">Node</span>
                </h2>
                <p className="text-xs font-semibold text-white/70 tracking-wider uppercase drop-shadow-sm">Premium Hosting Solutions</p>
              </div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-2xl"
            >
              {t.hero.freeHosting.split(' ').slice(0, 2).join(' ')}{" "}
              <br className="hidden sm:block" />
              <motion.span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-300 to-primary inline-block drop-shadow-lg"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                {t.hero.freeHosting.split(' ').slice(2).join(' ')}
              </motion.span>
            </motion.h1>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-10">
              <p className="text-2xl sm:text-3xl font-heading text-white italic font-medium flex items-center gap-3 drop-shadow-md">
                24/7 — No Sleep Mode
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  ✨
                </motion.span>
              </p>
              
              <div className="flex items-center gap-2 text-primary font-bold text-lg bg-black/40 backdrop-blur-md w-fit px-5 py-2.5 rounded-xl border border-primary/20 shadow-lg">
                <Sparkles size={20} className="animate-spin" style={{ animationDuration: '3s' }} />
                Powerful hosting for VPS, Discord Bots & More
              </div>
              
              <p className="text-white/80 text-lg leading-relaxed max-w-xl font-medium drop-shadow-md">
                {t.hero.subtitle}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center mb-8">
              <motion.a
                href="#pricing"
                className="group relative inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold overflow-hidden shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)] border border-primary/50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 ease-in-out" />
                {t.hero.getStarted} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#features"
                className="group inline-flex items-center gap-2 text-white hover:text-white px-8 py-4 rounded-xl border border-white/20 hover:border-white/40 bg-black/40 hover:bg-black/60 transition-all backdrop-blur-xl font-semibold shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.hero.learnMore} <ExternalLink size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </motion.a>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-sm font-semibold text-white/80 tracking-wide">
                Systems fully operational • Get started for free today
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-transparent to-purple-600/30 blur-3xl -z-10" />
            
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -8 }}
                className="group relative p-6 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-black/60 transition-all duration-300 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-purple-500 group-hover:w-full transition-all duration-500 ease-out" />
                
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center mb-5 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.5)] transition-all"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <card.icon size={26} className="text-primary group-hover:text-white transition-colors" />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all drop-shadow-sm">
                  {card.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-medium group-hover:text-white/90 transition-colors drop-shadow-sm">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;