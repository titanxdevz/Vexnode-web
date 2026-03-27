import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    q: "What is VexaNode?",
    a: "VexaNode is a premium hosting provider specializing in high-performance Discord bot hosting, Lavalink nodes, and VPS solutions with a focus on reliability and low latency.",
  },
  {
    q: "Is Discord bot hosting really free?",
    a: "Yes! We offer a completely free tier for Discord bot hosting with 24/7 uptime and no sleep mode. No credit card is required to start.",
  },
  {
    q: "Which programming languages are supported?",
    a: "We support all major programming languages including Node.js, Python, Java, Go, and more. Our custom panel makes deployment easy for any bot or application.",
  },
  {
    q: "Do you have servers in India?",
    a: "Absolutely. We operate high-performance servers in Mumbai, India, ensuring ultra-low latency for users across the Indian subcontinent.",
  },
  {
    q: "How is VexaNode different from other providers?",
    a: "VexaNode stands out by offering true 24/7 uptime with 'No Sleep Mode' even on free plans, using latest-gen enterprise hardware, and providing 10Gbps+ network connectivity.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-black/95" ref={ref}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/5 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/10 backdrop-blur-md"
          >
            <MessageCircleQuestion size={16} className="text-primary" />
            Got Questions?
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x" style={{ backgroundSize: "200% auto" }}>Questions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about VexaNode hosting, billing, and our high-performance infrastructure.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`rounded-2xl backdrop-blur-xl transition-all duration-300 border overflow-hidden ${
                  isOpen 
                    ? "bg-white/[0.04] border-primary/30 shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)]" 
                    : "bg-white/[0.02] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none group"
                >
                  <span className="flex items-center gap-5 sm:gap-6">
                    <span className={`text-sm font-extrabold tracking-widest transition-colors duration-300 ${
                      isOpen ? "text-primary" : "text-white/20 group-hover:text-white/40"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-base sm:text-lg font-semibold transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                    }`}>
                      {faq.q}
                    </span>
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ml-4 ${
                      isOpen 
                        ? "bg-primary/20 text-primary border border-primary/30" 
                        : "bg-white/5 text-white/50 border border-white/10 group-hover:bg-white/10 group-hover:text-white"
                    }`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 sm:pl-[4.5rem] text-white/50 leading-relaxed text-sm sm:text-base">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;