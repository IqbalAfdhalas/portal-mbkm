//src/app/page.tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Program from '@/components/sections/Program';
import Stats from '@/components/sections/Stats';
import Galery from '@/components/sections/Galery';
import ProfilMBKM from '@/components/sections/ProfilMBKM';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Program />
      <Stats />
      <Galery />  
      <ProfilMBKM />
      <Contact />
    </main>
  );
}
