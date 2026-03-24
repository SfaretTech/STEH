
import Header from '@/components/header';
import Footer from '@/components/footer';
import ReferralSignupPageContent from '@/components/sections/referral-signup-page';

export default function ReferralSignupPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <ReferralSignupPageContent />
      </main>
      <Footer />
    </div>
  );
}
