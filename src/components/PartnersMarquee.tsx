import { motion } from "framer-motion";
import { useState } from "react";

// Using live CDN links for immediate rendering. 
// You can replace these with your own local paths like "/logos/cloudflare.png" later.
const partners = [
  { name: "Cloudflare", logo: "https://cdn.simpleicons.org/cloudflare/white" },
  { name: "Intel", logo: "https://cdn.simpleicons.org/intel/white" },
  { name: "AMD", logo: "https://cdn.simpleicons.org/amd/white" },
  { name: "Samsung", logo: "https://cdn.simpleicons.org/samsung/white" },
  { name: "NeoProtect", logo: "https://cdn.simpleicons.org/springsecurity/white" }, // Placeholder logo for NeoProtect
  { name: "Pterodactyl", logo: "https://cdn.simpleicons.org/pterodactyl/white" },
];

const PartnerLogo = ({ partner }: { partner: { name: string; logo: string } }) => {
  const [hasError, setHasError] = useState(false);

  // If the image fails to load, gracefully fallback to text
  if (hasError) {
    return (
      <span className="text-2xl font-bold text-white/40 group-hover:text-white transition-colors duration-500 uppercase tracking-wider drop-shadow-lg">
        {partner.name}
      </span>
    );
  }

  return (
    <img 
      src={partner.logo} 
      alt={`${partner.name} logo`}
      onError={() => setHasError(true)}
      className="h-8 sm:h-10 w-auto object-contain opacity-40 grayscale transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
      draggable={false}
    />
  );
};

const PartnersMarquee = () => {
  // Duplicate array 3 times for a seamless infinite scroll effect
  const doubledPartners = [...partners, ...partners, ...partners];

  return (
    <section className="relative py-12 overflow-hidden bg-[#030014] border-y border-white/[0.05]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.05)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Left/Right Fade Gradients for smooth entering/exiting */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030014] via-[#030014]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#030014] via-[#030014]/90 to-transparent z-10 pointer-events-none" />

      {/* Marquee Animation */}
      <motion.div
        className="flex w-max items-center gap-28 pr-28"
        animate={{ x: ["0%", "-33.333333%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {doubledPartners.map((partner, i) => (
          <div 
            key={i} 
            className="group flex items-center justify-center cursor-pointer min-w-[120px]"
          >
            <PartnerLogo partner={partner} />
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default PartnersMarquee;