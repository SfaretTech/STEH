import * as dotenv from 'dotenv';
dotenv.config({ path: 'c:/Users/LAWRENCE DIKE/Downloads/project/.env' });
import { recommendCourses } from './src/ai/flows/course-advisor';

async function testGenkit() {
    console.log('Testing Genkit gemini-1.5-flash...');
    try {
        const result = await recommendCourses({ interests: 'I love programming' });
        console.log('Result:', result);
    } catch (error) {
        console.error('Caught an error in Genkit:', error);
    }
}
testGenkit();
