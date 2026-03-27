import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Bot, Database, Globe, Shield, Server, Gamepad2, MapPin, Wifi, Cpu, Menu, X } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const servicesDropdown = {
  "BOT HOSTING": [
    { icon: Bot, label: "Discord Bot Hosting", desc: "Enterprise Quality Hosting", to: "/service/discord-bot-hosting" },
    { icon: Bot, label: "Free Bot Hosting", desc: "24/7 Online, No Sleep", to: "/service/free-bot-hosting", badge: "FREE" },
    { icon: Database, label: "Database Hosting", desc: "MongoDB, Redis & MySQL", to: "/service/database-hosting" },
  ],
  "LAVALINK": [
    { icon: MapPin, label: "India Lavalink", desc: "Mumbai Data Center", to: "/service/india-lavalink" },
    { icon: Globe, label: "Premium Lavalink", desc: "Global Coverage", to: "/service/premium-lavalink" },
    { icon: Wifi, label: "Public Lavalink", desc: "Free Public Nodes", to: "/service/public-lavalink", badge: "FREE" },
  ],
  "VPS & CLOUD": [
    { icon: Server, label: "Global VPS", desc: "Enterprise Virtual Servers", to: "/service/global-vps" },
    { icon: Globe, label: "Cloud Hosting", desc: "Scalable Cloud Solutions", to: "/service/global-cloud" },
    { icon: Cpu, label: "Dedicated CPU", desc: "High Performance Computing", to: "/service/dedicated-cpu" },
  ],
  "GAMING": [
    { icon: Gamepad2, label: "Minecraft Hosting", desc: "Premium Game Servers", to: "/service/minecraft" },
  ],
};

const legalDropdown = [
  { icon: Shield, label: "Terms of Service", desc: "Guidelines for fair resource usage", to: "/legal/terms" },
  { icon: Shield, label: "Privacy Policy", desc: "How we handle your data", to: "/legal/privacy" },
  { icon: Shield, label: "Refund Policy", desc: "Our refund guarantee", to: "/legal/refund" },
  { icon: Shield, label: "SLA", desc: "Service Level Agreement", to: "/legal/sla" },
  { icon: Shield, label: "Fair Usage Policy", desc: "Guidelines for fair resource usage", to: "/legal/fair-usage" },
];

