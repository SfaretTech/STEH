
'use server';

import { recommendCourses, type RecommendCoursesInput } from '@/ai/flows/course-advisor';
import { Resend } from 'resend';
import { z } from 'zod';
import { courseData } from './course-data';

/**
 * AI Course Recommendation Action
 */
const interestsSchema = z.object({
  interests: z.string().min(10, 'Please tell us a bit more about your interests.'),
});

export async function getCourseRecommendation(prevState: any, formData: FormData) {
  const input = {
    interests: formData.get('interests'),
  };

  const validationResult = interestsSchema.safeParse(input);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await recommendCourses(validationResult.data as RecommendCoursesInput);
    return {
      message: 'Success',
      recommendation: result.recommendedCourses,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      errors: null,
    };
  }
}

/**
 * General Inquiry Action
 */
const inquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name.').optional(),
  firstName: z.string().min(2, 'Please enter your first name.').optional(),
  lastName: z.string().min(2, 'Please enter your last name.').optional(),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Please enter a message of at least 10 characters.'),
});

export async function submitInquiry(prevState: any, formData: FormData) {
  const rawFirstName = formData.get('firstName');
  const rawLastName = formData.get('lastName');
  const rawName = formData.get('name');
  
  const input = {
    firstName: rawFirstName,
    lastName: rawLastName,
    name: rawName,
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const validationResult = inquirySchema.safeParse(input);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, name, email, message } = validationResult.data;
  const fullName = name || `${firstName} ${lastName}`;
  
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 'your_api_key_here') {
    console.error('Resend API key is not set.');
    return {
        message: 'Server configuration error. Could not send email.',
        errors: null,
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const adminEmail = await resend.emails.send({
      from: 'STEH Inquiry <noreply@sfarettech.com.ng>',
      to: ['info@sfarettech.com.ng'],
      subject: 'New Inquiry/Registration from STEH Website',
      html: `
        <h1>New Inquiry</h1>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (adminEmail.error) {
      console.error('Resend admin email error:', adminEmail.error);
    }

    const userEmail = await resend.emails.send({
      from: 'SFARET TECH EDU HUB <noreply@sfarettech.com.ng>',
      to: email,
      subject: 'Thank you for your interest in STEH!',
      html: `
        <h1>Thank You!</h1>
        <p>Hi ${firstName || fullName.split(' ')[0]},</p>
        <p>We have received your details and will get back to you shortly.</p>
        <p>Best regards,<br/>The STEH Team</p>
      `,
    });

    return {
      message: 'Success',
      data: { fullName, email },
    };
  } catch (error) {
    console.error('Submit Inquiry error:', error);
    return {
      message: 'Failed to send message.',
      errors: null,
    };
  }
}

/**
 * Business Inquiry Action
 */
const businessInquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  organization: z.string().min(2, 'Organization is required'),
  industry: z.string().min(2, 'Industry is required'),
  service: z.string().min(1, 'Service is required'),
  message: z.string().min(10, 'Message is too short'),
});

export async function submitBusinessInquiry(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validationResult = businessInquirySchema.safeParse(data);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // Note: Email sending logic would go here in production
  return {
    message: 'Success',
    data: validationResult.data,
  };
}

/**
 * SIH Incubation Application Action
 */
const incubationSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  startupName: z.string().min(2, 'Startup name is required'),
  sector: z.string().min(1, 'Sector is required'),
  stage: z.string().min(1, 'Stage is required'),
  teamSize: z.string().min(1, 'Team size is required'),
  problem: z.string().min(10, 'Problem description is too short'),
  solution: z.string().min(10, 'Solution description is too short'),
  pitchLink: z.string().min(5, 'Pitch link is required'),
});

export async function submitIncubationApplication(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validationResult = incubationSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  return {
    message: 'Success',
    data: validationResult.data,
  };
}

/**
 * Course Enrollment Action
 */
const enrollmentSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  dob: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female']),
  address: z.string().min(5, 'Full address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  stateOfOrigin: z.string().min(2, 'State of origin is required'),
  education: z.string().min(1, 'Education qualification is required'),
  referral: z.string().optional(),
  nextOfKinName: z.string().min(2, 'Next of kin name is required'),
  nextOfKinPhone: z.string().min(10, 'Next of kin phone is required'),
  nextOfKinRelationship: z.string().min(2, 'Relationship is required'),
  course: z.string().min(1, 'Course is required'),
  grade: z.string().min(1, 'Grade level is required'),
  paymentOption: z.enum(['paynow', 'scholarship']),
  selectedSkills: z.string().optional(),
  passport: z.string().optional(), // Base64 string
});

export async function submitEnrollment(prevState: any, formData: FormData) {
  const skillsArray = formData.getAll('skills');
  const rawData = Object.fromEntries(formData.entries());
  
  const inputData = {
    ...rawData,
    selectedSkills: skillsArray.join(', '),
  };

  const validationResult = enrollmentSchema.safeParse(inputData);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // Find price from courseData
  const course = courseData.flatMap(cat => cat.courses).find(c => c.title === validationResult.data.course);
  const grade = course?.grades.find(g => g.level === validationResult.data.grade);
  const price = grade?.price || 'TBD';

  return {
    message: 'Success',
    data: {
      ...validationResult.data,
      price,
    },
  };
}

export async function sendEnrollmentEmail(data: any) {
  if (!process.env.RESEND_API_KEY) return { success: false, message: 'Config error' };
  const resend = new Resend(process.env.RESEND_API_KEY);

  const lmsUrl = 'https://steh.edu.ng/app';
  const isScholarship = data.paymentOption === 'scholarship';
  
  const pathMessage = isScholarship 
    ? `<p>You have applied for <strong>Scholarship Aid</strong>. Our administration team will review your application. If approved, you will receive a follow-up email with a unique coupon code to access your course.</p>`
    : `<p>You have selected the <strong>Pay Now</strong> option. To complete your enrollment and begin your self-paced classes, please visit our LMS portal to finalize your registration and payment.</p>`;

  try {
    await resend.emails.send({
      from: 'STEH Enrollment <noreply@sfarettech.com.ng>',
      to: data.email,
      subject: `Enrollment Summary: ${data.course}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
          <h1 style="color: #A050BE;">Enrollment Received</h1>
          <p>Hi ${data.name},</p>
          <p>Thank you for starting your professional journey with STEH. You have applied for <strong>${data.course} (${data.grade})</strong>.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Next Steps</h3>
            ${pathMessage}
            <p><strong>Official LMS Portal:</strong> <a href="${lmsUrl}" style="color: #50A0BE; font-weight: bold;">${lmsUrl}</a></p>
          </div>

          <p><strong>Areas of Interest:</strong> ${data.selectedSkills || 'General'}</p>
          <p><strong>Enrollment Fee:</strong> ${data.price}</p>
          
          <hr/>
          <p style="font-size: 12px; color: #666;">Sfaret Tech Edu Hub - Empowering the next generation of tech leaders.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (e) {
    return { success: false, message: 'Email failed' };
  }
}

export async function sendPostPaymentEmail({ email, name }: { email: string, name: string }) {
  if (!process.env.RESEND_API_KEY) return { success: false };
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'STEH Payments <noreply@sfarettech.com.ng>',
      to: email,
      subject: 'Payment Confirmation Received',
      html: `
        <h1>Payment Confirmed</h1>
        <p>Hi ${name},</p>
        <p>We have received your payment confirmation. Our team will verify it and send your final admission letter shortly.</p>
      `,
    });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

/**
 * Referral / Affiliate Action
 */
const referralSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  studentStatus: z.string().min(1, 'Status is required'),
  referralId: z.string().min(3, 'Referral ID too short'),
  message: z.string().min(10, 'Message too short'),
});

