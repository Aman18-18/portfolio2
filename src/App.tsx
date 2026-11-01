import { Navigation } from "./components/Navigation";
import { IndexNav } from "./components/IndexNav";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { ScrollProgress } from "./components/ScrollProgress";
import { CursorGlow } from "./components/CursorGlow";
import { PageIntro } from "./components/PageIntro";
import { BackgroundFX } from "./components/BackgroundFX";
import { useLenis } from "./hooks/useLenis";
import { useCardSpotlight } from "./hooks/useCardSpotlight";

function App() {
  useLenis();
  useCardSpotlight();

  return (
    <>
      <PageIntro />
      <div className="noise-overlay" aria-hidden="true" />
      <BackgroundFX />
      <CursorGlow />
      <ScrollProgress />
      <Navigation />
      <IndexNav />
      <main className="relative">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

export default App;
