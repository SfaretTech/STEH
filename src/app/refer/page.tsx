
import Header from '@/components/header';
import Footer from '@/components/footer';
import ReferPageContent from '@/components/sections/refer-page';

export default function ReferPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <ReferPageContent />
      </main>
      <Footer />
    </div>
  );
}
