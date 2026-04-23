# CLAUDE.md - Sutera Sites (agency website)

## 0) What this project is

The public-facing website for **Sutera Sites** - a Melbourne-based web design and digital marketing agency targeting local service businesses (tradespeople, local clubs, small businesses). This is the agency's own site, treated as a client project.

**Primary goal:** Generate inbound leads and booked calls.
**Secondary goal:** Rank organically for local Melbourne web design + Google Ads keywords.

**Migration context:** Replaces the existing Framer-hosted suterasites.com before 2026-04-29 (Framer $28/mo renewal date). Target completion Tue 2026-04-28 for buffer day.

---

## 1) Current services (as of 2026-04-23)

Four active service lines. The site must represent these accurately.

### 1. Websites
- **Subscription:** $100/month custom websites with 6-month lock-in. Covers hosting, maintenance, updates. Current subscribers: Select Civil, NPD Building Solutions, Apollo Earthworks, Radiant Rides AutoCare, Dig and Move, Charm Excavation ($100/mo). Grout Academy ($55/mo), Roofing123 ($50/mo), TJM Detailing ($30/mo) - legacy tiers.
- **One-off builds:** ~$1,100 + $25/hr for ongoing work. Priced below subscription breakeven intentionally (cash upfront beats deferred MRR with churn risk).

### 2. Google Ads
- **Setup + ongoing management** bundled. Current ads clients: Select Civil Group ($300/mo), Apollo Earthworks (trial through 2026-04-30, converting to $300/mo).
- **2-week free trial** offered to de-risk the conversation. Track record: Apollo delivered 2 leads in 8 days at $45 CPL, first job booked at $3,600.

### 3. Design & Print Collateral
- Capability statements (reference: Apollo at $550 for 6-page custom design)
- Business cards, corflute signs, flyers
- Quote templates + invoice templates (editable Word/PDF)
- Logo design (Grout Academy example)
- Individually quoted - no fixed pricing on the site.

### 4. Social Media Management
- Instagram + Facebook, integrated.
- Current client: Altona North Soccer Club (ANSC). Service is still being scoped and priced - verbally committed with Apollo Earthworks for future retainer.
- On-site messaging: position it as a service we offer, but don't over-promise before it's productised.

---

## 2) Site Map (8 pages + compliance)

### Core Pages
| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, services overview, case studies, trust, CTA |
| Services Overview | `/services` | Hub linking to all 4 service pages |
| Contact | `/contact` | Lead form + phone + email |
| About | Optional (can be a section on Home) | Story, Melbourne-local angle |

### Service Pages (4)
| Page | URL | Notes |
|---|---|---|
| Websites | `/services/websites` | Subscription + one-off. Primary ads landing page. |
| Google Ads | `/services/google-ads` | Setup + management combined. Ads landing page. |
| Design & Print | `/services/design` | All collateral work |
| Social Media | `/services/social-media` | IG + FB management |

### Work / Case Studies
| Page | URL |
|---|---|
| Work index | `/work` |
| Apollo Earthworks | `/work/apollo-earthworks` |
| Select Civil Group | `/work/select-civil` |
| Grout Academy | `/work/grout-academy` |
| ANSC (Social Media) | `/work/altona-north-soccer-club` |

### Support & Compliance
| Page | URL | Notes |
|---|---|---|
| Thank You | `/thank-you` | Post-form confirmation + conversion tracking |
| Privacy Policy | `/privacy` | Required for Google Ads compliance |
| Terms | `/terms` | Service agreement |
| 404 | `/404` | Custom error page with CTA |

---

## 3) Pricing rule (critical, applies everywhere)

**Never mention a set price anywhere on the site.** No dollar amounts, no "from $X", no "starting at $X/month". All pricing is quoted individually.

Use: "Get a custom quote", "Book a free call for pricing", "Every project is quoted to your needs".

Applies to: visible copy, meta descriptions, structured data, FAQ answers, alt text.

---

## 4) Brand & Tone

- **Tone:** Direct, confident, no fluff. Trusted local expert, not corporate agency.
- **Voice:** First person. "We build websites…" not "Sutera Sites builds websites…"
- **Audience:** Time-poor business owners sceptical of agencies. Lead with outcomes, not features.
- **Avoid:** Jargon, vague claims ("cutting-edge solutions"), committee-speak.
- **Never use em dashes.** Hyphens, commas, or periods instead.

---

## 5) Design direction

### Visual
- **Dark theme** with blue accent (continuation of existing brand).
- Generous whitespace, full-width hero, modular section layout.
- Typography-led: bold sans-serif headlines, clean body copy.
- Subtle motion: scroll-triggered reveals, stats counters, hero parallax, smooth anchor scrolling.

### Colour palette
- Primary background: near-black
- Primary accent: blue (to be finalised on first build)
- Supporting: off-white text, muted grey secondaries

### Motion principles
- Animations must serve clarity, not decoration.
- Reveal-on-scroll for content sections (fade + rise).
- Stats counters animate once in viewport.
- No autoplay video, no cursor trails, no parallax abuse.

---

## 6) SEO Rules (apply to every page)

### On-page
- Unique `<title>`: `[Page Topic] | Sutera Sites - Web Design Melbourne`
- Unique `<meta name="description">` (150-160 chars)
- One `<h1>` per page with primary keyword
- Descriptive alt text on every image
- Every page internal-links to at least one other page
- Descriptive anchor text (never "click here")

### URLs
- Lowercase, hyphen-separated, short, keyword-rich.

### Local SEO
- Target: "web design Melbourne", "Google Ads Melbourne", "websites for tradies Melbourne"
- NAP (Name, Address, Phone) consistent with Google Business Profile
- `LocalBusiness` schema on homepage + contact
- `Service` schema on each service page

