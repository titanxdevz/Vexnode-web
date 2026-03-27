import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl p-10 sm:p-14 text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          <div className="absolute inset-0 bg-background/20 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-primary-foreground mb-3">
              Join Our Community
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Get help, share your projects, and connect with thousands of developers on our Discord server.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-all hover:gap-3"
            >
              Join Discord <ArrowRight size={18} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
