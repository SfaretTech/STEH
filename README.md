# Sfaret Technologies E-Learning Platform

Welcome to the **Sfaret Technologies E-Learning Platform**, an interactive, gamified learning dashboard designed to deliver structured and progressive tech education. This platform features customized curricula across multiple disciplines, including Web Development and Cybersecurity, enforcing a step-by-step sequential learning model to enhance student engagement and retention.

## 🚀 Key Features

- **Progressive Learning Modules:** A structured learning path separated into sequential stages: *Overview, Video, Reflection, Quiz, and Documentation*. Users must complete each step to unlock the next.
- **Custom Curricula Tracks:** Tailored content delivery supporting multiple tech domains (e.g., Web Development, Cybersecurity).
- **Gamified Dashboard:** Interactive interfaces to keep learners motivated and track their progress through courses.
- **Integrated Video Learning:** Clean, embedded YouTube video playback with restricted branding using `react-player`.
- **Interactive Code Editor & Terminal:** Live coding environments built directly into the browser utilizing `@monaco-editor/react` and `@xterm/xterm`.
- **AI-Powered Capabilities:** Integrated with Google Genkit (`@genkit-ai/googleai`, `@genkit-ai/next`) to smart-assist learners and provide dynamic feedback.
- **Data & Progress Visualization:** Rich charts and progress tracking via `recharts`.
- **PDF Generation & Email Notifications:** Exporting progression/certificates using `jspdf` & `html2canvas`, and transactional emails powered by `resend`.

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React.js 18
- **Styling:** Tailwind CSS with Radix UI primitives & Framer Motion for smooth animations
- **Forms & Validation:** React Hook Form + Zod
- **Backend & Database:** Firebase
- **AI Integration:** Firebase Genkit (Google AI)
- **Code & Terminal Environment:** Monaco Editor, XTerm.js

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed along with npm or bun/yarn/pnpm.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Ensure your `.env` or `.env.local` files are configured with your Firebase, Genkit, and Resend credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the Next.js server on port 9002 (`http://localhost:9002`).

### AI Development

To run the local Genkit development server:
```bash
npm run genkit:dev
```

## 📜 Project Structure

- `src/app/` - Next.js App Router pages and API routes.
- `src/ai/` - Genkit AI logic and definitions.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is proprietary and intended for Sfaret Technologies use.
