import { CommunitySection } from "@/components/community-section";
import { ContactSection } from "@/components/contact-section";
import { EssenceSection } from "@/components/essence-section";
import { EventsSection } from "@/components/events-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { HistorySection } from "@/components/history-section";
import { LocationsSection } from "@/components/locations-section";
import { MissionSection } from "@/components/mission-section";
import { Navbar } from "@/components/navbar";
import { PrayerSection } from "@/components/prayer-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { WhatIsSection } from "@/components/what-is-section";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <Navbar />
      <Hero />
      <WhatIsSection />
      <HistorySection />
      <MissionSection />
      <EssenceSection />
      <EventsSection />
      <CommunitySection />
      <TestimonialsSection />
      <PrayerSection />
      <ContactSection />
      <LocationsSection />
      <Footer />
    </main>
  );
}
