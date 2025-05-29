import Hero from './components/Hero';
import ExploreSection from './components/ExploreSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <Hero />
        <ExploreSection />
        {/* Add other sections here */}
      </div>
    </main>
  );
} 