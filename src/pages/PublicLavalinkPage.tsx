import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Copy, CheckCheck, Globe, Shield, Zap, Clock, Server, Users, ArrowRight, Music, Bot, Heart, AlertTriangle, Star, ExternalLink, Radio, Wifi, HardDrive, Cpu } from "lucide-react";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type NodeStatus = "online" | "unstable" | "unknown" | "offline";

type LavalinkNode = {
  name: string;
  region: string;
  regionFlag: string;
  status: NodeStatus;
  host: string;
  port: number;
  password: string;
  ssl: boolean;
  note?: string;
  official?: boolean;
};

const nodes: LavalinkNode[] = [
  { name: "VexaNode Official", region: "Global", regionFlag: "🌍", status: "online", host: "lavalink.vexanode.com", port: 4000, password: "vexanode.com", ssl: false, note: "Best performance, Official Node", official: true },
  { name: "VexaNode India", region: "India", regionFlag: "🇮🇳", status: "online", host: "in.lavalink.vexanode.com", port: 443, password: "VexaNodeIN", ssl: true, note: "Optimized for Indian users", official: true },
  { name: "Lavalink Community EU", region: "Europe", regionFlag: "🇪🇺", status: "online", host: "lava-v4.community.eu.org", port: 443, password: "communitynode", ssl: true, note: "Community maintained" },
  { name: "Public Lavalink US", region: "USA", regionFlag: "🇺🇸", status: "unstable", host: "publiclava.us", port: 80, password: "publiclava", ssl: false, note: "May have downtime" },
  { name: "Lavalink Asia", region: "Singapore", regionFlag: "🇸🇬", status: "online", host: "lavalink.asia-node.sg", port: 443, password: "asialavalink", ssl: true, note: "Good for SEA users" },
  { name: "Lavalink EU Node", region: "Europe", regionFlag: "🇩🇪", status: "unknown", host: "lavalink.eu-node.de", port: 2333, password: "eunode2026", ssl: false },
  { name: "Free Lavalink BR", region: "Brazil", regionFlag: "🇧🇷", status: "unstable", host: "freelava.br.com", port: 2333, password: "freelavabr", ssl: false, note: "South America region" },
];

const statusColors: Record<NodeStatus, { bg: string; text: string; label: string }> = {
  online: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Online" },
  unstable: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Unstable" },
  unknown: { bg: "bg-zinc-500/20", text: "text-zinc-400", label: "Unknown" },
  offline: { bg: "bg-red-500/20", text: "text-red-400", label: "Offline" },
};

const comparisonRows = [
  { feature: "Uptime Guarantee", pub: "None", dedicated: "99.9%" },
  { feature: "Support", pub: "Community", dedicated: "24/7 Priority" },
  { feature: "Rate Limits", pub: "Yes", dedicated: "None" },
  { feature: "Concurrent Players", pub: "Limited", dedicated: "50-Unlimited" },
  { feature: "Audio Sources", pub: "Limited", dedicated: "All 30+ Sources" },
  { feature: "Custom Plugins", pub: "No", dedicated: "LavaSrc, SponsorBlock" },
  { feature: "Dedicated IP", pub: "No", dedicated: "Yes" },
  { feature: "Price", pub: "Free", dedicated: "From ₹49/mo" },
];

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

const NodeCard = ({ node, index }: { node: LavalinkNode; index: number }) => {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const status = statusColors[node.status];

  const copyConfig = () => {
    const config = `Host: ${node.host}\nPort: ${node.port}\nPassword: ${node.password}\nSecure: ${node.ssl}`;
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className={`glass-card p-5 hover:border-primary/40 transition-all duration-300 ${node.official ? "glow-border" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{node.regionFlag}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-semibold text-sm">{node.name}</h3>
              {node.official && (
                <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-semibold">OFFICIAL</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{node.region}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${node.status === "online" ? "bg-emerald-400" : node.status === "unstable" ? "bg-amber-400" : node.status === "offline" ? "bg-red-400" : "bg-zinc-400"}`} />
          {status.label}
        </span>
      </div>

      {/* Connection details */}
      <div className="space-y-2.5 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Host</span>
          <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{node.host}</code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Port</span>
          <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{node.port}</code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Password</span>
          <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{node.password}</code>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Secure (SSL)</span>
          <span className={`text-xs font-medium ${node.ssl ? "text-emerald-400" : "text-muted-foreground"}`}>{node.ssl ? "Yes" : "No"}</span>
        </div>
      </div>

      {node.note && (
        <p className="text-[11px] text-muted-foreground mb-3 italic">{node.note}</p>
      )}

      <button
        onClick={copyConfig}
        className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-primary hover:text-primary-foreground text-secondary-foreground py-2 rounded-lg text-xs font-medium transition-all"
      >
        {copied ? <><CheckCheck size={14} /> Copied!</> : <><Copy size={14} /> Copy Config</>}
      </button>
    </motion.div>
  );
};

const PublicLavalinkPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />

      {/* Hero */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-bg)" }} />
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">Community Resources</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight">
              Public Lavalink Servers — <span className="gradient-text">Free Nodes List 2026</span>
            </h1>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Find free and public Lavalink servers for your Discord music bot. Reliable nodes with low latency across multiple regions.
          </motion.p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="pb-8">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <div className="glass-card p-5 border-amber-500/30 bg-amber-500/5">
              <div className="flex gap-3">
                <AlertTriangle size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-1 text-amber-300">Important Notice</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Public Lavalink servers are community-maintained and may experience downtime, rate limits, or be discontinued without notice. They are suitable for testing and development only. For production music bots, use{" "}
                    <Link to="/service/premium-lavalink" className="text-primary hover:underline">dedicated hosting from VexaNode</Link> for guaranteed uptime and support.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Free Lavalink Nodes */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
              Free Lavalink <span className="gradient-text">Nodes</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-8">
              Free and public Lavalink nodes for Discord music bots. Use these for testing and development.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((node, i) => (
              <NodeCard key={node.name} node={node} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Dedicated */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-8">
              Why Choose <span className="gradient-text">Dedicated Hosting</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, title: "99.9% Uptime", desc: "Public nodes can go offline anytime. Dedicated hosting guarantees your music bot stays online." },
              { icon: Zap, title: "No Rate Limits", desc: "Public servers limit requests. Your own Lavalink handles unlimited concurrent streams." },
              { icon: Server, title: "Dedicated Resources", desc: "Get dedicated RAM, CPU, and bandwidth. No sharing with hundreds of other bots." },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }} className="glass-card p-6 text-center h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon size={26} className="text-primary" />
                  </div>
                  <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-8">
              Public vs <span className="gradient-text">Dedicated</span> Comparison
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-sm font-heading font-semibold">Feature</th>
                      <th className="text-center p-4 text-sm font-heading font-semibold text-muted-foreground">Public Nodes</th>
                      <th className="text-center p-4 text-sm font-heading font-semibold">
                        <span className="gradient-text">VexaNode</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => (
                      <motion.tr
                        key={row.feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                      >
                        <td className="p-4 text-sm font-medium">{row.feature}</td>
                        <td className="p-4 text-sm text-center text-muted-foreground">{row.pub}</td>
                        <td className="p-4 text-sm text-center text-primary font-medium">{row.dedicated}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Hosting Options */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
              Lavalink <span className="gradient-text">Hosting Options</span>
            </h2>
            <p className="text-muted-foreground text-sm mb-6">When choosing Lavalink hosting for your Discord music bot, developers typically consider these options:</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-6 space-y-4">
              {[
                { label: "Public Lavalink nodes", desc: "Free but unreliable, suitable for testing only", icon: Radio },
                { label: "VexaNode Managed", desc: "Managed Lavalink hosting with instant deployment starting at ₹49/month", icon: Star },
                { label: "Self-hosted VPS", desc: "Full control but requires manual setup and maintenance", icon: Server },
              ].map((opt, i) => (
                <motion.div
                  key={opt.label}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <opt.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-sm">{opt.label}</h4>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </motion.div>
              ))}
              <p className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                For production music bots, managed hosting provides the best balance of reliability, performance, and ease of use.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Learn More About Lavalink */}
      <section className="pb-16">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-8">
              Learn More About <span className="gradient-text">Lavalink</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "What is Lavalink and Why Music Bots Use It", desc: "Learn how Lavalink powers Discord music bots", tag: "Guide" },
              { title: "Lavalink Server Requirements Guide", desc: "Hardware specs needed to run Lavalink", tag: "Tutorial" },
              { title: "Best Lavalink Hosting for Discord Bots", desc: "Compare Lavalink hosting providers", tag: "Comparison" },
            ].map((article, i) => (
              <AnimatedSection key={article.title} delay={i * 0.1}>
                <motion.a
                  href="#"
                  whileHover={{ y: -3 }}
                  className="glass-card p-5 block h-full group hover:border-primary/40 transition-all"
                >
                  <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-medium">{article.tag}</span>
                  <h4 className="font-heading font-semibold text-sm mt-3 mb-2 group-hover:text-primary transition-colors">{article.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{article.desc}</p>
                  <span className="text-xs text-primary flex items-center gap-1">Read article <ExternalLink size={11} /></span>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="relative overflow-hidden rounded-2xl p-10 sm:p-14 text-center" style={{ background: "var(--gradient-primary)" }}>
              <div className="absolute inset-0 bg-background/20 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary-foreground mb-3">
                  Ready for Reliable Lavalink?
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                  Stop dealing with public node downtime. Get your own dedicated Lavalink server with 99.9% uptime, all audio sources, and priority support.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link to="/service/premium-lavalink" className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium hover:bg-background/90 transition-all">
                    Get Lavalink Hosting from ₹49/mo <ArrowRight size={18} />
                  </Link>
                  <Link to="/#pricing" className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-foreground/10 transition-all">
                    View All Plans
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SEO Content */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <AnimatedSection>
            <div className="glass-card p-6 lg:p-8 space-y-6">
              <div>
                <h2 className="text-xl font-heading font-bold mb-3">
                  The Best Free Public Lavalink Servers for Discord Music Bots in 2026
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Finding reliable free public Lavalink servers can be challenging. VexaNode provides the community with powerful, best-in-class free Lavalink nodes that deliver consistent performance. Whether you use popular Discord bot libraries like discord.js, discord.py, or JDA, our public servers support all of them seamlessly with reliable uptime.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">Free Public Nodes vs Paid Lavalink Hosting</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our public Lavalink nodes are completely free to use and support a wide variety of audio sources including YouTube and Spotify. However, because free nodes are shared globally, you might encounter rate limits or API restrictions. For a 100% stable, unmetered experience with dedicated IPs, our premium paid Lavalink hosting starts at just ₹49/month with advanced plugins like LavaSrc and SponsorBlock included.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">Building The Ultimate Music Bot Infrastructure</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Having a great Lavalink node is only part of the equation. VexaNode offers premium Discord bot hosting and free Discord bot hosting plans optimized to communicate with our Lavalink servers with minimal network latency. Developers needing extreme performance can utilize our affordable VPS hosting to run multiple Lavalink nodes behind load balancers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold mb-2">Why Trust VexaNode?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  VexaNode provides a superior, dedicated experience with enterprise-grade hardware across data centers in India, the US, Singapore, and Europe. Our servers represent the best of free and paid Lavalink hosting globally. Join thousands of developers who trust VexaNode for their Discord bot infrastructure.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Related Solutions */}
      <section className="pb-20">
        <div className="container max-w-5xl">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center mb-8">
              Related <span className="gradient-text">Solutions</span>
            </h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Music, title: "Lavalink Hosting", desc: "Want a private, dedicated Lavalink server? Get your own node with guaranteed uptime.", to: "/service/premium-lavalink" },
              { icon: Bot, title: "Discord Bot Hosting", desc: "Host your Discord music bot alongside your Lavalink node.", to: "/service/discord-bot-hosting" },
              { icon: Heart, title: "Free Bot Hosting", desc: "Start with our free plan and test your music bot before upgrading.", to: "/service/free-bot-hosting" },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -4 }}>
                  <Link to={item.to} className="glass-card p-6 block h-full group hover:border-primary/40 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon size={24} className="text-primary" />
                    </div>
                    <h4 className="font-heading font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublicLavalinkPage;
