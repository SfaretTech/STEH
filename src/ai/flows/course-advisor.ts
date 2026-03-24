'use server';

/**
 * @fileOverview AI-powered course recommendation tool.
 *
 * - recommendCourses - A function that recommends courses based on user interests and goals.
 * - RecommendCoursesInput - The input type for the recommendCourses function.
 * - RecommendCoursesOutput - The return type for the recommendCourses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCoursesInputSchema = z.object({
  interests: z
    .string()
    .describe('The interests and goals of the prospective student.'),
});
export type RecommendCoursesInput = z.infer<typeof RecommendCoursesInputSchema>;

const RecommendCoursesOutputSchema = z.object({
  recommendedCourses: z
    .string()
    .describe('A list of recommended courses based on the user input.'),
});
export type RecommendCoursesOutput = z.infer<typeof RecommendCoursesOutputSchema>;

export async function recommendCourses(input: RecommendCoursesInput): Promise<RecommendCoursesOutput> {
  return recommendCoursesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCoursesPrompt',
  input: {schema: RecommendCoursesInputSchema},
  output: {schema: RecommendCoursesOutputSchema},
  prompt: `You are an AI-powered course recommendation tool for SFARET TECH EDU HUB (STEH).

  Based on the user's interests and goals, recommend the most suitable courses at STEH.

  Courses available at STEH:
  Web Technologies:
    - HTML, CSS, JavaScript, TypeScript
    - Frontend Development
    - Backend Development
    - Fullstack Developer track
    - PHP, Python, Drupal
    - No code Development
    - AI in Coding
    - UI/UX Design, Git/GitHub

  Cyber Security:
    - Cybersecurity & Ethical Hacking
    - Network Security, Digital Forensics, Cryptography, Cloud Security

  Graphics Design:
    - CorelDRAW, Adobe Photoshop, Canva, Figma
    - Branding, Typography, Color Theory

  Digital Marketing:
    - Social Media Marketing, SEO & SEM
    - Content Strategy, Email Marketing
    - Analytics & Data, AI in Marketing

  Internet of Things (IoT):
    - IoT (Arduino, sensors)
    - Embedded Systems
    - Smart Automation Projects

  Microsoft Packages & Productivity Tools:
    - Microsoft Word, Excel, PowerPoint, Access, Outlook, Teams
    - Basic Graphic Design (Canva)

  User Interests and Goals: {{{interests}}}

  Recommended Courses:
  `,
});

const recommendCoursesFlow = ai.defineFlow(
  {
    name: 'recommendCoursesFlow',
    inputSchema: RecommendCoursesInputSchema,
    outputSchema: RecommendCoursesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
