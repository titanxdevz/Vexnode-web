import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Database, Server, Music, Bot, ArrowRight, Sparkles, Check, X } from "lucide-react";

const discordBotPlans = [
  {
    name: "Starter",
    ram: "512 MB - DDR5",
    storage: "1GB SSD - NVME",
    cpu: "50% CPU - R9",
    backup: "No BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹35.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Basic",
    ram: "1024 MB - DDR5",
    storage: "2GB SSD - NVME",
    cpu: "100% CPU",
    backup: "1 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹99.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Silver",
    ram: "2 GB RAM - DDR5",
    storage: "4 GB SSD - NVME",
    cpu: "150% CPU",
    backup: "1 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹129.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Gold",
    ram: "4 GB RAM - DDR5",
    storage: "8 GB SSD - NVME",
    cpu: "200% CPU - R9",
    backup: "2 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹199.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Platinum",
    ram: "6 GB RAM - DDR5",
    storage: "12 GB SSD - NVME",
    cpu: "250% CPU - R9",
    backup: "3 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹279.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Diamond",
    ram: "8 GB RAM - DDR5",
    storage: "16 GB SSD - NVME",
    cpu: "300% CPU - R9",
    backup: "4 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹349.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Netherite",
    ram: "8 GB RAM - DDR5",
    storage: "16 GB SSD - NVME",
    cpu: "300% CPU - R9",
    backup: "4 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹429.00",
    url: "/service/discord-bot-hosting"
  },
  {
    name: "Obsidian",
    ram: "12 GB RAM - DDR5",
    storage: "24 GB SSD - NVME",
    cpu: "400% CPU - R9",
    backup: "5 BACKUP, DATABASE",
    locations: ["India", "Global"],
    price: "₹550.00",
    url: "/service/discord-bot-hosting"
  }
];

const lavalinkPlans = [
  {
    name: "Starter Node",
    cpuLimit: "1 vCPU",
    ram: "512 MB",
    ssdStorage: "5 GB NVMe",
    location: "IN",
    features: ["30+ Sources", "LavaSrc Plugin"],
    price: "₹49/mo",
    url: "/service/premium-lavalink"
  },
  {
    name: "Standard Node",
    cpuLimit: "2 vCPU",
    ram: "1 GB",
    ssdStorage: "10 GB NVMe",
    location: "IN/US",
    features: ["30+ Sources", "LavaSrc + SponsorBlock"],
    price: "₹99/mo",
    popular: true,
    url: "/service/premium-lavalink"
  },
  {
    name: "Pro Node",
    cpuLimit: "3 vCPU",
    ram: "2 GB",
    ssdStorage: "20 GB NVMe",
    location: "IN/US/EU",
    features: ["All Plugins", "Dedicated IP"],
    price: "₹199/mo",
    url: "/service/premium-lavalink"
  },
  {
    name: "Enterprise Node",
    cpuLimit: "4 vCPU",
    ram: "4 GB",
    ssdStorage: "40 GB NVMe",
    location: "Global",
    features: ["All Plugins", "Dedicated IP", "Custom Config"],
    price: "₹399/mo",
    url: "/service/premium-lavalink"
  }
];

const vpsPlans = [
  {
    name: "Starter VPS",
    cpuLimit: "1 vCPU",
    ram: "1 GB",
    ssdStorage: "20 GB NVMe",
    location: "India",
    features: ["Full Root Access", "DDoS Protection"],
    price: "₹299/mo",
    url: "/service/global-vps"
  },
  {
    name: "Standard VPS",
    cpuLimit: "2 vCPU",
    ram: "2 GB",
    ssdStorage: "40 GB NVMe",
    location: "India/USA",
    features: ["Full Root Access", "DDoS Protection", "Backup"],
    price: "₹499/mo",
    popular: true,
    url: "/service/global-vps"
  },
  {
    name: "Pro VPS",
    cpuLimit: "4 vCPU",
    ram: "4 GB",
    ssdStorage: "80 GB NVMe",
    location: "Global",
    features: ["Full Root Access", "DDoS Protection", "Backup", "Premium Support"],
    price: "₹899/mo",
    url: "/service/global-vps"
  },
  {
    name: "Enterprise VPS",
    cpuLimit: "8 vCPU",
    ram: "8 GB",
    ssdStorage: "160 GB NVMe",
    location: "Global",
    features: ["Full Root Access", "DDoS Protection", "Backup", "Premium Support", "Dedicated IP"],
    price: "₹1599/mo",
    url: "/service/global-vps"
  }
];

const PricingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("discord");

  const tabs = [
    { id: "discord", label: "Discord Bot", icon: Bot },
    { id: "lavalink", label: "Lavalink", icon: Music },
    { id: "vps", label: "VPS", icon: Server },
  ];

  const currentPlans = activeTab === "discord" ? discordBotPlans : activeTab === "lavalink" ? lavalinkPlans : vpsPlans;

  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden bg-black/95" ref={ref}>
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

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
            <Sparkles size={16} className="text-primary" />
            Flexible & Transparent
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white mb-6">
            Simple Pricing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-primary animate-gradient-x" style={{ backgroundSize: "200% auto" }}>Plans</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the perfect plan for your needs. All plans include our enterprise-grade core features, automated backups, and 24/7 support with zero hidden fees.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon size={18} />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", bounce: 0.3 }}
                whileHover={{ y: -8 }}
                className={`group relative flex flex-col p-6 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/50 hover:shadow-2xl hover:bg-white/[0.04] transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent rounded-2xl pointer-events-none" />

                {/* POPULAR Badge */}
                {(plan as any).popular && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center z-20">
                    <motion.div 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-primary to-purple-500 text-white text-[11px] font-bold tracking-widest uppercase py-1.5 px-5 rounded-full shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] border border-white/20"
                    >
                      POPULAR
                    </motion.div>
                  </div>
                )}

                <h3 className="text-xl font-bold text-white mb-4 tracking-wide group-hover:text-primary transition-colors relative z-10">
                  {plan.name}
                </h3>

                <div className="space-y-3 mb-6 flex-1 relative z-10">
                  {/* Discord Bot Plans Display */}
                  {plan.ram && plan.storage && plan.cpu && (
                    <>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">{plan.ram}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">{plan.storage}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">{plan.cpu}</span>
                      </div>
                      {plan.backup && (
                        <div className="flex items-start gap-2">
                          <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/70">{plan.backup}</span>
                        </div>
                      )}
                      {plan.locations && (
                        <div className="flex items-start gap-2">
                          <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/70">Locations: {plan.locations.join(", ")}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Lavalink Plans Display */}
                  {(plan as any).cpuLimit && (plan as any).ssdStorage && (
                    <>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">CPU: {(plan as any).cpuLimit}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">RAM: {(plan as any).ram}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">Storage: {(plan as any).ssdStorage}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-white/70">Location: {(plan as any).location}</span>
                      </div>
                      {(plan as any).features && (
                        <div className="flex items-start gap-2">
                          <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-white/70">Features: {(plan as any).features.join(", ")}</span>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Additional fields for backward compatibility */}
                  {(plan as any).bandwidth && (
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">Bandwidth: {(plan as any).bandwidth}</span>
                    </div>
                  )}
                  {(plan as any).network && (
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">{(plan as any).network}</span>
                    </div>
                  )}
                  {(plan as any).ddos && (
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">{(plan as any).ddos}</span>
                    </div>
                  )}
                  {(plan as any).ip && (
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">{(plan as any).ip}</span>
                    </div>
                  )}
                  {(plan as any).location && !(plan as any).cpuLimit && (
                    <div className="flex items-start gap-2">
                      <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">{(plan as any).location}</span>
                    </div>
                  )}
                </div>

                <div className="mb-6 relative z-10">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{plan.price}</span>
                    <span className="text-lg text-white/40 font-medium">/mo</span>
                  </div>
                </div>

                <motion.a
                  href={plan.url}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative z-10 bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.6)]"
                >
                  Buy Now
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-sm text-white/40 mt-16 font-medium"
        >
          Need a custom enterprise solution?{" "}
          <a href="https://billing.vexanode.cloud/contact" className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 hover:underline underline-offset-4">
            Contact our sales team <ArrowRight size={14} />
          </a>
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;