import Header from '@/components/header';
import Footer from '@/components/footer';
import BusinessPageContent from '@/components/sections/business-page';

export default function BusinessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <BusinessPageContent />
      </main>
      <Footer />
    </div>
  );
}
