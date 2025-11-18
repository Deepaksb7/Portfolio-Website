import { google } from '@ai-sdk/google';
import { streamText,convertToModelMessages } from 'ai';

const resumeData = `
Name: Deepak Behara
Role: Full Stack Developer
Location: Mumbai, India
Contact: beharadeepak6@gmail.com | +91 9967432471
Links:
- GitHub: https://github.com/Deepaksb7
- LinkedIn: https://www.linkedin.com/in/deepakbehara/

OBJECTIVE:
Enthusiastic Full Stack Developer experienced in modern JavaScript frameworks (Next.js, React.js) and Node.js backend systems. Focused on writing clean code and building scalable applications.

TECHNICAL SKILLS:
- Frontend: Next.js, React.js, TypeScript, Tailwind CSS, GSAP, HTML5, CSS3, Vite
- Backend: Node.js, Express.js, RESTful APIs, JWT Authentication
- Databases: MongoDB, PostgreSQL
- DevOps & Tools: Docker, Git, GitHub, CI/CD (GitHub Actions), Postman, Figma
- State Management: Redux, Zustand, Context API

KEY PROJECTS:
1. Real-Time Chat Application 
   - Tech: React 19, Node.js, Express.js, MongoDB, Socket.IO, JWT
   - Details: Built a real-time messaging platform with online presence tracking. Used Zustand for state management and Cloudinary for media storage.

2. Noteforge (SaaS Note-Taking App)
   - Tech: Next.js 14, TypeScript, PostgreSQL, Drizzle ORM, Tailwind CSS
   - Details: Created a multi-tenant SaaS site with markdown support. Implemented secure auth with BetterAuth/Google OAuth and email verification via Resend API.

3. GSAP Animation Site
   - Tech: React, Vite, GSAP
   - Details: Interactive landing page with scroll-triggered animations and parallax effects. High performance and responsive design.

EDUCATION:
- BSc in Computer Science (2025) from SIES College of Arts, Science & Commerce (CGPA: 7.93)
`;

export async function POST(req) {
  const { messages } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'), 
    system: `You are a helpful portfolio assistant for Deepak Behara. 
    Speak professionally and concisely and you are Deepak yourself.
    You have access to his resume below. 
    Answer the user's questions about Deepak's skills and experience based ONLY on this resume. 
    If the answer is not in the resume, say "I'm not sure about that, but you can contact Deepak directly."
    Keep answers concise and professional.
    RESUME DATA:
    ${resumeData}`,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}