import { CtaSection, FeaturesSection, FooterSection, HeroSection, HowItWorksSection, NavbarLanding, StatsSection } from "@/presentation/components/features/landing";
import { AnimatedBackground } from "@/presentation/components/ui/animated-background";
import { FloatingElements } from "@/presentation/components/ui/floating-elements";
import { ScrollToTop } from "@/presentation/components/ui/scroll-to-top";


/**
 * Landing page principal con diseño premium
 * Convertido de HTML/CSS a React + Tailwind + Framer Motion
 */
export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Background Effects */}
      <AnimatedBackground />
      <FloatingElements />

      {/* Navigation */}
      <NavbarLanding />

      {/* Page Sections */}
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}