"use client";

import { useEffect } from "react";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Stats from "@/components/home/Stats";
import ContactForm from "@/components/home/ContactForm";

export default function Home() {
  useEffect(() => {
    async function trackVisit() {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'page_visit',
            elementId: 'home_page',
            url: window.location.href,
          }),
        });
      } catch (err) {
        console.error('Analytics page visit log failed:', err);
      }
    }
    trackVisit();
  }, []);

  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <ContactForm />
    </>
  );
}