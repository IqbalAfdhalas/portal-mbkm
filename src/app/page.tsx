//src/app/page.tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Program from '@/components/sections/Program';
import Stats from '@/components/sections/Stats';
import Direktori from '@/components/sections/Direktori';
import Galery from '@/components/sections/Galery';
import Contact from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Program />
      <Stats />
      <Direktori /> 
      <Galery />  
      <Contact />
    </main>
  );
}
