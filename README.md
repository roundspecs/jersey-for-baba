# ⚽ JerseyForBaba - World Cup 2026 Kit Customizer

JerseyForBaba is a complete, production-ready web application built with **Next.js (App Router)** and **Tailwind CSS**. It allows users to generate and download a professional-grade, high-resolution PNG image of a football jersey backing based on design patterns inspired by the FIFA World Cup 2026.

Designed specifically with a dark-mode sports-themed dashboard, the app operates 100% client-side. This ensures high-performance rendering at zero server cost.

---

## ✨ Features

- **🏆 15+ World Cup 2026 Presets**: Searchable selection of nations (e.g., Argentina, Brazil, Germany, France, USA, Japan, Croatia) complete with accurate color tokens, flags, and thematic badges.
- **🎨 Dynamic Programmatic Vector Art**: Sleek SVG silhouette design complete with sleeve cuffs, collar trims, dynamic name curves, double borders, shadow depth creases, and an overlay mesh fabric texture for a high-fidelity 3D mockup appearance.
- **⚡ Real-time Live Rendering**: Any change to name (alphanumeric, auto-capitalized, capped at 12 characters) or number (0-99 with step controls) immediately updates the visual canvas.
- **📥 High-Resolution (1200x1200px) Export**: Converts the active vector SVG on a secure offscreen HTML5 canvas to export a pixel-perfect, crisp PNG with a stylized stadium sports background.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Canvas Rendering**: 100% Client-Side HTML5 Canvas & SVG Serialization (Serverless & Free Tier Friendly)

---

## 🚀 Local Setup Instructions

Follow these instructions to run the project locally on your machine:

### 1. Clone the repository and navigate to the project directory:
```bash
cd jersey-for-baba
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm run dev
```

### 4. Open the application:
Visit [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ☁️ Deployment Guide (Vercel Free Tier)

You can deploy this project completely for free on Vercel using two methods:

### Option A: Using the GitHub Integration (Recommended)
This approach triggers automatic deploys every time you push code.
1. Create a repository on [GitHub](https://github.com).
2. Initialize Git in your project folder, commit your files, and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of jersey builder"
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. Sign up or log into [Vercel](https://vercel.com).
4. Click **"Add New"** > **"Project"**.
5. Select your GitHub repository from the list and import it.
6. Keep the default build settings (Next.js preset is auto-detected).
7. Click **"Deploy"**. Your site will be live on a free subdomain (e.g., `jersey-for-baba.vercel.app`) in under a minute!

### Option B: Using the Vercel CLI (Command Line)
This allows deploying directly from your terminal in seconds.
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log into Vercel via CLI:
   ```bash
   vercel login
   ```
3. Run the deployment command from the project root:
   ```bash
   vercel
   ```
4. Follow the command line prompts:
   - *Set up and deploy?* Yes (`y`)
   - *Which scope?* (Select your personal workspace)
   - *Link to existing project?* No (`n`)
   - *Project Name?* `jersey-for-baba`
   - *Directory?* `./`
   - *Modify settings?* No (`n`)
5. The CLI will upload your files and output a **Development/Preview URL**.
6. When you are ready to publish, run the production build flag:
   ```bash
   vercel --prod
   ```

---

## 🎨 Design Systems Details

To guarantee realistic 3D sports aesthetics, the following vector configurations were programmatically structured:
- **Mesh Texture**: Drawn via SVG radial overlapping pattern matching athletic dry-fit fabric.
- **Shading**: A linear gradient multiply layer overlays the base colors, adding realistic armpit-to-torso shadow contours.
- **Numbers**: Structured via triple-layer text (Outer Border + Middle Stroke + Base Fill) for an authentic screen-printed appearance.
