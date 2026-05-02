portfolio/
│
├── index.html                  (Single-page portfolio)
├── 404.html                    (Custom error page)
├── robots.txt                  (Crawler instructions)
├── sitemap.xml                 (SEO: helps search engines index you)
├── .gitignore                  (Excludes OS files, editor configs)
│
├── css/                        (One concern per file — link all in <head>)
│   ├── reset.css               (Normalize/browser reset)
│   ├── variables.css           (Colors, fonts, spacing tokens)
│   ├── base.css                (Body, typography, links)
│   ├── layout.css              (Header, footer, section spacing, grid)
│   ├── components.css          (Buttons, cards, tags, nav, forms)
│   ├── animations.css          (Keyframes, transitions, typing effect styles)
│   └── responsive.css          (All media queries in one place)
│
├── js/                         (Modular — load as ES modules or regular scripts)
│   ├── main.js                 (Entry point: initializes everything)
│   ├── data/
│   │   └── projects-data.js    (Array of project objects — edit here, not HTML)
│   └── modules/
│       ├── theme-toggle.js     (Dark/light mode + localStorage)
│       ├── typing-effect.js    (Hero typing animation)
│       ├── project-renderer.js (Injects projects from data into DOM)
│       ├── scroll-effects.js   (Navbar hide/show, fade-ins, Intersection Observer)
│       └── contact-form.js     (Form validation + submission handler)
│
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   │   └── avatar.jpg      (Renamed from pic1.jpg)
│   │   ├── projects/
│   │   │   ├── freelance_guard.webp
│   │   │   ├── crypto_alert.webp
│   │   │   └── chronos_db.webp
│   │   └── icons/              (Tech stack SVGs: react, node, python, etc.)
│   │
│   ├── fonts/                  (Self-hosted or leave empty if using Google Fonts)
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-32x32.png
│       └── apple-touch-icon.png
│
├── resume.pdf                  (Downloadable CV)
└── README.md
How to load the CSS (in index.html <head>):
<link rel="stylesheet" href="css/reset.css">
<link rel="stylesheet" href="css/variables.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/layout.css">
<link rel="stylesheet" href="css/components.css">
<link rel="stylesheet" href="css/animations.css">
<link rel="stylesheet" href="css/responsive.css">
How to load the JS (before closing </body>)
<!-- If using regular scripts (load order matters): -->
<script src="js/data/projects-data.js"></script>
<script src="js/modules/theme-toggle.js"></script>
<script src="js/modules/typing-effect.js"></script>
<script src="js/modules/project-renderer.js"></script>
<script src="js/modules/scroll-effects.js"></script>
<script src="js/main.js"></script>

<!-- OR as ES modules (cleaner, modern): -->
<script type="module" src="js/main.js"></script>
key chnages
| Before                             | After                              | Why                                                         |
| ---------------------------------- | ---------------------------------- | ----------------------------------------------------------- |
| `style.css` (everything)           | 7 focused CSS files                | Easier to debug and update                                  |
| `main.js` (everything)             | `main.js` + modules                | Reusable, testable logic                                    |
| Project data in `index.html`       | `projects-data.js`                 | Add/edit projects without touching HTML                     |
| `pic1.jpg`                         | `assets/images/profile/avatar.jpg` | Descriptive, organized                                      |
| `.png` mockups                     | `.webp`                            | 60-80% smaller file size; keep `.png` as fallback if needed |
| Missing `404`, `robots`, `sitemap` | All included                       | SEO and professional polish                                 |


Optional: Add a package.json later (no build step needed)
If you want to use live-server for development or deploy to Netlify easily:

{
  "name": "portfolio",
  "version": "1.0.0",
  "scripts": {
    "dev": "npx live-server --port=5500",
    "format": "npx prettier --write \"**/*.{html,css,js}\""
  },
  "devDependencies": {
    "live-server": "^1.2.2",
    "prettier": "^3.0.0"
  }
}
