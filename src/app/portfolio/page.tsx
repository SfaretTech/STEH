import Header from '@/components/header';
import Footer from '@/components/footer';
import PortfolioPageContent from '@/components/sections/portfolio-page';

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <PortfolioPageContent />
      </main>
      <Footer />
    </div>
  );
}
