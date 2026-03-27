import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Clock, Tag, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const LimitedTimeOfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

  useEffect(() => {
    // Check if user has seen the popup before
    const hasSeenPopup = localStorage.getItem('hasSeenLimitedTimeOffer');
    
    if (!hasSeenPopup) {
      // Show popup after 2 seconds of page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setHasSeen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark as seen in localStorage
    localStorage.setItem('hasSeenLimitedTimeOffer', 'true');
    setHasSeen(true);
  };

  const handleGetOffer = () => {
    // Mark as seen and redirect to billing
    localStorage.setItem('hasSeenLimitedTimeOffer', 'true');
    setHasSeen(true);
    // Redirect to billing page with coupon
    window.location.href = 'https://billing.vexanode.cloud';
  };

  if (hasSeen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            {/* Popup */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative bg-gradient-to-br from-background via-background/95 to-background border border-primary/20 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background border border-border/50 transition-all hover:scale-110"
                aria-label="Close popup"
              >
                <X size={18} className="text-muted-foreground" />
              </motion.button>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Animated gift icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.2,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-20 h-20 mx-auto mb-6 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-2xl flex items-center justify-center">
                    <Gift size={36} className="text-white" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-2 bg-primary/20 rounded-2xl blur-xl"
                  />
                </motion.div>

                {/* Title */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold font-heading mb-2">
                    Limited Time Offer
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-primary font-semibold mb-4">
                    <Clock size={16} className="animate-pulse" />
                    <span>Get 20% OFF on All Hosting Plans</span>
                  </div>
                </motion.div>

                {/* Coupon code */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/20 border border-primary/30 rounded-lg px-4 py-2">
                    <Tag size={16} className="text-primary" />
                    <span className="font-mono font-bold text-primary">VEXA20</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-muted-foreground mb-6 text-sm"
                >
                  Don't miss out on this exclusive discount! Upgrade your hosting experience with our premium plans.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-3"
                >
                  <motion.button
                    onClick={handleGetOffer}
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Claim Your Discount
                    <ArrowRight size={18} />
                  </motion.button>
                  
                  <motion.button
                    onClick={handleClose}
                    className="w-full text-muted-foreground hover:text-foreground px-6 py-2 rounded-lg text-sm transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Maybe later
                  </motion.button>
                </motion.div>

                {/* Urgency indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4"
                >
                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    <span>Limited time offer - Act fast!</span>
                  </div>
                </motion.div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LimitedTimeOfferPopup;
