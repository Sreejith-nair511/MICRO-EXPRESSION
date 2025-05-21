Mood Mirror 😃🪞

**Mood Mirror** is a modern, responsive, camera-based mood detection web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. 
It captures facial expressions via webcam and reflects a visual avatar and dashboard to represent your current mood.

---

## 🧠 Features

- 📸 Real-time camera feed using browser APIs
- 🤖 Mood detection integration
- 🧍 Mood avatar reflecting emotions dynamically
- 📊 Mood dashboard showing mood history and stats
- 🌗 Light/Dark mode toggle
- ⚡ Powered by modern tools like Next.js, Tailwind CSS, and shadcn/ui

---

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Package Manager**: pnpm
- **Config**: `postcss`, `tailwind`, `tsconfig`, and more

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/mood-mirror.git
cd mood-mirror

# Install dependencies using pnpm
pnpm install

# Run the development server
pnpm dev
Now open http://localhost:3000 in your browser.

🗂 Project Structure

mood-mirror/
│
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with ThemeProvider
│   ├── page.tsx             # Home page with camera feed & dashboard
│   └── globals.css          # Global Tailwind styles
│
├── components/              # UI & functional components
│   ├── mood-mirror.tsx      # Main app logic
│   ├── camera-feed.tsx      # Webcam capture logic
│   ├── mood-dashboard.tsx   # Displays mood analytics
│   ├── mood-avatar.tsx      # Mood-representing avatar
│   ├── theme-provider.tsx   # Handles dark/light mode
│   └── ui/                  # Shadcn-based reusable components
│
├── public/                  # Static assets (if any)
│
├── tailwind.config.ts       # Tailwind CSS config
├── postcss.config.mjs       # PostCSS config
├── next.config.mjs          # Next.js config
├── tsconfig.json            # TypeScript settings
├── package.json             # Project metadata & scripts
└── pnpm-lock.yaml           # Lock file for dependencies
🚀 Usage Guide
Grant webcam access to allow live mood detection.

Your facial mood is analyzed and visualized.

The dashboard tracks your mood stats.

Use the theme toggle to switch between dark and light modes.

🤔 TODO / Future Improvements
Integrate a real mood detection model (e.g., TensorFlow.js, MediaPipe)
api note added 

Add mood history graph and export options

Enable mood journaling & reflection features

Deploy to Vercel

📄 License
This project is licensed under the MIT License.

🙌 Credits
Built with ❤️ using Next.js & Tailwind CSS
