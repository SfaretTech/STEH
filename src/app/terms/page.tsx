import Header from '@/components/header';
import Footer from '@/components/footer';
import TermsPageContent from '@/components/sections/terms-page';

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <TermsPageContent />
      </main>
      <Footer />
    </div>
  );
}
