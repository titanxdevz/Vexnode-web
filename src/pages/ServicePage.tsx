import { useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bot, Music, Database, Server, Gamepad2, MapPin, Zap, Radio, Globe, Shield, Clock, Cpu, ArrowRight, Check, HardDrive, Wifi, MonitorSpeaker, Heart, Star, Users, Headphones, MemoryStick } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type PlanSpec = {
  cpu: string;
  ram: string;
  storage: string;
  location: string;
};

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  currency?: string;
  specs: PlanSpec;
  extras: string[];
  popular?: boolean;
  slots?: number;
};

type ServiceData = {
  title: string;
  headline: string;
  description: string;
  icon: typeof Bot;
  planTypeLabel: string;
  plans: Plan[];
  languages?: string[];
  features?: { icon: typeof Bot; title: string; desc: string }[];
  whyChoose?: { title: string; desc: string }[];
};

const servicesMap: Record<string, ServiceData> = {
  "discord-bot-hosting": {
    title: "Discord Bot Hosting",
    headline: "Discord Bot Hosting — Affordable & Reliable 24/7",
    description: "Premium discord bot hosting starting at ₹40/month. 24/7 uptime, DDoS protection, instant deployment — with support for Node.js, Python, and Java bots.",
    icon: Bot,
    planTypeLabel: "Bot Hosting Plans",
    languages: ["Node.js", "Python", "TypeScript", "Discord.js", "Java", "Bun"],
    plans: [
      { name: "Starter Plan", subtitle: "Discord Bot Hosting", price: "₹40", specs: { cpu: "50%", ram: "512 MB", storage: "2 GB", location: "FLM" }, extras: ["24/7 Uptime Guaranteed"], slots: 25 },
      { name: "Pro Plan", subtitle: "Discord Bot Hosting", price: "₹100", specs: { cpu: "100%", ram: "1024 MB", storage: "6 GB", location: "FLM" }, extras: ["24/7 Uptime Guaranteed"], slots: 24, popular: true },
      { name: "Ultra Plan", subtitle: "Discord Bot Hosting", price: "₹200", specs: { cpu: "150%", ram: "4096 MB", storage: "12 GB", location: "FLM" }, extras: ["24/7 Uptime Guaranteed"], slots: 1 },
      { name: "Elite Plan", subtitle: "Discord Bot Hosting", price: "₹400", specs: { cpu: "400%", ram: "8096 MB", storage: "18 GB", location: "FLM" }, extras: ["24/7 Uptime Guaranteed", "Priority Support"] },
      { name: "Diamond Plan", subtitle: "Discord Bot Hosting", price: "₹600", specs: { cpu: "500%", ram: "12 GB", storage: "25 GB", location: "FLM" }, extras: ["24/7 Uptime Guaranteed", "Priority Support"], slots: 15 },
      { name: "Ultimate Plan", subtitle: "Discord Bot Hosting", price: "₹900", specs: { cpu: "800%", ram: "16 GB", storage: "32 GB", location: "FLM" }, extras: ["24/7 Uptime Guaranteed", "Dedicated Support", "Custom Domain"] },
    ],
    features: [
      { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade multi-layer DDoS mitigation" },
      { icon: Clock, title: "99.9% Uptime SLA", desc: "Guaranteed availability with automatic failover" },
      { icon: Cpu, title: "Latest Gen Hardware", desc: "AMD Ryzen 9 & Intel Xeon processors" },
      { icon: Headphones, title: "24/7 Expert Support", desc: "Get help from our team anytime" },
    ],
    whyChoose: [
      { title: "No Sleep Mode", desc: "Your bot stays online 24/7 without idle timeouts or restart commands." },
      { title: "Instant Deployment", desc: "Upload your code and go live in under 60 seconds." },
      { title: "Multi-Language Support", desc: "Node.js, Python, Java, TypeScript, Go, and more." },
      { title: "Custom Control Panel", desc: "Full server management with file editor, console, and logs." },
    ],
  },
  "free-bot-hosting": {
    title: "Free Bot Hosting",
    headline: "Free Discord Bot Hosting — 24/7, No Sleep Mode",
    description: "Host your Discord bot completely free. No credit card required, no sleep mode, true 24/7 uptime.",
    icon: Bot,
    planTypeLabel: "Free Bot Plans",
    languages: ["Node.js", "Python", "Java"],
    plans: [
      { name: "Free Starter", subtitle: "Free Discord Bot", price: "₹0", specs: { cpu: "25%", ram: "256 MB", storage: "1 GB", location: "FLM" }, extras: ["24/7 Uptime", "No Sleep Mode"], slots: 50 },
      { name: "Free Plus", subtitle: "Free Discord Bot", price: "₹0", specs: { cpu: "35%", ram: "384 MB", storage: "1.5 GB", location: "FLM" }, extras: ["24/7 Uptime", "No Sleep Mode", "Limited"], slots: 20 },
    ],
    features: [
      { icon: Heart, title: "Truly Free", desc: "No credit card, no hidden fees, no catch" },
      { icon: Clock, title: "No Sleep Mode", desc: "Your bot never goes offline" },
      { icon: Shield, title: "DDoS Protected", desc: "Enterprise security on free plans too" },
    ],
  },
  "database-hosting": {
    title: "Database Hosting",
    headline: "Managed Database Hosting — MySQL, PostgreSQL, MongoDB",
    description: "High-performance managed database hosting with automatic backups, scaling, and 24/7 monitoring.",
    icon: Database,
    planTypeLabel: "Database Plans",
    plans: [
      { name: "DB Basic", subtitle: "Managed Database", price: "₹99", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "10 GB NVMe", location: "IN/US" }, extras: ["Daily Backups", "MySQL/PostgreSQL"], slots: 30 },
      { name: "DB Standard", subtitle: "Managed Database", price: "₹249", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "50 GB NVMe", location: "IN/US" }, extras: ["Hourly Backups", "All Engines"], popular: true },
      { name: "DB Premium", subtitle: "Managed Database", price: "₹499", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "100 GB NVMe", location: "IN/US" }, extras: ["Real-time Replication", "Dedicated IP"] },
      { name: "DB Enterprise", subtitle: "Managed Database", price: "₹999", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "250 GB NVMe", location: "IN/US" }, extras: ["Multi-Region", "Read Replicas", "Priority Support"] },
    ],
    features: [
      { icon: HardDrive, title: "NVMe Storage", desc: "Ultra-fast NVMe SSD for all database plans" },
      { icon: Shield, title: "Automated Backups", desc: "Point-in-time recovery with automated backups" },
      { icon: Globe, title: "Multi-Region", desc: "Deploy across India, US, and Europe" },
      { icon: MonitorSpeaker, title: "Monitoring", desc: "Real-time performance monitoring and alerts" },
    ],
  },
  "premium-lavalink": {
    title: "Premium Lavalink",
    headline: "Premium Lavalink Hosting — Ryzen 9 9950X",
    description: "Ultra-low latency Lavalink hosting on Ryzen 9 9950X processors with 30+ audio sources including Spotify, YouTube, SoundCloud, and more.",
    icon: Music,
    planTypeLabel: "Lavalink Plans",
    plans: [
      { name: "Starter Node", subtitle: "Lavalink Hosting", price: "₹49", specs: { cpu: "1 vCPU", ram: "512 MB", storage: "5 GB NVMe", location: "IN" }, extras: ["30+ Sources", "LavaSrc Plugin"], slots: 40 },
      { name: "Standard Node", subtitle: "Lavalink Hosting", price: "₹99", specs: { cpu: "2 vCPU", ram: "1 GB", storage: "10 GB NVMe", location: "IN/US" }, extras: ["30+ Sources", "LavaSrc + SponsorBlock"], popular: true, slots: 30 },
      { name: "Pro Node", subtitle: "Lavalink Hosting", price: "₹199", specs: { cpu: "3 vCPU", ram: "2 GB", storage: "20 GB NVMe", location: "IN/US/EU" }, extras: ["All Plugins", "Dedicated IP"], slots: 15 },
      { name: "Enterprise Node", subtitle: "Lavalink Hosting", price: "₹399", specs: { cpu: "4 vCPU", ram: "4 GB", storage: "40 GB NVMe", location: "Global" }, extras: ["All Plugins", "Dedicated IP", "Custom Config"] },
    ],
    features: [
      { icon: Cpu, title: "Ryzen 9 9950X", desc: "Latest AMD processors for maximum performance" },
      { icon: Music, title: "30+ Audio Sources", desc: "Spotify, YouTube, SoundCloud, Apple Music, Deezer, and more" },
      { icon: Zap, title: "< 5ms Latency", desc: "Ultra-low latency within Indian data centers" },
      { icon: HardDrive, title: "NVMe SSD", desc: "Fast storage for audio caching" },
    ],
  },
  "india-lavalink": {
    title: "India Lavalink",
    headline: "India Lavalink Node — Mumbai Data Center",
    description: "Low latency Lavalink hosting from Mumbai, India. Perfect for Indian Discord communities with < 5ms internal latency.",
    icon: MapPin,
    planTypeLabel: "India Lavalink Plans",
    plans: [
      { name: "Mumbai Basic", subtitle: "India Lavalink", price: "₹49", specs: { cpu: "1 vCPU", ram: "512 MB", storage: "5 GB", location: "Mumbai" }, extras: ["< 5ms Latency", "30+ Sources"], slots: 25 },
      { name: "Mumbai Standard", subtitle: "India Lavalink", price: "₹99", specs: { cpu: "2 vCPU", ram: "1 GB", storage: "10 GB", location: "Mumbai" }, extras: ["< 5ms Latency", "All Plugins"], popular: true },
      { name: "Mumbai Pro", subtitle: "India Lavalink", price: "₹199", specs: { cpu: "3 vCPU", ram: "2 GB", storage: "20 GB", location: "Mumbai" }, extras: ["< 5ms Latency", "Dedicated IP", "All Plugins"] },
    ],
    features: [
      { icon: MapPin, title: "Mumbai DC", desc: "Located in Mumbai for lowest latency in India" },
      { icon: Wifi, title: "10 Gbps Uplink", desc: "High-bandwidth network connectivity" },
      { icon: Shield, title: "DDoS Protected", desc: "NeoProtect DDoS mitigation" },
    ],
  },
  "usa-lavalink": {
    title: "USA Lavalink",
    headline: "USA Lavalink Node — Ashburn & Los Angeles",
    description: "High-performance Lavalink hosting from US data centers in Ashburn and Los Angeles.",
    icon: MapPin,
    planTypeLabel: "USA Lavalink Plans",
    plans: [
      { name: "Ashburn Basic", subtitle: "USA Lavalink", price: "$4.99", specs: { cpu: "1 vCPU", ram: "512 MB", storage: "5 GB", location: "Ashburn" }, extras: ["30+ Sources", "Low Latency"], slots: 20 },
      { name: "Ashburn Pro", subtitle: "USA Lavalink", price: "$9.99", specs: { cpu: "2 vCPU", ram: "1 GB", storage: "10 GB", location: "Ashburn" }, extras: ["All Plugins", "Priority"], popular: true },
      { name: "LA Standard", subtitle: "USA Lavalink", price: "$9.99", specs: { cpu: "2 vCPU", ram: "1 GB", storage: "10 GB", location: "Los Angeles" }, extras: ["30+ Sources", "West Coast Optimized"] },
    ],
  },
  "lavalink-v4": {
    title: "Lavalink v4",
    headline: "Lavalink v4 Hosting — Latest Features & Plugins",
    description: "Host Lavalink v4 with all the latest features, plugins, and performance improvements. Pre-configured with LavaSrc, SponsorBlock, and more.",
    icon: Zap,
    planTypeLabel: "Lavalink v4 Plans",
    plans: [
      { name: "v4 Basic", subtitle: "Lavalink v4", price: "₹59", specs: { cpu: "1 vCPU", ram: "512 MB", storage: "5 GB", location: "IN" }, extras: ["v4 Pre-configured", "Auto Updates"] },
      { name: "v4 Standard", subtitle: "Lavalink v4", price: "₹119", specs: { cpu: "2 vCPU", ram: "1 GB", storage: "10 GB", location: "IN/US" }, extras: ["v4 Pre-configured", "Custom Plugins"], popular: true },
      { name: "v4 Pro", subtitle: "Lavalink v4", price: "₹249", specs: { cpu: "3 vCPU", ram: "2 GB", storage: "20 GB", location: "IN/US/EU" }, extras: ["All Plugins", "Dedicated IP"] },
    ],
  },
  "global-vps": {
    title: "Global Cloud VPS",
    headline: "Global Cloud VPS — AMD EPYC Powered",
    description: "Scalable VPS hosting with AMD EPYC processors, NVMe SSD, and global availability. Full root access with your choice of OS.",
    icon: Globe,
    planTypeLabel: "Cloud VPS Plans",
    plans: [
      { name: "Cloud XS", subtitle: "Cloud VPS", price: "₹149", specs: { cpu: "1 vCPU", ram: "512 MB", storage: "15 GB NVMe", location: "IN/US" }, extras: ["1 TB Transfer", "Full Root Access"], slots: 50 },
      { name: "Cloud S", subtitle: "Cloud VPS", price: "₹225", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "25 GB NVMe", location: "IN/US" }, extras: ["1 TB Transfer", "Full Root Access"] },
      { name: "Cloud M", subtitle: "Cloud VPS", price: "₹450", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "50 GB NVMe", location: "IN/US/EU" }, extras: ["2 TB Transfer", "Full Root Access"], popular: true },
      { name: "Cloud L", subtitle: "Cloud VPS", price: "₹900", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "100 GB NVMe", location: "IN/US/EU" }, extras: ["4 TB Transfer", "Full Root Access", "Dedicated IP"] },
      { name: "Cloud XL", subtitle: "Cloud VPS", price: "₹1800", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "200 GB NVMe", location: "Global" }, extras: ["8 TB Transfer", "Dedicated IP", "Priority Support"] },
      { name: "Cloud XXL", subtitle: "Cloud VPS", price: "₹3500", specs: { cpu: "16 vCPU", ram: "32 GB", storage: "400 GB NVMe", location: "Global" }, extras: ["Unmetered Transfer", "Dedicated IP", "Managed Support"] },
    ],
    features: [
      { icon: Cpu, title: "AMD EPYC", desc: "Latest generation AMD EPYC processors" },
      { icon: HardDrive, title: "NVMe SSD", desc: "Ultra-fast NVMe storage on all plans" },
      { icon: Globe, title: "Multi-Region", desc: "India, USA, Europe data centers" },
      { icon: Shield, title: "DDoS Protected", desc: "Enterprise-grade DDoS mitigation" },
    ],
    whyChoose: [
      { title: "Full Root Access", desc: "Complete control over your server with SSH access and any OS." },
      { title: "Instant Provisioning", desc: "Your VPS is ready in under 60 seconds after payment." },
      { title: "Multiple OS Options", desc: "Ubuntu, Debian, CentOS, AlmaLinux, Windows Server available." },
      { title: "Scalable Resources", desc: "Upgrade CPU, RAM, and storage at any time without downtime." },
    ],
  },
  "india-vps": {
    title: "India VPS Node",
    headline: "India VPS — Mumbai Region",
    description: "VPS hosting from Mumbai, India with ultra-low latency for Indian users. AMD Ryzen 9 9950X powered.",
    icon: MapPin,
    planTypeLabel: "India VPS Plans",
    plans: [
      { name: "India S", subtitle: "India VPS", price: "₹250", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "25 GB NVMe", location: "Mumbai" }, extras: ["1 TB Transfer", "Root Access"] },
      { name: "India M", subtitle: "India VPS", price: "₹500", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "50 GB NVMe", location: "Mumbai" }, extras: ["2 TB Transfer", "Root Access"], popular: true },
      { name: "India L", subtitle: "India VPS", price: "₹999", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "100 GB NVMe", location: "Mumbai" }, extras: ["4 TB Transfer", "Dedicated IP"] },
      { name: "India XL", subtitle: "India VPS", price: "₹1999", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "200 GB NVMe", location: "Mumbai" }, extras: ["8 TB Transfer", "Dedicated IP", "Managed"] },
    ],
  },
  "usa-vps": {
    title: "USA VPS Node",
    headline: "USA VPS — Ashburn, Virginia",
    description: "VPS hosting from Ashburn, USA. Intel Xeon Gold powered. Ideal for North American and global applications.",
    icon: MapPin,
    planTypeLabel: "USA VPS Plans",
    plans: [
      { name: "US S", subtitle: "USA VPS", price: "$5.99", specs: { cpu: "1 vCPU", ram: "1 GB", storage: "25 GB NVMe", location: "Ashburn" }, extras: ["1 TB Transfer", "Root Access"] },
      { name: "US M", subtitle: "USA VPS", price: "$11.99", specs: { cpu: "2 vCPU", ram: "4 GB", storage: "50 GB NVMe", location: "Ashburn" }, extras: ["2 TB Transfer", "Root Access"], popular: true },
      { name: "US L", subtitle: "USA VPS", price: "$23.99", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "100 GB NVMe", location: "Ashburn" }, extras: ["4 TB Transfer", "Dedicated IP"] },
      { name: "US XL", subtitle: "USA VPS", price: "$47.99", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "200 GB NVMe", location: "Ashburn" }, extras: ["Unmetered", "Dedicated IP", "Managed"] },
    ],
  },
  "minecraft": {
    title: "Minecraft Servers",
    headline: "Minecraft Server Hosting — High Tickrate Gaming",
    description: "Minecraft server hosting with instant setup, mod support, and high-performance hardware. Vanilla, Paper, Spigot, Forge, Fabric, BungeeCord.",
    icon: Gamepad2,
    planTypeLabel: "Minecraft Plans",
    plans: [
      { name: "Stone", subtitle: "Minecraft Server", price: "₹199", specs: { cpu: "2 vCPU", ram: "2 GB", storage: "10 GB SSD", location: "IN/US" }, extras: ["10 Player Slots", "Mod Support"], slots: 30 },
      { name: "Iron", subtitle: "Minecraft Server", price: "₹399", specs: { cpu: "3 vCPU", ram: "4 GB", storage: "25 GB SSD", location: "IN/US" }, extras: ["25 Player Slots", "Plugin Support"], popular: true },
      { name: "Gold", subtitle: "Minecraft Server", price: "₹599", specs: { cpu: "4 vCPU", ram: "6 GB", storage: "35 GB SSD", location: "IN/US" }, extras: ["40 Player Slots", "Full Mod Support"] },
      { name: "Diamond", subtitle: "Minecraft Server", price: "₹799", specs: { cpu: "4 vCPU", ram: "8 GB", storage: "50 GB SSD", location: "IN/US" }, extras: ["50 Player Slots", "Full Mod Support", "Priority Support"] },
      { name: "Netherite", subtitle: "Minecraft Server", price: "₹1299", specs: { cpu: "6 vCPU", ram: "12 GB", storage: "75 GB SSD", location: "IN/US" }, extras: ["100 Player Slots", "BungeeCord", "Dedicated IP"] },
      { name: "Bedrock", subtitle: "Minecraft Server", price: "₹1999", specs: { cpu: "8 vCPU", ram: "16 GB", storage: "100 GB SSD", location: "IN/US" }, extras: ["Unlimited Slots", "Network Ready", "Managed Support"] },
    ],
    features: [
      { icon: Zap, title: "High Tickrate", desc: "20 TPS guaranteed with high-performance hardware" },
      { icon: Gamepad2, title: "All Versions", desc: "Vanilla, Paper, Spigot, Forge, Fabric supported" },
      { icon: HardDrive, title: "SSD Storage", desc: "Fast world loading with SSD storage" },
      { icon: Shield, title: "DDoS Protected", desc: "Keep your server safe from attacks" },
    ],
    whyChoose: [
      { title: "One-Click Install", desc: "Install any modpack or plugin with one click from our panel." },
      { title: "Automatic Backups", desc: "Daily automated backups with instant restore capability." },
      { title: "Subdomain Included", desc: "Free subdomain included, or connect your own domain." },
      { title: "Version Switching", desc: "Switch between Minecraft versions instantly." },
    ],
  },
};

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const PlanCard = ({ plan, service, index }: { plan: Plan; service: ServiceData; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Determine billing URL based on service type
  const getBillingUrl = () => {
    const serviceTitle = service.title.toLowerCase();
    if (serviceTitle.includes('discord bot')) {
      return 'https://billing.vexanode.cloud/products/discord';
    } else if (serviceTitle.includes('lavalink')) {
      return 'https://billing.vexanode.cloud/products/lavalink';
    } else if (serviceTitle.includes('vps') || serviceTitle.includes('virtual private server')) {
      return 'https://billing.vexanode.cloud/products/vps';
    } else if (serviceTitle.includes('database')) {
      return 'https://billing.vexanode.cloud/products/database';
    } else if (serviceTitle.includes('minecraft')) {
      return 'https://billing.vexanode.cloud/products/minecraft';
    } else {
      return 'https://billing.vexanode.cloud';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className={`glass-card p-5 flex flex-col relative group hover:border-primary/40 transition-all duration-300 ${plan.popular ? "glow-border" : ""}`}
    >
      {plan.slots && (
        <span className="absolute top-3 right-3 text-[10px] bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full font-semibold">
          {plan.slots} Left
        </span>
      )}
      {plan.popular && (
        <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] font-semibold px-2.5 py-0.5 rounded-full">POPULAR</span>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-lg bg-primary/10">
          <service.icon size={20} className="text-primary" />
        </div>
        <div>
          <h4 className="font-heading font-semibold">{plan.name}</h4>
          <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
        </div>
      </div>

      {/* Specs grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
            <Cpu size={12} /> CPU Limit
          </div>
          <p className="text-sm font-semibold">{plan.specs.cpu}</p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
            <MemoryStick size={12} /> RAM
          </div>
          <p className="text-sm font-semibold">{plan.specs.ram}</p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
            <HardDrive size={12} /> SSD Storage
          </div>
          <p className="text-sm font-semibold">{plan.specs.storage}</p>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-0.5">
            <Wifi size={12} /> Location
          </div>
          <p className="text-sm font-semibold">{plan.specs.location}</p>
        </div>
      </div>

      {/* Extras */}
      <div className="space-y-1.5 mb-5 flex-1">
        {plan.extras.map((e) => (
          <div key={e} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check size={13} className="text-primary shrink-0" /> {e}
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-2xl font-heading font-bold gradient-text">{plan.price}</span>
        {plan.price !== "₹0" && plan.price !== "Free" && <span className="text-sm text-muted-foreground"> /mo</span>}
      </div>

      {/* CTA */}
      <a
        href={getBillingUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/80 text-primary-foreground py-2.5 rounded-lg text-sm font-medium transition-all group/btn"
      >
        Order Now <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
      </a>
    </motion.div>
  );
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesMap[slug || ""];

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <TopBanner />
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground">The requested service page does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-bg)" }} />
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              {service.headline.includes("—") ? (
                <>
                  {service.headline.split("—")[0]}— <span className="gradient-text">{service.headline.split("—")[1]}</span>
                </>
              ) : service.headline}
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12">
        <div className="container max-w-6xl">
          <AnimatedSection>
            <div className="glass-card p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">{service.title}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
                {service.title.split(" ").slice(0, -1).join(" ")} <span className="gradient-text">{service.title.split(" ").pop()}</span>
              </h2>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Languages */}
              {service.languages && (
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Supported Languages & Frameworks</h3>
                  <div className="flex flex-wrap gap-3">
                    {service.languages.map((lang) => (
                      <motion.div
                        key={lang}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="glass-card px-5 py-3 text-center min-w-[90px] cursor-default"
                      >
                        <Cpu size={22} className="text-primary mx-auto mb-1.5" />
                        <span className="text-xs font-medium">{lang}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Plan Type */}
              <div className="mb-2">
                <p className="text-sm text-muted-foreground mb-2">1. Plan Type</p>
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
                  <service.icon size={16} />
                  {service.planTypeLabel}
                </div>
              </div>

              {/* Choose Plan */}
              <div className="mt-6 mb-4">
                <p className="text-sm text-muted-foreground">2. Choose Plan</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {service.plans.map((plan, i) => (
                  <PlanCard key={plan.name} plan={plan} service={service} index={i} />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      {service.features && (
        <section className="pb-12">
          <div className="container max-w-6xl">
            <AnimatedSection>
              <h2 className="text-2xl font-heading font-bold text-center mb-8">
                Why Choose <span className="gradient-text">{service.title}</span>
              </h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.features.map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card p-5 text-center h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <f.icon size={22} className="text-primary" />
                    </div>
                    <h4 className="font-heading font-semibold text-sm mb-1">{f.title}</h4>
                    <p className="text-xs text-muted-foreground">{f.desc}</p>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose */}
      {service.whyChoose && (
        <section className="pb-16">
          <div className="container max-w-6xl">
            <div className="grid md:grid-cols-2 gap-4">
              {service.whyChoose.map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 0.08}>
                  <div className="glass-card p-5 flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Star size={16} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-20">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl p-10 text-center" style={{ background: "var(--gradient-primary)" }}>
              <div className="absolute inset-0 bg-background/20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground mb-3">
                  Ready to Get Started?
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                  Deploy your {service.title.toLowerCase()} in under 60 seconds with enterprise-grade infrastructure.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <a href={(() => {
                    const serviceTitle = service.title.toLowerCase();
                    if (serviceTitle.includes('discord bot')) {
                      return 'https://billing.vexanode.cloud/products/discord';
                    } else if (serviceTitle.includes('lavalink')) {
                      return 'https://billing.vexanode.cloud/products/lavalink';
                    } else if (serviceTitle.includes('vps') || serviceTitle.includes('virtual private server')) {
                      return 'https://billing.vexanode.cloud/products/vps';
                    } else if (serviceTitle.includes('database')) {
                      return 'https://billing.vexanode.cloud/products/database';
                    } else if (serviceTitle.includes('minecraft')) {
                      return 'https://billing.vexanode.cloud/products/minecraft';
                    } else {
                      return 'https://billing.vexanode.cloud';
                    }
                  })()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-all">
                    Order Now <ArrowRight size={18} />
                  </a>
                  <a href="https://discord.vexanode.cloud" className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/10 transition-all">
                    <Users size={18} /> Join Discord
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