export async function submitReferral(prevState: any, formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const validationResult = referralSchema.safeParse(data);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { referralId } = validationResult.data;
  const uniqueReferralCode = `STEH-${referralId.toUpperCase()}`;

  return {
    message: 'Success',
    data: { uniqueReferralCode },
  };
}

/**
 * AI Code Verification Action
 */
import { verifyCode, type VerifyCodeInput } from '@/ai/flows/code-verifier';

const verifyCodeSchema = z.object({
  code: z.string().min(1, 'Cannot verify empty code.'),
  language: z.string().min(1, 'Language is required.'),
});

export async function submitCodeForVerification(prevState: any, formData: FormData) {
  const input = {
    code: formData.get('code') as string || '',
    language: formData.get('language') as string || '',
  };

  const validationResult = verifyCodeSchema.safeParse(input);

  if (!validationResult.success) {
    return {
      message: 'Validation failed',
      analysis: 'Please provide valid code and language.',
      isCorrect: false,
    };
  }

  try {
    const result = await verifyCode(validationResult.data as VerifyCodeInput);
    return {
      message: 'Success',
      ...result,
    };
  } catch (error) {
    console.error('Code verification error:', error);
    return {
      message: 'Failed to verify code with AI.',
      analysis: 'An unexpected error occurred while communicating with the AI. Please try again.',
      isCorrect: false,
    };
  }
}
