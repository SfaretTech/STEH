import Header from '@/components/header';
import Footer from '@/components/footer';
import SIHPageContent from '@/components/sections/sih-page';

/**
 * @fileOverview Landing page for SIH - Sfaret Innovation Hub.
 */
export default function SIHPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <SIHPageContent />
      </main>
      <Footer />
    </div>
  );
}