### Technical
- Mobile-first, <3s load on mobile
- XML sitemap at `/sitemap.xml`
- `robots.txt` allowing all except `/thank-you`
- Canonical tags everywhere
- HTTPS only, no mixed content
- WebP images where possible

---

## 7) Conversion Rules

### Core principle
**Every page has one primary CTA.** One action is primary ("Book a Free Call"), one is secondary ("See Our Work").

### CTA copy
- Outcome-focused: "Get a Free Website Quote" not "Submit"
- Low-friction: "Book a Free 15-Min Call" beats "Contact Us"
- Primary CTA appears: above the fold, mid-page, bottom of every page
- Sticky nav always contains a CTA button

### Trust signals (required on primary pages)
- Real client business names: Select Civil, Apollo Earthworks, Grout Academy, Radiant Rides, NPD Building, Roofing123, TJM Detailing, ANSC
- Testimonials with real name + business (Ric from ANSC, Kosta from Apollo where permitted)
- Results-based social proof with real numbers:
  - "2 qualified leads in 30 days" (Select Civil)
  - "2 leads in 8 days, $45 CPL, $3,600 first job booked" (Apollo)
  - "3 launches in 15 days" (Feb 2026)
- "Melbourne-based" and "local" messaging throughout.

### Forms
- 3-5 fields max: Name, Business, Phone, Service Interested In, Message (optional)
- Submit copy: "Send My Enquiry" or "Book My Free Call", not "Submit"
- Post-submit redirect to `/thank-you` for conversion tracking (no inline success)
- Backend: Formspree (matches client sites)

### Service page structure
1. Hero (H1 + one-line value prop + primary CTA)
2. Problem (2-3 sentences agitating pain point)
3. Solution (what we offer, how it works)
4. What's Included (bullet list)
5. Who It's For (named industries)
6. Social Proof (1-2 testimonials or case study callouts)
7. Pricing signal ("Get a custom quote")
8. FAQ (3-5 questions, also long-tail SEO)
9. CTA section (primary CTA repeated with risk-reversal like "No lock-in on one-offs")

### Case study structure
- Client name, industry, location
- The challenge before us
- What we delivered (services, timeline)
- Measurable results (real numbers - no inflation)
- Client quote (if available)
- CTA: "Want results like this? Book a free call."

### Homepage
- Hero answers (in <5s of reading): Who are we? Who do we help? What should they do next?
- Top 4 services with links to service pages
- Differentiation section ("Why Sutera Sites")
- 4+ client logos or case study previews
- Strong CTA section before footer

---

## 8) Google Ads-specific pages

`/services/websites` and `/services/google-ads` will double as Google Ads landing pages.

Additional rules:
- Minimal nav (or removed entirely on paid variants) to eliminate exit paths
- Phone prominent at top, click-to-call on mobile
- Hero CTA = form or direct booking, no scrolling required
- Load time target: <2s
- Only outbound link: `/thank-you` post-conversion
- Headline matches ad group keywords exactly (message match)

---

## 9) Tech stack

- **Platform:** Static HTML/CSS/JS
- **CSS framework:** Tailwind via CDN (no build step)
- **Animations:** GSAP via CDN + ScrollTrigger plugin
- **Forms:** Formspree
- **Hosting:** Cloudflare Pages (free tier)
- **Domain:** suterasites.com (GoDaddy, repointing from Framer)
- **Analytics:** Google Analytics 4 + Google Tag Manager
- **Conversion tracking:** Google Ads conversion tag on `/thank-you`

---

## 10) File structure convention

```
Sutera Sites/
├── CLAUDE.md (this file)
├── index.html
├── services.html
├── contact.html
├── work.html
├── thank-you.html
├── privacy.html
├── terms.html
├── 404.html
├── services/
│   ├── websites.html
│   ├── google-ads.html
│   ├── design.html
│   └── social-media.html
├── work/
│   ├── apollo-earthworks.html
│   ├── select-civil.html
│   ├── grout-academy.html
│   └── altona-north-soccer-club.html
├── css/
│   └── styles.css (minimal custom overrides)
├── js/
│   └── main.js (GSAP animations, nav, form)
├── images/
├── robots.txt
├── sitemap.xml
└── README.md
```

### Link conventions
- Root-level pages link directly: `services.html`, `contact.html`
- Pages inside `services/` and `work/` prefix links with `../`
- All asset paths use forward slashes, relative

---

## 11) Business billing (for footer/contact)

- **Business:** Sutera Sites
- **ABN:** 74 177 391 469
- **Email:** suterasites@gmail.com
- **Phone:** 0434 542 005
- **Location:** Melbourne, Victoria

---

## 12) Deployment workflow

1. Build locally, iterate on index.html first.
2. Push to GitHub (new repo under `suterasites` org).
3. Connect to Cloudflare Pages (auto-deploy on push).
4. Test on `.pages.dev` subdomain.
5. Repoint suterasites.com DNS from Framer to Cloudflare.
6. Verify live, test all forms.
7. **Cancel Framer subscription before 2026-04-29.**

---

## 13) Build Progress

| Page | Status |
|---|---|
| Home | **Done (first draft)** |
| Services Overview | Not started |
| Contact | Not started |
| Work index | Not started |
| Websites (service) | Not started |
| Google Ads (service) | Not started |
| Design & Print (service) | Not started |
| Social Media (service) | Not started |
| Apollo case study | Not started |
| Select Civil case study | Not started |
| Grout Academy case study | Not started |
| ANSC case study | Not started |
| Thank You | Not started |
| Privacy | Not started |
| Terms | Not started |
| 404 | Not started |
