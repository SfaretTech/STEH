'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyCodeInputSchema = z.object({
  code: z.string().describe('The code submitted by the user.'),
  language: z.string().describe('The programming language of the code.'),
});
export type VerifyCodeInput = z.infer<typeof VerifyCodeInputSchema>;

const VerifyCodeOutputSchema = z.object({
  analysis: z.string().describe('The detailed AI analysis and feedback on the code.'),
  isCorrect: z.boolean().describe('Whether the code seems syntactically correct and logical.'),
});
export type VerifyCodeOutput = z.infer<typeof VerifyCodeOutputSchema>;

export async function verifyCode(input: VerifyCodeInput): Promise<VerifyCodeOutput> {
  return verifyCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyCodePrompt',
  input: { schema: VerifyCodeInputSchema },
  output: { schema: VerifyCodeOutputSchema },
  prompt: `You are an expert programming mentor for SFARET TECH EDU HUB (STEH).
  
  Please analyze the following code snippet written in {{language}}.
  Provide constructive feedback, point out any syntax errors, logical bugs, or bad practices.
  Then cleanly summarize your findings. Only output plain text. Keep your response brief but informative.

  Language: {{language}}
  Code:
  {{code}}
  `,
});

const verifyCodeFlow = ai.defineFlow(
  {
    name: 'verifyCodeFlow',
    inputSchema: VerifyCodeInputSchema,
    outputSchema: VerifyCodeOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
