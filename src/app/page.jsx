import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Stats from "@/components/home/Stats";
import ContactForm from "@/components/home/ContactForm";


export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Portfolio />
            <Stats />
            <ContactForm />
        </>
    )
}