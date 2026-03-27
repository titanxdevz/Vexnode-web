import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Twitter, MessageCircle, Globe, Shield, Zap, Heart } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Discord Bot", to: "/service/discord-bot-hosting" },
    { label: "Lavalink", to: "/service/premium-lavalink" },
    { label: "VPS", to: "/service/global-vps" },
    { label: "Minecraft", to: "/service/minecraft" },
    { label: "Database", to: "/service/database-hosting" },
  ],
  Resources: [
    { label: "Free Bot Hosting", to: "/service/free-bot-hosting" },
    { label: "Lavalink Guide", to: "/service/lavalink-v4" },
    { label: "Public Lavalink", to: "/service/public-lavalink" },
    { label: "India Lavalink", to: "/service/india-lavalink" },
    { label: "USA Lavalink", to: "/service/usa-lavalink" },
  ],
  Legal: [
    { label: "Terms of Service", to: "/legal/terms" },
    { label: "Privacy Policy", to: "/legal/privacy" },
    { label: "Refund Policy", to: "/legal/refund" },
    { label: "SLA", to: "/legal/sla" },
    { label: "Fair Usage", to: "/legal/fair-usage" },
  ],
  Regions: [
    { label: "India VPS", to: "/service/india-vps" },
    { label: "USA VPS", to: "/service/usa-vps" },
    { label: "Global Cloud", to: "/service/global-vps" },
  ],
};

const Footer = () => {
  return (
    <footer className="relative bg-black/95 border-t border-white/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container relative z-10 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center gap-2 font-heading text-2xl font-bold mb-6 inline-block">
              <img src="/logo.png" alt="VexaNode" className="h-10 w-auto rounded-lg" />
              <span className="gradient-text">Vexa</span>
              <span className="text-white">Node</span>
            </Link>
            
            <motion.p 
              className="text-white/60 text-lg leading-relaxed mb-6 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Premium Discord bot and Lavalink hosting with enterprise-grade infrastructure, 99.9% uptime, and 24/7 expert support.
            </motion.p>
            
            {/* Contact Info */}
            <motion.div 
              className="space-y-3 mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Mail size={18} className="text-primary" />
                <span>no-reply@vexanode.cloud</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Globe size={18} className="text-primary" />
                <span>vexanode.cloud</span>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={18} />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
          
          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-heading font-bold text-lg text-white mb-6 flex items-center gap-2">
                {title === "Services" && <Zap size={18} className="text-primary" />}
                {title === "Resources" && <Shield size={18} className="text-primary" />}
                {title === "Legal" && <Globe size={18} className="text-primary" />}
                {title === "Regions" && <MapPin size={18} className="text-primary" />}
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={link.label}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link 
                        to={link.to} 
                        className="text-white/60 hover:text-primary transition-colors duration-200 flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100" />
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/40 text-sm flex items-center gap-2">
              <span>© {new Date().getFullYear()} VexaNode</span>
              <span className="text-primary">•</span>
              <span>All rights reserved</span>
            </div>
            
            <div className="flex items-center gap-6 text-white/40 text-sm">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Heart size={14} className="text-primary animate-pulse" />
                <span>Made with passion for developers</span>
              </motion.div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-6 text-center text-white/30 text-xs">
            <p>Trusted by 10,000+ developers worldwide • Enterprise-grade infrastructure • 24/7 support</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
