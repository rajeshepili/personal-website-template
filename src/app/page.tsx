import About from "@/components/layout/sections/About";
import Contact from "@/components/layout/sections/Contact";
import Experience from "@/components/layout/sections/Experience";
import Hero from "@/components/layout/sections/Hero";
import Projects from "@/components/layout/sections/Posts";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
