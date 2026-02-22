# Roger Obeng Koranteng - Portfolio

A modern, responsive portfolio website built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, minimal, and professional UI
- **Fully Responsive**: Optimized for all screen sizes
- **Data-Driven**: All content is managed through TypeScript data files
- **Fast Performance**: Built with Next.js App Router and optimized for speed
- **SEO Ready**: Proper metadata, OpenGraph, and semantic HTML
- **Animations**: Subtle Framer Motion animations for enhanced UX

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui-style components
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── blog/              # Publications & blog page
│   ├── contact/           # Contact page with form
│   ├── experience/        # Work experience timeline
│   ├── projects/          # Projects with filters
│   ├── layout.tsx         # Root layout with navbar/footer
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── layout/           # Navbar, Footer
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   └── *.tsx             # Feature components
├── data/                  # Content data files (edit these!)
│   ├── profile.ts        # Personal info & highlights
│   ├── experience.ts     # Work history
│   ├── projects.ts       # Project portfolio
│   ├── skills.ts         # Skills by category
│   ├── education.ts      # Education history
│   ├── certifications.ts # Professional certifications
│   ├── publications.ts   # Books & blog info
│   └── awards.ts         # Awards & recognition
└── lib/
    └── utils.ts          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Updating Content

All content is stored in `/src/data/` directory. Edit these TypeScript files to update your portfolio:

- **profile.ts**: Name, title, contact info, summary, highlights
- **experience.ts**: Work history with roles and achievements
- **projects.ts**: Project portfolio with descriptions and tech stacks
- **skills.ts**: Skills organized by category
- **education.ts**: Educational background
- **certifications.ts**: Professional certifications
- **publications.ts**: Books, blogs, articles
- **awards.ts**: Awards and recognition

### Updating CV

Replace the PDF file at `/public/Software_Engineer.pdf` with your updated CV. The "Download CV" button links to this file.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository to [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Other Platforms

Build the static export:
```bash
npm run build
```

The built files will be in the `.next` directory.

## Pages

- **/** - Home page with hero, stats, featured projects, and experience
- **/about** - Detailed about section, skills, education, certifications, awards
- **/experience** - Work history in timeline format
- **/projects** - Project portfolio with category filters
- **/blog** - Publications and technical writing
- **/contact** - Contact form and social links

## License

This project is for personal use. Feel free to use it as a template for your own portfolio.

---

Built with Next.js by Roger Obeng Koranteng
####