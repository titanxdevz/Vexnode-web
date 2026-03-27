import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type LegalContent = {
  title: string;
  lastUpdated: string;
  sections: { heading: string; content: string }[];
};

const legalPages: Record<string, LegalContent> = {
  terms: {
    title: "Terms of Service",
    lastUpdated: "March 15, 2026",
    sections: [
      { heading: "1. Acceptance of Terms", content: "By accessing or using VexaNode services, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services. These terms apply to all visitors, users, and others who access or use our services." },
      { heading: "2. Description of Services", content: "VexaNode provides web hosting services including but not limited to Discord bot hosting, Lavalink hosting, VPS hosting, database hosting, and Minecraft server hosting. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time." },
      { heading: "3. User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use." },
      { heading: "4. Acceptable Use", content: "You agree not to use our services for any illegal or unauthorized purpose. You must not violate any laws in your jurisdiction. Prohibited activities include but are not limited to: distributing malware, launching DDoS attacks, hosting illegal content, cryptocurrency mining without authorization, and sending spam." },
      { heading: "5. Payment Terms", content: "Paid services are billed in advance on a monthly basis. All fees are non-refundable except as expressly stated in our Refund Policy. We reserve the right to change pricing with 30 days notice." },
      { heading: "6. Service Level Agreement", content: "We guarantee 99.9% uptime for all paid services. Details of our uptime guarantee and compensation for downtime are outlined in our separate Service Level Agreement." },
      { heading: "7. Termination", content: "We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion." },
      { heading: "8. Limitation of Liability", content: "VexaNode shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability shall not exceed the amount paid by you in the twelve months preceding the claim." },
      { heading: "9. Changes to Terms", content: "We reserve the right to modify these terms at any time. We will provide notice of material changes by posting the updated terms on our website. Continued use after changes constitutes acceptance." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "March 15, 2026",
    sections: [
      { heading: "1. Information We Collect", content: "We collect information you provide directly: name, email address, payment information, and account credentials. We also automatically collect usage data, IP addresses, browser type, and device information when you use our services." },
      { heading: "2. How We Use Your Information", content: "We use collected information to provide and maintain our services, process transactions, send service notifications, respond to support requests, detect and prevent fraud, and improve our services." },
      { heading: "3. Data Storage and Security", content: "Your data is stored on secure servers with encryption at rest and in transit. We implement industry-standard security measures including firewalls, access controls, and regular security audits." },
      { heading: "4. Third-Party Services", content: "We may share your information with third-party service providers who assist in operating our services, such as payment processors and analytics providers. These parties are obligated to protect your information." },
      { heading: "5. Cookies and Tracking", content: "We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie settings through your browser preferences." },
      { heading: "6. Your Rights", content: "You have the right to access, correct, or delete your personal data. You may also request data portability or restrict processing. Contact us at privacy@vexanode.com to exercise these rights." },
      { heading: "7. Data Retention", content: "We retain your personal data only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law." },
    ],
  },
  refund: {
    title: "Refund Policy",
    lastUpdated: "March 15, 2026",
    sections: [
      { heading: "1. Refund Eligibility", content: "Refund requests must be submitted within 7 days of the initial purchase for new services. Renewals are non-refundable. Free services are not eligible for refunds." },
      { heading: "2. How to Request a Refund", content: "To request a refund, contact our support team via Discord or email at billing@vexanode.com with your order ID and reason for the refund. We process refund requests within 3-5 business days." },
      { heading: "3. Partial Refunds", content: "If you have used a significant portion of the service period, we may issue a partial refund based on the unused portion of the billing cycle, at our discretion." },
      { heading: "4. Non-Refundable Items", content: "Domain registrations, setup fees, custom configurations, and services that have been terminated due to Terms of Service violations are non-refundable." },
      { heading: "5. Refund Method", content: "Refunds are processed to the original payment method. Processing time depends on your payment provider and may take 5-10 business days to appear in your account." },
    ],
  },
  sla: {
    title: "Service Level Agreement",
    lastUpdated: "March 15, 2026",
    sections: [
      { heading: "1. Uptime Guarantee", content: "VexaNode guarantees 99.9% uptime for all paid hosting services, measured on a monthly basis. This excludes scheduled maintenance windows, which are announced at least 48 hours in advance." },
      { heading: "2. Uptime Calculation", content: "Uptime is calculated as: (Total minutes in month - Downtime minutes) / Total minutes in month × 100. Downtime is defined as a period where the service is completely inaccessible to all users." },
      { heading: "3. Service Credits", content: "If uptime falls below 99.9% in a calendar month, affected customers are eligible for service credits: Below 99.9% = 10% credit; Below 99.0% = 25% credit; Below 95.0% = 50% credit. Credits are applied to the next billing cycle." },
      { heading: "4. Exclusions", content: "The SLA does not cover: scheduled maintenance, force majeure events, customer-caused issues, third-party service outages, or DDoS attacks that exceed our mitigation capacity." },
      { heading: "5. Claiming Credits", content: "To claim a service credit, submit a ticket within 30 days of the downtime event with details of the outage. Credits are applied automatically after verification." },
      { heading: "6. Network Performance", content: "We target less than 1ms latency within our data center network and less than 50ms to major internet exchange points. Network performance metrics are available on our status page." },
    ],
  },
  "fair-usage": {
    title: "Fair Usage Policy",
    lastUpdated: "March 15, 2026",
    sections: [
      { heading: "1. Purpose", content: "This Fair Usage Policy ensures that all users can enjoy reliable and consistent service quality. It defines acceptable resource usage limits to prevent abuse and maintain optimal performance for everyone." },
      { heading: "2. CPU Usage", content: "Shared hosting plans have CPU usage limits as specified in the plan details. Sustained CPU usage above the allocated limit may result in throttling or a request to upgrade. Burst usage above limits is permitted for short periods." },
      { heading: "3. Network Usage", content: "All plans include generous bandwidth allocations. Sustained high-bandwidth activities such as file distribution, streaming, or proxy services beyond the plan limits may require a dedicated solution." },
      { heading: "4. Storage Usage", content: "Storage must be used for content directly related to the hosted service. Using allocated storage for file archival, backup mirroring, or content distribution beyond the service scope is prohibited." },
      { heading: "5. Prohibited Activities", content: "The following activities are prohibited: cryptocurrency mining, running open proxies or VPNs for public use, hosting phishing sites, distributing malware, port scanning, and any activity that disrupts service for other users." },
      { heading: "6. Enforcement", content: "Violations of this policy may result in warnings, temporary throttling, service suspension, or termination depending on severity. We will attempt to contact you before taking action except in cases of severe abuse." },
    ],
  },
};

const LegalPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = legalPages[slug || ""];

  if (!page) {
    return (
      <div className="min-h-screen bg-background">
        <TopBanner />
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground">The requested legal page does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBanner />
      <Navbar />

      <section className="relative py-14 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-hero-bg)" }} />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-heading font-bold"
          >
            {page.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground mt-3 text-sm"
          >
            Last updated: {page.lastUpdated}
          </motion.p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 lg:p-10 space-y-8"
          >
            {page.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-heading font-semibold text-lg mb-3">{section.heading}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LegalPage;
