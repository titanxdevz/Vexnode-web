import { motion, AnimatePresence } from "framer-motion";
import { User, CreditCard, Server, ExternalLink, LogOut, Settings, HelpCircle, ChevronUp } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ClientSpaceHover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      icon: User,
      label: "Client Area",
      description: "Manage your account",
      url: "https://billing.vexanode.cloud",
      color: "text-blue-500"
    },
    {
      icon: Server,
      label: "Control Panel",
      description: "Access your servers",
      url: "https://panel.vexanode.cloud",
      color: "text-green-500"
    },
    {
      icon: CreditCard,
      label: "Billing",
      description: "Invoices & payments",
      url: "https://billing.vexanode.cloud/billing",
      color: "text-purple-500"
    },
    {
      icon: Settings,
      label: "Services",
      description: "Your active services",
      url: "https://billing.vexanode.cloud/services",
      color: "text-orange-500"
    },
    {
      icon: HelpCircle,
      label: "Support",
      description: "Get help & tickets",
      url: "https://billing.vexanode.cloud/support",
      color: "text-cyan-500"
    },
    {
      icon: LogOut,
      label: "Logout",
      description: "Sign out of all areas",
      url: "#",
      color: "text-red-500",
      action: "logout"
    }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.action === "logout") {
      // Handle logout logic here
      console.log("Logging out...");
      setIsOpen(false);
    } else {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg font-medium transition-all border border-primary/20 hover:border-primary/40"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <User size={18} />
        <span className="hidden sm:inline">Client Space</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUp size={16} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-80 bg-background/95 backdrop-blur-lg border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Client Portal</h3>
                  <p className="text-xs text-muted-foreground">Access all your services</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleItemClick(item)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all group relative overflow-hidden"
                >
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Icon */}
                  <div className={`w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={18} className={item.color} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm group-hover:text-primary transition-colors">
                      {item.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                  
                  {/* External Link Indicator */}
                  {item.action !== "logout" && (
                    <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-border bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>vexanode.cloud</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>All systems operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientSpaceHover;
