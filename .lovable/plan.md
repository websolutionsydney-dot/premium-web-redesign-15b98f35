# Proposal Page Design

Create a new route `/proposal` that presents a tailored business proposal as a polished, "email-style" responsive web page.

## User Requirements
- **Concept:** A clean, mobile-first web page designed to look like a high-end email message.
- **Header:** Clean top navigation with brand identity; Open Graph tags for "Proposal & Overview - Web Solution Sydney".
- **Container:** White card layout on a light-gray background to mimic an inbox.
- **Metadata:** From (Ryan), To (Ahmad), Subject (Website Design & AI Features).
- **Body Content:** A detailed formatted message including:
    - About Us section.
    - Clickable buttons for work and official site.
    - Project Scope & Pricing ($900 one-time, $300 annual).
    - Included Services list.
    - AI-Driven Features detailed descriptions.
- **Footer Signature:**
    - IT Consultant signature with Logo #1.
    - Contact details (ABN, Phone, Emails, Website, Address) with tap-to-action links.
    - Logo #2 above the confidentiality disclaimer.
    - Confidentiality disclaimer in small gray text.

## Technical Details
- **Route:** Create `src/routes/proposal.tsx`.
- **Layout:** Since it's an "email style" page with its own specific background and narrow container, I'll bypass the default `SiteLayout` inside the route component to give it the requested "inbox" feel, but still use the global CSS tokens.
- **Components:**
    - Use `lucide-react` for icons.
    - Use `src/lib/portfolio.ts` constants for brand details.
- **SEO:** Implement `head()` in the route for the specific OG meta tags requested.
- **Styling:** Tailwind CSS for the card layout, soft shadows, and responsive typography.

## Implementation Steps
1. Create `src/routes/proposal.tsx`.
2. Define `head()` with meta tags for OG title/description.
3. Build the "Email Container" using a centered `max-w-3xl` card.
4. Add the interactive elements (buttons, tap-to-call/email links).
5. Integrate the logos and signature details.
6. Verify layout on mobile and desktop.
