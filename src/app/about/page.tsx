import Header from '@/components/header';
import Footer from '@/components/footer';
import AboutPageContent from '@/components/sections/about-page';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <AboutPageContent />
      </main>
      <Footer />
    </div>
  );
}
