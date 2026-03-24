import Header from '@/components/header';
import Footer from '@/components/footer';
import Courses from '@/components/sections/courses';

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16 sm:py-24">
        <Courses />
      </main>
      <Footer />
    </div>
  );
}
