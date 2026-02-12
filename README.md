# 🚀 TalentLoom 🧶

TalentLoom is a comprehensive interview platform designed to streamline the hiring process for both candidates and interviewers. It combines real-time video communication with AI-powered tools and an integrated coding environment to provide a seamless technical interview experience.

## 📝 Description

This repository contains the full-stack source code for TalentLoom, a modern web application built with **Next.js 15** and **Convex**. The platform allows organizations to schedule and conduct technical interviews, while providing candidates with a unique **AI Mock Interview** feature to practice their skills before the real thing.

## ✨ Features

* 🤖 **AI Mock Interviews:** Practice sessions powered by AI using **OpenAI** and **Vapi** to simulate real-world technical and behavioral questions.
* 📹 **Real-time Video Calls:** High-quality video conferencing integrated directly into the platform via **Stream.io**.
* 💻 **Collaborative Code Editor:** A built-in **Monaco Editor** that supports multiple languages (JavaScript, Python, Java) for live technical assessments.
* 📅 **Interview Scheduling:** A dedicated system for interviewers to schedule, manage, and track upcoming sessions.
* 📊 **Interviewer Dashboard:** Evaluate candidates, leave detailed comments, and assign ratings within a centralized dashboard.
* 🔐 **Secure Authentication:** User management and protected routes handled seamlessly by **Clerk**.
* 🌓 **Dark Mode Support:** A beautiful, responsive UI with light and dark themes using **Tailwind CSS**.

## 💻 Tech Stack

* **Framework:** [Next.js 15](https://nextjs.org/)
* **Backend & Database:** [Convex](https://www.convex.dev/)
* **Authentication:** [Clerk](https://clerk.com/)
* **Video/Audio SDK:** [Stream](https://getstream.io/)
* **AI Engine:** [OpenAI](https://openai.com/) & [Vapi](https://vapi.ai/)
* **Code Editor:** [@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Shadcn/UI](https://ui.shadcn.com/)

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### ✅ Prerequisites

* **Node.js** (v18 or later)
* **npm**, **yarn**, or **pnpm**
* Accounts for **Convex**, **Clerk**, **Stream**, and **OpenAI** to obtain API keys.

### 🛠️ Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/tushar591/talent-loom.git](https://github.com/tushar591/talent-loom.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd talent-loom
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add the following keys (fill in your values from your respective dashboards):
    ```env
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Convex
    CONVEX_DEPLOYMENT=your_convex_deployment_id
    NEXT_PUBLIC_CONVEX_URL=your_convex_url

    # Stream
    NEXT_PUBLIC_STREAM_API_KEY=your_stream_key
    STREAM_SECRET_KEY=your_stream_secret

    # AI Config (Vapi & OpenAI)
    NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_key
    ```
5.  **Run Convex dev server:**
    ```sh
    npx convex dev
    ```
6.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:3000` 🌐.

## 💡 Usage

* **As an Interviewer:** Access the admin dashboard to schedule new interviews, join live sessions with candidates, use the collaborative editor, and leave feedback.
* **As a Candidate:** View your upcoming scheduled interviews and practice with the **AI Mock Interview** tool to receive real-time AI feedback on your performance.

## 🙏 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project 🍴
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request 📬