const Navbar = () => {
  const { currentLanguage, setLanguage, t, availableLanguages } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const handleLangEnter = () => {
    if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    setLangOpen(true);
  };

  const handleLangLeave = () => {
    langTimeoutRef.current = setTimeout(() => setLangOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (langTimeoutRef.current) clearTimeout(langTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setLangOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/[0.05] bg-[#030014]/60 backdrop-blur-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 font-heading text-2xl font-bold group">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500" />
              <img src="/logo.png" alt="VexaNode" className="relative h-10 w-auto rounded-xl border border-white/10" />
            </div>
            <div className="tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Vexa</span>
              <span className="text-white">Node</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            <div
              className="relative px-2 py-6"
              onMouseEnter={() => handleMouseEnter("services")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeDropdown === "services" ? "text-white bg-white/[0.05]" : "text-white/70 hover:text-white hover:bg-white/[0.03]"}`}>
                {t.nav.services}
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "services" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "services" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 bg-[#030014]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-5 w-[700px] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5 pointer-events-none" />
                    <div className="grid grid-cols-2 gap-8 relative z-10">
                      {Object.entries(servicesDropdown).map(([category, items]) => (
                        <div key={category} className="space-y-4">
                          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest pl-2">{category}</h4>
                          <div className="space-y-1">
                            {items.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all duration-300 group"
                              >
                                <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] transition-all duration-300">
                                  <item.icon size={18} className="text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div className="flex-1 pt-0.5">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm font-bold text-white/90 group-hover:text-white transition-colors">{item.label}</p>
                                    {item.badge && (
                                      <span className="text-[9px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-black tracking-widest uppercase shadow-[0_0_10px_rgba(var(--primary-rgb),0.2)]">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs font-medium text-white/50 group-hover:text-white/70 transition-colors leading-relaxed">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative px-2 py-6"
              onMouseEnter={() => handleMouseEnter("regions")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeDropdown === "regions" ? "text-white bg-white/[0.05]" : "text-white/70 hover:text-white hover:bg-white/[0.03]"}`}>
                {t.nav.regions}
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "regions" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "regions" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 bg-[#030014]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-3 w-[320px] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.1),transparent_50%)] pointer-events-none" />
                    <div className="space-y-1 relative z-10">
                      <Link to="/service/india-vps" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all duration-300 group">
                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 group-hover:border-primary/50 transition-all">
                          <MapPin size={18} className="text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white/90 group-hover:text-white">{t.nav.indiaVps}</p>
                          <p className="text-xs font-medium text-white/50">Mumbai Data Center</p>
                        </div>
                      </Link>
                      <Link to="/service/usa-vps" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all duration-300 group">
                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 group-hover:border-primary/50 transition-all">
                          <Globe size={18} className="text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white/90 group-hover:text-white">{t.nav.usaVps}</p>
                          <p className="text-xs font-medium text-white/50">Multiple US Locations</p>
                        </div>
                      </Link>
                      <Link to="/service/global-cloud" className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.05] transition-all duration-300 group">
                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 group-hover:border-primary/50 transition-all">
                          <Wifi size={18} className="text-primary group-hover:text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white/90 group-hover:text-white">{t.nav.globalCloud}</p>
                          <p className="text-xs font-medium text-white/50">Worldwide Coverage</p>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative px-2 py-6"
              onMouseEnter={() => handleMouseEnter("legal")}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeDropdown === "legal" ? "text-white bg-white/[0.05]" : "text-white/70 hover:text-white hover:bg-white/[0.03]"}`}>
                {t.nav.legal}
                <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === "legal" ? "rotate-180 text-primary" : ""}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === "legal" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 bg-[#030014]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-3 w-[260px] overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                    <div className="space-y-1 relative z-10">
                      {legalDropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-all duration-300 group"
                        >
                          <div className="p-2 rounded-lg bg-white/[0.02] group-hover:bg-primary/20 border border-white/[0.05] group-hover:border-primary/30 transition-all">
                            <item.icon size={16} className="text-white/50 group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/pricing"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive("/pricing") ? "text-primary bg-primary/10" : "text-white/70 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {t.nav.pricing}
            </Link>

            <Link
              to="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive("/blog") ? "text-primary bg-primary/10" : "text-white/70 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {t.nav.blog}
            </Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <div
              className="relative"
              onMouseEnter={handleLangEnter}
              onMouseLeave={handleLangLeave}
            >
              <button className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border border-transparent ${langOpen ? "bg-white/[0.05] border-white/[0.08]" : "hover:bg-white/[0.03]"}`}>
                <span className="text-lg drop-shadow-md">{currentLanguage.flag}</span>
                <ChevronDown size={14} className={`text-white/50 transition-transform duration-300 ${langOpen ? "rotate-180 text-white" : ""}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full right-0 mt-4 bg-[#030014]/95 backdrop-blur-3xl border border-white/[0.08] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-2 min-w-[180px]"
                  >
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang); setLangOpen(false); }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                          currentLanguage.code === lang.code 
                            ? "bg-gradient-to-r from-primary/20 to-primary/5 text-white border border-primary/20" 
                            : "text-white/70 hover:bg-white/[0.04] hover:text-white border border-transparent"
                        }`}
                      >
                        <span className="text-xl drop-shadow-md">{lang.flag}</span>
                        {lang.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-6 w-[1px] bg-white/[0.08] mx-1" />

            <Link
              to="https://billing.vexanode.cloud"
              className="relative group inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 border border-primary/50 rounded-xl group-hover:bg-primary/30 transition-all duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.8)_0%,transparent_100%)] blur-md transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                Client Area
              </span>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors border border-transparent active:border-white/[0.08]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden bg-[#030014]/95 backdrop-blur-3xl border-t border-white/[0.05] mx--4 px-4 rounded-b-3xl shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="py-6 space-y-4">
                <Link
                  to="/pricing"
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive("/pricing") ? "bg-primary/10 text-primary border border-primary/20" : "text-white/70 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {t.nav.pricing}
                </Link>
                <Link
                  to="/blog"
                  className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive("/blog") ? "bg-primary/10 text-primary border border-primary/20" : "text-white/70 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  {t.nav.blog}
                </Link>
                <Link
                  to="https://billing.vexanode.cloud"
                  className="block px-4 py-3 rounded-xl text-base font-bold text-center bg-primary text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] mt-4"
                >
                  Client Area
                </Link>

                <div className="pt-6 mt-6 border-t border-white/[0.08]">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40 px-2 mb-3">Language</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang); setMobileOpen(false); }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                          currentLanguage.code === lang.code 
                            ? "bg-primary/10 text-primary border-primary/30" 
                            : "border-white/[0.05] bg-white/[0.02] text-white/70 hover:bg-white/[0.05] hover:text-white"
                        }`}
                      >
                        <span className="text-xl drop-shadow-md">{lang.flag}</span> 
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;