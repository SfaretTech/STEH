import * as dotenv from 'dotenv';
dotenv.config({ path: 'c:/Users/LAWRENCE DIKE/Downloads/project/.env' });

import { Resend } from 'resend';

async function testAll() {
  console.log('Testing Resend with random recipient...');
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: 'STEH Inquiry <noreply@sfarettech.com.ng>',
      to: 'random_test_1234@example.com',
      subject: 'Test email from STEH',
      html: '<p>It works!</p>'
    });
    console.log('Resend test result:', result);
  } catch (e) {
    console.error('Resend error:', e);
  }
}

testAll();
