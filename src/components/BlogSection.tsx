import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, Clock, Tag, BookOpen } from "lucide-react";

const posts = [
  { date: "05 MAR", tag: "Lavalink", read: "8 min", title: "Best Lavalink Hosting for Discord Music Bots", desc: "Compare top providers in 2026. Performance, latency, pricing." },
  { date: "02 MAR", tag: "Tutorial", read: "10 min", title: "How to Host a Discord Bot for Free (24/7)", desc: "No credit card, no sleep mode, permanent 24/7 uptime." },
  { date: "28 FEB", tag: "Hosting", read: "6 min", title: "Why Your Discord Bot Keeps Going Offline", desc: "Common disconnect reasons and how to fix permanently." },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="blog" className="relative py-24 lg:py-32 overflow-hidden bg-black/95" ref={ref}>
      {/* Background decoration */}
      <motion.div 
        className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        style={{ y }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />
      
      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8"
        >
          <div>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/5 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 backdrop-blur-md"
            >
              <BookOpen size={16} className="text-primary" />
              Latest Insights
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-6">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x" style={{ backgroundSize: "200% auto" }}>Insights</span>
            </h2>
            <motion.p 
              className="text-white/60 text-lg max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              In-depth guides, benchmarks, and tutorials from the VexaNode team to help you master hosting.
            </motion.p>
          </div>
          
          <motion.a
            href="#"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-primary font-medium px-6 py-3 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore the blog 
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)"
              }}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/30 hover:bg-white/[0.04] transition-all duration-300 p-6 block"
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              
              {/* Date and tag */}
              <div className="flex items-center gap-3 mb-4 text-xs">
                <motion.div 
                  className="flex items-center gap-1.5 text-white/40"
                  whileHover={{ scale: 1.1 }}
                >
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </motion.div>
                <motion.span 
                  className="bg-primary/20 text-primary px-2.5 py-1 rounded-full font-medium border border-primary/30"
                  whileHover={{ scale: 1.1 }}
                >
                  {post.tag}
                </motion.span>
                <motion.div 
                  className="flex items-center gap-1.5 text-white/40"
                  whileHover={{ scale: 1.1 }}
                >
                  <Clock size={14} />
                  <span>{post.read} Read</span>
                </motion.div>
              </div>
              
              {/* Title */}
              <h3 className="font-heading font-semibold text-lg sm:text-xl mb-3 text-white group-hover:text-primary transition-colors duration-300 relative z-10">
                {post.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-4 relative z-10">
                {post.desc}
              </p>
              
              {/* Read more indicator */}
              <motion.div 
                className="flex items-center gap-2 text-primary text-sm font-medium"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                Read more
                <ArrowRight size={16} />
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
