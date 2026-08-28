# William Lo Channiko — Portfolio

Static Astro portfolio for an Applied AI and Full-Stack Engineer. The site uses
typed content collections, optimized local product media, native CSS, and no
client-side framework runtime.

## Information architecture

- `/` — recruiter-focused homepage with Projects, Experience, About, and Contact
- `/projects/ai-document-operations/` — Invoice Review case study
- `/projects/ai-support-escalation/` — Case Resolution Copilot case study

The two case studies remain children of the Projects section and are not global
navigation items.

## Content boundary

Project facts come from the corresponding repository documentation, source,
recorded release gates, and approved synthetic product screenshots. The site
does not claim customer usage, production accuracy, business-impact
percentages, or integrations that are still simulated.

## Commands

```bash
npm install
npm run dev
npm run verify
npm run performance
```

`npm run verify` checks formatting, Astro types, lint, source constraints, the
static build, and Playwright on desktop and mobile. The production check also
enforces a 15 KiB gzip budget for homepage JavaScript and prevents the homepage
motion bundle from loading on project case studies.

`npm run performance` builds the site and runs three mobile Lighthouse audits
per representative route. It fails when the median exceeds LCP 2.5 s, CLS 0.1,
or TBT 300 ms.

The production build also stages the small static-asset worker and hosting
metadata required by the configured Sites deployment.

## Add another project

Create one Markdown file in `src/content/projects/`. The typed frontmatter owns
the slug, status, evidence boundary, metrics, hero image, and gallery; the home
card and case-study route are generated from the collection automatically. No
global navigation edit is required.

## Production URL

Copy `.env.example` to the production environment and replace the placeholder
with the final origin:

```text
SITE_URL=https://your-domain.example
```

Astro then emits canonical URLs, absolute social-card URLs, the sitemap, and the
sitemap reference in `robots.txt`.
