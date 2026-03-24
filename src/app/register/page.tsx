import Header from '@/components/header';
import Footer from '@/components/footer';
import RegisterPageContent from '@/components/sections/register-page';

/**
 * @fileOverview Dedicated Registration page for STEH.
 */
export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <RegisterPageContent />
      </main>
      <Footer />
    </div>
  );
}
