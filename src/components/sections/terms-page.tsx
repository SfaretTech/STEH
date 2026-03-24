'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const TermsPageContent = () => {
  const terms = [
    {
      title: '1. Introduction',
      content:
        'Welcome to SFARET TECH EDU HUB (STEH). These Terms and Conditions govern your use of our services, including all courses, materials, and platforms. By enrolling in our courses, you agree to comply with and be bound by these terms.',
    },
    {
      title: '2. Enrollment and Registration',
      content:
        'To enroll in a course, you must complete the registration process and provide accurate and complete information. Enrollment is subject to availability and our acceptance of your application. You are responsible for maintaining the confidentiality of your account information.',
    },
    {
      title: '3. Course Fees and Payment',
      content:
        'All course fees are listed in Nigerian Naira (₦) and must be paid in full before the course commencement, unless a payment plan has been agreed upon. We accept various payment methods as indicated during the enrollment process. Fees are non-refundable except as expressly stated in our Refund Policy.',
    },
    {
      title: '4. Code of Conduct',
      content:
        'All students are expected to maintain a professional and respectful demeanor. Harassment, discrimination, academic dishonesty, and any disruptive behavior will not be tolerated. Violation of this code may result in disciplinary action, including suspension or expulsion from the program without a refund.',
    },
    {
      title: '5. Intellectual Property',
      content:
        'All course materials, including but not limited to lectures, notes, videos, and software, are the intellectual property of SFARET TECHNOLOGIES LIMITED. These materials are for your personal, non-commercial use only. Unauthorized distribution, reproduction, or sharing of these materials is strictly prohibited.',
    },
    {
      title: '6. Student Work and Portfolios',
      content:
        'You retain ownership of the original work you create as part of your course projects. However, by submitting your work, you grant STEH a non-exclusive, royalty-free license to use, reproduce, and display your work for promotional and educational purposes, such as in our marketing materials or student showcases.',
    },
    {
      title: '7. Certification',
      content:
        'A certificate of completion will be awarded to students who successfully meet all course requirements, including attendance, project submissions, and assessments. The issuance of a certificate is at the sole discretion of STEH.',
    },
    {
      title: '8. Limitation of Liability',
      content:
        'SFARET TECH EDU HUB and its parent company, SFARET TECHNOLOGIES LIMITED, are not liable for any indirect, incidental, or consequential damages arising from your participation in our courses. Our total liability is limited to the amount of fees you have paid for the course in question.',
    },
    {
      title: '9. Disclaimer of Warranties',
      content:
        'Our courses are provided "as is" without any warranties, express or implied. We do not guarantee any specific career outcomes, job placements, or income levels as a result of completing our training.',
    },
    {
      title: '10. Changes to Terms',
      content:
        'STEH reserves the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. Your continued use of our services after such changes constitutes your acceptance of the new terms.',
    },
     {
      title: '11. Governing Law',
      content:
        'These Terms and Conditions shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.',
    },
  ];

  return (
    <section id="terms" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline tracking-tight text-foreground sm:text-5xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-xl text-foreground/80">
            Please read these terms carefully before using our services.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <Card className="bg-secondary/30 border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 font-headline text-2xl text-primary">
                        <FileText />
                        SFARET TECH EDU HUB - Terms of Service
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {terms.map((term, index) => (
                        <div key={index}>
                            <h2 className="font-headline text-xl font-semibold mb-2 text-foreground">{term.title}</h2>
                            <p className="text-muted-foreground text-base leading-relaxed">{term.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
};

export default TermsPageContent;
