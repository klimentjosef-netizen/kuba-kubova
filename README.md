# Kuba & Kubova Architekti

Website for **Kuba & Kubova Architekti** — an architecture studio in Ostrava, Czech Republic, run by Michal Kuba and Katerina Kubova.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Pure CSS** with CSS variables (no Tailwind, no UI libraries)
- **Google Fonts**: Cormorant Garamond + Barlow

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    layout.tsx         # Root layout (Nav, Footer, Cursor)
    page.tsx           # Homepage
    globals.css        # All global styles + responsive
    projekty/page.tsx  # Portfolio page with filters
    o-nas/page.tsx     # About page
    kontakt/page.tsx   # Contact page with form
  components/
    Nav.tsx            # Sticky navigation + mobile overlay
    Footer.tsx         # Dark footer with links
    Cursor.tsx         # Custom bronze cursor (desktop only)
    Marquee.tsx        # Scrolling services bar
    ContactBar.tsx     # Reusable CTA bar
    ProjectCard.tsx    # Project card with placeholder SVG
  data/
    content.ts         # All content data (projects, founders, etc.)
  hooks/
    useScrollReveal.ts # IntersectionObserver-based scroll reveal
```

## Adding Photos

1. Create `/public/img/projekty/` directory
2. Add project photos (recommended: 1200x800px, WebP or JPG)
3. Update `src/data/content.ts` — change `photo: null` to the path:
   ```ts
   photo: '/img/projekty/vila-cerenec.jpg'
   ```
4. The `ProjectCard` component uses `next/image` with `fill` and `sizes` for optimization

## Connecting the Contact Form

The form is ready for [Formspree](https://formspree.io):

1. Create a free account at formspree.io
2. Create a new form and copy the form ID
3. In `src/app/kontakt/page.tsx`, update the `handleSubmit` function:
   ```ts
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
       method: 'POST',
       body: new FormData(e.currentTarget),
       headers: { Accept: 'application/json' },
     });
     if (res.ok) setSubmitted(true);
   };
   ```

## Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com for auto-deploys
```

No environment variables needed. The site is fully static.

## Brand Colors

| Name      | Hex       | Usage                    |
|-----------|-----------|--------------------------|
| `--ink`   | `#0f0f0d` | Primary dark / text      |
| `--stone` | `#f0ede6` | Primary light background |
| `--bronze`| `#8b6f47` | Accent color             |
| `--warm`  | `#c8b89a` | Secondary accent         |
| `--slate` | `#6b6456` | Muted text               |
| `--plaster`| `#e8e3da`| Form backgrounds         |
| `--cream` | `#f8f5ee` | Alternate light bg       |

## Brand Rule

- **Katerina Kubova** sections always use dark (`#0f0f0d`) background with light text
- **Michal Kuba** sections always use light (`#f0ede6`) background with dark text
