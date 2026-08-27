# TAHTI

## Complete production rebrand, redesign and rebuild of the existing Lukkarikone application

Rebuild the existing timetable application into a new product called:

# **TAHTI**

**Finnish tagline:** Opiskelupäivä yhdellä silmäyksellä.
**English tagline:** Your study day at a glance.

The word **TAHTI** refers to rhythm, pace and structure. A timetable determines the rhythm of a student's day, week and semester.

This must become a real production-quality application, not a concept, prototype, portfolio mockup or visually impressive shell with unfinished functionality.

The finished application must:

- use the existing project as the functional source of truth
- preserve existing timetable functionality
- use the **same existing database**
- preserve existing data
- be hosted using **GitHub Pages**
- deploy automatically through **GitHub Actions**
- use technologies already present in or compatible with the existing stack
- work properly on phones, tablets, laptops and large screens
- work with keyboard navigation
- work with screen readers
- meet modern EU accessibility expectations
- support Finnish and English
- support Light, Dark and System appearance
- automatically follow the device appearance on first visit
- look completely redesigned and intentional
- contain no generic AI-generated website design

---

# 1. FIRST: INSPECT THE EXISTING PROJECT

Do not immediately start replacing components.

Before making significant changes, inspect the complete repository.

Understand:

- folder structure
- frontend architecture
- backend architecture if present
- React structure
- TypeScript models
- styles
- current design tokens
- timetable rendering
- calendar calculations
- date handling
- iCal parsing
- calendar sources
- API requests
- database connection
- database schema
- authentication
- settings storage
- custom events
- hidden events
- modified events
- course colors
- event colors
- calendar management
- onboarding
- localization
- responsive behavior
- existing accessibility implementation
- existing tests
- build system
- environment variables
- deployment configuration

Make a mental feature inventory before rebuilding anything.

The existing repository is the source of truth for what the application needs to do.

Do not accidentally remove working functionality simply because it is not immediately obvious.

---

# 2. KEEP THE SAME DATABASE

# THIS IS NON-NEGOTIABLE

The redesigned TAHTI application must connect to and continue using the **exact same existing database/backend data source used by the current project**.

Do not create a replacement database.

Do not create a new Supabase/Firebase/database project unless the existing application already requires one and it is the same project.

Do not:

- delete the existing database
- create duplicate production databases
- reset production data
- overwrite existing user data
- regenerate existing IDs
- break relationships
- break existing calendars
- break existing custom events
- break saved settings
- break existing authentication
- rename tables for cosmetic reasons
- change primary keys unnecessarily
- remove columns just because the redesigned UI currently does not display them

First identify exactly what the existing application uses.

Reuse:

- existing database provider
- existing project
- existing connection configuration
- existing schema
- existing tables
- existing IDs
- existing authentication
- existing relationships
- existing API
- existing RLS/security configuration
- existing database functions
- existing triggers
- existing data formats

The redesign concerns the application and interface.

It must **not destroy or replace the existing data layer**.

---

# 3. SAFE DATABASE CHANGES

If additional database fields are genuinely necessary, use incremental migrations.

Before altering existing persistent data, determine:

```text
Current table
Purpose
Existing fields
Existing consumers
Required change
Migration required
Backward compatibility
Risk

```

Prefer extending the existing schema rather than replacing it.

If a data structure needs to change:

1. add the new structure
2. migrate existing data safely
3. make the application compatible with it
4. verify old data
5. preserve fallback compatibility where practical
6. only remove obsolete structures if clearly safe

Never wipe production data during deployment.

Never put database secrets directly into committed files.

---

# 4. GITHUB HOSTING IS REQUIRED

The finished frontend must be deployable and hosted using:

# **GitHub Pages**

This is a requirement.

Do not switch the primary frontend hosting to:

- Vercel
- Netlify
- Cloudflare Pages
- Firebase Hosting
- a VPS
- another hosting provider

The repository itself must remain a normal GitHub repository.

Production deployment should happen from GitHub automatically.

---

# 5. GITHUB PAGES ARCHITECTURE

Design the frontend so it works correctly as a static GitHub Pages deployment.

Use:

- React
- TypeScript
- Vite

Configure the correct Vite `base` value depending on whether the application is deployed to:

```text
https://USERNAME.github.io/REPOSITORY/

```

or a custom domain.

Do not hardcode root-relative paths that break inside a repository path.

Assets must work correctly when the application is hosted below a subdirectory.

Test:

- JavaScript chunks
- CSS
- icons
- logos
- manifest
- fonts
- images
- routing
- refresh behavior

---

# 6. ROUTING ON GITHUB PAGES

GitHub Pages does not provide a traditional SPA server fallback.

Account for this.

Prefer an architecture that does not break when a user refreshes a page.

Use either:

- HashRouter

or

- a properly implemented GitHub Pages SPA fallback strategy

Choose the simplest reliable implementation.

Do not deploy a React Router configuration where:

```text
/settings

```

works through client navigation but gives a GitHub 404 when refreshed.

Test direct navigation and refreshing.

---

# 7. GITHUB ACTIONS DEPLOYMENT

Create a proper GitHub Actions production workflow.

Example flow:

```text
push to main
        ↓
install dependencies
        ↓
lint
        ↓
typecheck
        ↓
tests
        ↓
production build
        ↓
upload Pages artifact
        ↓
deploy GitHub Pages

```

Use current official GitHub Pages actions.

The deployment must fail when important checks fail.

Do not silently deploy broken builds.

---

# 8. REQUIRED NPM COMMANDS

The project should expose clear scripts such as:

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run typecheck
npm run test

```

If end-to-end tests exist:

```bash
npm run test:e2e

```

Running:

```bash
npm run build

```

must produce the exact production output required by GitHub Pages.

---

# 9. ENVIRONMENT VARIABLES

Provide:

```text
.env.example

```

Never commit:

```text
.env

```

containing private credentials.

Remember that frontend variables bundled by Vite are visible to users.

Do not pretend a frontend environment variable is secret merely because it came from GitHub Secrets.

Anything shipped to the browser is public.

Only expose credentials designed for browser use.

Never expose:

- service-role keys
- database admin passwords
- private API secrets
- unrestricted backend credentials

If the existing database requires private server-side access, preserve/use the existing secure backend/API layer rather than moving the private credential into React.

---

# 10. BRAND

Rename the user-facing product:

# TAHTI

Do not unnecessarily rename internal database identifiers.

For example, an existing database table named after the old application does not need a risky migration merely because the brand changed.

User-facing branding changes.

Stable technical identifiers can remain when changing them would introduce unnecessary risk.

---

# 11. BRAND PERSONALITY

TAHTI should feel:

- Finnish
- Nordic
- precise
- calm
- technical
- youthful without being childish
- compact
- practical
- fast
- trustworthy
- made specifically for university timetables

It should have slightly more personality than a government application without becoming a playful startup toy.

Imagine a combination of:

- Finnish transit information
- a university timetable
- an event-production control interface
- a physical planner
- modern Nordic software

---

# 12. NEW LOGO SYSTEM

Create a new logo specifically for TAHTI.

The logo must work at:

```text
16×16
24×24
32×32
48×48
64×64
128×128
192×192
512×512

```

Create:

```text
logo-symbol.svg
logo-wordmark.svg
logo-full.svg
logo-symbol-dark.svg if necessary
logo-symbol-light.svg if necessary
favicon.svg

```

Prefer SVG.

Do not use bitmap artwork for the main logo.

---

# 13. LOGO CONCEPT: TIMETABLE RHYTHM

The logo should come directly from timetable geometry.

Imagine four vertical timetable lanes.

Different rectangular blocks occupy different positions.

Conceptually:

```text
│       │ █████ │       │
│ █████ │       │       │
│       │       │ █████ │
│       │ █████ │       │

```

Reduce this into an extremely simple geometric symbol.

The blocks represent:

- lessons
- movement through time
- rhythm
- repetition
- structure
- the week

The overall negative space may subtly suggest a **T**, but do not create a literal giant letter T.

The icon should still make sense without knowing this explanation.

---

# 14. ALTERNATIVE LOGO VARIATION

Create a second acceptable direction based on a schedule cursor/current-time indicator.

For example:

```text
│      │
██ ─── ●
│      │
│   ██ │

```

It may combine:

- schedule column
- event block
- current-time line
- small marker

Again, simplify aggressively.

The result must remain recognizable as a tiny favicon.

---

# 15. LOGO RULES

Do not use:

- graduation cap
- book
- pencil
- school building
- generic calendar outline
- alarm clock
- stopwatch
- checkmark
- speech bubble
- generic lightning bolt
- sparkles
- stars
- AI-style swoosh
- generic T inside a circle
- gradient orb
- glass effects
- 3D
- shadows in the master logo

The brand must derive from **schedule structure**, not generic education imagery.

---

# 16. WORDMARK

Use:

```text
TAHTI

```

in uppercase for the main wordmark.

It should feel visually solid and compact.

Do not use an overly futuristic sci-fi font.

Do not use a handwritten font.

Typography should remain readable.

The symbol and wordmark should work:

```text
[ SYMBOL ] TAHTI

```

and independently.

---

# 17. COLOR IDENTITY

Retain a hint of the existing project's coral personality but redesign the system properly.

Primary accent direction:

```text
warm coral / vermilion

```

Do not turn the entire interface orange.

Use the accent strategically for:

- active navigation
- today
- selected controls
- focus-related brand moments
- key actions

Calendar events themselves can continue having different colors.

---

# 18. DARK MODE DIRECTION

Avoid pure black.

Example direction:

```text
Background:
deep navy-charcoal

Primary surface:
slightly lighter navy

Secondary surface:
another subtle level

Text:
warm near-white

Muted:
cool-grey

Accent:
warm coral

```

The result should feel comfortable during long use.

Avoid excessive contrast between every surface.

---

# 19. LIGHT MODE DIRECTION

Avoid sterile:

```css
background: #ffffff;

```

everywhere.

Prefer:

- slightly warm off-white background
- clean light surfaces
- charcoal text
- subtle borders
- restrained shadows
- same coral brand accent

Dark and light mode must look like the same product.

Do not simply invert every color.

---

# 20. NO AI SLOP

This requirement applies to the entire redesign.

Do not create a generic AI-generated interface.

Avoid:

- huge gradient blobs
- purple SaaS backgrounds
- blue-purple gradients
- unnecessary glassmorphism
- constant backdrop blur
- excessive rounded cards
- cards inside cards
- enormous 24–32px border radii
- pill buttons everywhere
- random badges
- fake statistics
- fake testimonials
- fake university information
- fake users
- marketing fluff
- random decorative graphs
- meaningless illustrations
- oversized empty hero sections
- pointless animation
- floating orbs
- glowing borders
- gradient text
- random sparkle icons
- endless shadcn cards

Do not make it look like:

- ChatGPT generated it
- a SaaS starter template
- Linear
- Vercel
- Notion
- generic Tailwind dashboard
- generic shadcn example
- cryptocurrency dashboard

TAHTI should look like **TAHTI**.

---

# 21. DO NOT MAKE EVERYTHING A CARD

Use layout and typography before containers.

A timetable itself creates natural divisions.

Use:

- spacing
- thin dividers
- alignment
- background levels
- typography
- grid structure

Only use cards where containment is actually meaningful.

---

# 22. BORDER RADIUS

Keep corner rounding restrained.

Suggested scale:

```css
--radius-xs: 3px;
--radius-sm: 5px;
--radius-md: 8px;
--radius-lg: 12px;

```

Event blocks may use approximately:

```text
5–8px

```

Dialogs may use:

```text
10–14px

```

Do not make every rectangular component resemble a floating pill.

---

# 23. DESIGN TOKENS

Build a proper semantic token system.

Example:

```css
:root {
  --bg: ...;
  --surface-1: ...;
  --surface-2: ...;
  --surface-3: ...;

  --text-primary: ...;
  --text-secondary: ...;
  --text-muted: ...;

  --border-subtle: ...;
  --border-strong: ...;

  --accent: ...;
  --accent-hover: ...;

  --focus: ...;

  --success: ...;
  --warning: ...;
  --danger: ...;
}

```

Do not scatter arbitrary colors throughout JSX.

Use semantic variables.

---

# 24. TYPOGRAPHY

Typography should be:

- clean
- compact
- readable
- neutral
- slightly technical

Use one high-quality sans-serif family if possible.

Avoid unnecessary font downloads.

Prefer a suitable system stack when that improves loading speed and privacy.

Example:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;

```

But do not automatically use Inter simply because every modern template does.

Evaluate whether a strong system stack gives TAHTI a more distinct appearance.

Use typography deliberately.

---

# 25. MAIN PRODUCT STRUCTURE

The timetable is the application.

Do not surround it with a fake analytics dashboard.

Primary desktop structure:

```text
┌──────────────────────────────────────────────────────────────┐
│ TAHTI     ‹   Today   ›       Day Week Month Agenda     ⚙    │
├──────┬─────────┬─────────┬─────────┬─────────┬───────────────┤
│ TIME │ MON 27  │ TUE 28  │ WED 29  │ THU 30  │ FRI 31        │
│      │         │         │         │         │               │
│08:00 │ EVENT   │         │ EVENT   │         │               │
│      │         │         │         │ EVENT   │               │
│10:00 │         │ EVENT   │         │         │               │
│      │         │         │         │         │               │
└──────┴─────────┴─────────┴─────────┴─────────┴───────────────┘

```

Keep navigation compact.

The timetable should receive most of the available screen area.

---

# 26. NAVIGATION

Primary navigation should include:

- previous period
- today
- next period
- Day
- Week
- Month
- Agenda
- calendar selector if relevant
- add event
- settings

Avoid a giant permanent sidebar unless the application's functionality genuinely requires one.

Desktop should maximize calendar width.

---

# 27. DAY VIEW

Create an excellent chronological day view.

Include:

- weekday
- full date
- hours
- current time
- events
- location
- event gaps
- overlaps
- total scheduled hours where useful

Empty days should deliberately say:

**FI**

```text
Ei tapahtumia tälle päivälle.

```

**EN**

```text
No events today.

```

Do not leave an unexplained blank page.

---

# 28. WEEK VIEW

Week view should be the flagship desktop experience.

Display:

- Monday-first weeks
- dates
- current day
- time axis
- event blocks
- current time
- optional weekends
- overlapping events
- custom events
- hidden/modified states when needed

Weekends can remain hidden when unused if that matches the existing behavior.

If weekend events exist, make them discoverable automatically.

---

# 29. EVENT BLOCKS

Event blocks should prioritize:

1. course/event title
2. time
3. location

Additional information can be available in the detail view.

Example:

```text
Software Development

10:00–12:00
ICT-City · Lambda

```

Do not cram:

- every teacher
- every group ID
- every source
- every identifier

into a small event block.

---

# 30. SHORT EVENTS

Handle short-duration events carefully.

If there is not enough vertical space:

show:

```text
Course name
10:00

```

rather than allowing overflowing text.

Additional information remains available on activation.

---

# 31. OVERLAPPING EVENTS

Implement real overlapping event layout.

Never simply render events on top of one another.

Calculate:

- collision groups
- available columns
- event width
- offset

Ensure overlapping events remain independently clickable/tappable.

---

# 32. CURRENT TIME INDICATOR

Keep a current-time indicator.

Example:

```text
──────────── 13:42 ─────────────

```

Use the accent sparingly.

It must remain visible but not overpower the schedule.

Do not create screen-reader announcements every minute.

---

# 33. MONTH VIEW

Month view should answer:

- which days are busy
- which days are free
- how many events occur
- where semester workload changes
- what the month looks like overall

Do not render unreadably tiny versions of complete events.

Use a compact month representation.

Selecting a date should easily open that date/day view.

---

# 34. AGENDA VIEW

Create a first-class chronological agenda/list view.

Example:

```text
TORSTAI 27. ELOKUUTA

08:00–10:00
Ohjelmistokehitys
ICT-City · Lambda

12:00–14:00
Insinöörimatematiikka
EduCity

```

English:

```text
THURSDAY 27 AUGUST

08:00–10:00
Software Development
ICT City · Lambda

12:00–14:00
Engineering Mathematics
EduCity

```

This should be a genuine product feature, not a forgotten accessibility workaround.

It is especially useful for:

- mobile
- screen readers
- keyboard users
- users who prefer chronological information

---

# 35. MOBILE DESIGN

Do not squash the desktop week grid onto a 360px display.

Mobile must receive its own responsive experience.

Primary mobile experience should emphasize:

- date
- current/next lesson
- daily schedule
- fast next/previous day navigation

Example:

```text
TAHTI

Thursday
27 August

‹ Wed                         Fri ›

NOW
Software Development
08:00–10:00
ICT City

10:00

12:00
Engineering Mathematics
12:00–14:00
EduCity

```

Week view may remain available as a secondary feature.

---

# 36. MOBILE NAVIGATION

Consider a small bottom navigation when genuinely useful.

Possible items:

```text
Schedule
Calendars
Add
Settings

```

Do not create five permanent nav buttons just because mobile applications often have bottom bars.

Keep only necessary destinations.

---

# 37. RESPONSIVENESS

Explicitly test at:

```text
320 × 568
360 × 800
375 × 812
390 × 844
430 × 932

768 × 1024
820 × 1180

1024 × 768
1280 × 720
1366 × 768
1440 × 900
1920 × 1080
2560 × 1440

```

The UI must remain functional at intermediate widths as well.

Do not optimize only for screenshots.

---

# 38. RESPONSIVE IMPLEMENTATION

Prefer:

- CSS Grid
- Flexbox
- `minmax()`
- `clamp()`
- fluid units
- container queries where useful

Avoid unnecessary JavaScript viewport calculations.

Nothing critical should:

- overlap
- disappear
- become unreadable
- extend beyond the viewport
- require horizontal scrolling accidentally

---

# 39. EVENT DETAILS

Activating an event should reveal complete information.

Possible information:

- full name
- date
- weekday
- start
- end
- duration
- location
- teacher
- groups
- realization
- course identifier
- calendar source
- custom changes

Desktop:

use a focused dialog, sheet or context panel depending on the screen.

Mobile:

use a bottom sheet or suitable full-screen panel.

---

# 40. EVENT ACTIONS

Preserve all useful existing actions.

Where supported by existing functionality:

- show details
- hide event
- restore event
- rename locally
- override location
- override time
- change event color
- change course color
- attach custom event
- restore original values

Desktop can support right-click.

But no functionality may exist **only** through right-click.

All functionality must also be keyboard and touch accessible.

---

# 41. CUSTOM EVENTS

Preserve manual custom event support.

Fields can include:

```text
Name
Date
Start
End
Location
Color
Calendar

```

Only require necessary data.

Validate:

- missing name
- invalid date
- invalid times
- end before start

Display human-readable validation messages.

---

# 42. CALENDAR MANAGEMENT

Preserve existing multiple-calendar features.

Users should be able to:

- view calendars
- create calendar
- rename calendar
- delete calendar
- select active calendar
- add calendar source
- edit calendar source
- remove source
- add iCal URL
- use existing Turku AMK integration/presets where currently available

Do not create fake integrations.

Use the real existing data source.

---

# 43. SETTINGS STRUCTURE

Organize settings into logical sections such as:

```text
Appearance
Calendar
Schedule
Language
Accessibility
Data
About

```

Avoid a giant unstructured list of toggles.

---

# 44. FIRST-TIME EXPERIENCE

On first use, provide a very short setup.

Do not create a five-screen marketing wizard.

Example:

## Step 1

```text
Add your timetable

```

Use the existing working calendar-source functionality.

## Step 2

```text
Language and appearance

```

Preselect appropriate automatic values.

Then open the schedule.

Allow skipping when appropriate.

---

# 45. AUTOMATIC LIGHT/DARK MODE

Support:

```text
System
Light
Dark

```

## FIRST VISIT

Before initial rendering, determine:

```ts
window.matchMedia("(prefers-color-scheme: dark)").matches

```

If dark:

```text
dark

```

If light:

```text
light

```

Do not show a bright white flash before dark mode initializes.

---

# 46. SYSTEM MODE

When appearance is:

```text
System

```

listen for:

```text
prefers-color-scheme

```

changes.

If the operating system changes while TAHTI is open, update the UI automatically.

---

# 47. MANUAL APPEARANCE

If the user chooses:

```text
Light

```

or:

```text
Dark

```

persist that selection.

Do not override it when the OS appearance changes.

Users must be able to change back to:

```text
System

```

at any time.

---

# 48. LANGUAGE

TAHTI must be completely available in:

# Finnish

and:

# English

No mixed-language screens.

No hardcoded visible UI strings scattered through React components.

Use the existing i18n implementation where suitable, otherwise organize translations cleanly with `i18next` / `react-i18next`.

Suggested structure:

```text
src/
  locales/
    fi/
      common.json
      calendar.json
      settings.json
      events.json
      onboarding.json

    en/
      common.json
      calendar.json
      settings.json
      events.json
      onboarding.json

```

---

# 49. LANGUAGE DETECTION

On first use inspect:

```ts
navigator.languages
navigator.language

```

If Finnish is preferred:

```text
fi

```

Otherwise:

```text
en

```

When the user manually changes language, persist it.

---

# 50. HTML LANGUAGE

Always update:

```html
<html lang="fi">

```

or:

```html
<html lang="en">

```

correctly.

Do not leave:

```html
<html lang="en">

```

while displaying Finnish.

---

# 51. DATE AND TIME LOCALIZATION

Do not concatenate translated dates manually.

Use appropriate date formatting.

Finnish examples:

```text
torstai 27.8.
27.8.2026
13.30
viikko 35

```

English examples:

```text
Thursday, 27 August
27 Aug 2026
13:30
Week 35

```

Finnish weeks begin Monday.

Keep 24-hour time as the sensible default for Finnish users.

---

# 52. ACCESSIBILITY STANDARD

Treat accessibility as a technical requirement, not optional polishing.

Target:

# WCAG 2.2 Level AA

and relevant requirements from:

# EN 301 549

The application should be appropriate for an EU educational environment.

---

# 53. SEMANTIC HTML

Use native semantics.

Prefer:

```html
<header>
<nav>
<main>
<section>
<article>
<button>
<a>
<form>
<label>
<input>
<select>
<h1>
<h2>

```

Do not make:

```html
<div onClick={...}>

```

into fake buttons.

Use a real:

```html
<button>

```

---

# 54. ARIA

Follow the rule:

# Native HTML first, ARIA second.

Do not add excessive ARIA.

ARIA must improve semantics, not compensate for incorrect HTML.

---

# 55. SCREEN READERS

Explicitly design for:

- NVDA
- VoiceOver
- other standards-compliant screen readers

Icon-only buttons need accessible names.

Bad:

```text
button
button
button

```

Good:

```text
Previous week
Go to today
Next week
Add event
Open settings

```

---

# 56. SCREEN READER EVENT LABELS

Calendar events should provide meaningful labels.

Example English:

```text
Software Development.
Thursday 27 August.
08:00 to 10:00.
ICT City, room Lambda.
Open event details.

```

Finnish:

```text
Ohjelmistokehitys.
Torstai 27. elokuuta.
Kello 8–10.
ICT-City, Lambda.
Avaa tapahtuman tiedot.

```

Do not force screen-reader users to infer everything from column position.

---

# 57. ACCESSIBLE ALTERNATIVE TO VISUAL GRID

The Agenda view should provide equivalent access to schedule content without requiring interpretation of a visual time grid.

This is essential.

---

# 58. KEYBOARD NAVIGATION

Everything must work with:

```text
Tab
Shift + Tab
Enter
Space
Escape
Arrow keys where appropriate

```

There must be:

- logical focus order
- visible focus
- no keyboard traps
- correct dialog focus management
- menu keyboard navigation
- predictable behavior

When a modal closes, return focus to the element that opened it.

---

# 59. SKIP LINK

Provide:

```text
Skip to timetable

```

Finnish:

```text
Siirry lukujärjestykseen

```

It should become visible when keyboard-focused.

---

# 60. FOCUS DESIGN

Use:

```css
:focus-visible

```

Create one clear focus style.

The focus ring must be visible:

- against dark surfaces
- against light surfaces
- against event colors

Never write:

```css
outline: none;

```

without a proper accessible replacement.

---

# 61. TOUCH TARGETS

Aim for approximately:

```text
44 × 44 CSS px

```

for important interactive touch targets.

An icon itself may be 18–20px while its button provides the larger target.

---

# 62. COLOR ACCESSIBILITY

Color must never be the only way information is communicated.

Do not distinguish:

```text
modified event
hidden event
selected event
warning

```

using color alone.

Use another indication such as:

- text
- icon
- border
- pattern
- state label
- accessible description

---

# 63. EVENT COLOR CONTRAST

Users may configure course/event colors.

Create a utility that calculates an accessible foreground color.

For a chosen background:

determine whether to use dark or light text.

Ensure text maintains sufficient contrast.

If necessary, slightly adjust rendered event color while preserving its visual identity.

---

# 64. REDUCED MOTION

Respect:

```css
@media (prefers-reduced-motion: reduce)

```

Reduce/disable:

- sliding
- zooming
- unnecessary transitions
- animated scrolling
- decorative motion

The application must remain understandable with animations completely disabled.

---

# 65. ANIMATION

Animations should be short and functional.

Good:

```text
100–180ms

```

for:

- menu appearance
- selection movement
- modal transition

Do not animate everything.

Never delay the timetable because of an entrance animation.

---

# 66. ZOOM

Test at:

```text
100%
125%
150%
200%

```

Critical content must remain usable at 200%.

Do not clip buttons or text because translated strings became larger.

---

# 67. EU PRIVACY

Design according to the principles of:

# GDPR

especially:

- data minimization
- purpose limitation
- privacy by default
- security by default

Do not collect information merely because it might be useful later.

---

# 68. ANALYTICS

Do not add:

- Google Analytics
- Meta Pixel
- TikTok Pixel
- invasive trackers

unless explicitly required.

If analytics are added later, prefer privacy-preserving solutions.

Do not automatically introduce a cookie banner when there are no unnecessary cookies.

A meaningless cookie banner is not GDPR compliance.

---

# 69. LOCAL STORAGE

Local storage is appropriate for non-sensitive preferences such as:

```text
theme
language
selected view
weekend display
calendar UI preferences

```

Use understandable keys.

Version persisted application state where migration may eventually be necessary.

---

# 70. SECURITY

Do not trust data merely because it came from an iCal file.

Validate external data.

Escape/render content safely.

Never render untrusted HTML from event fields.

Do not use:

```tsx
dangerouslySetInnerHTML

```

for calendar content.

---

# 71. NETWORK FAILURE

The application must handle failures cleanly.

States must include:

```text
loading
success
empty
error
offline where possible

```

Do not leave infinite spinners.

---

# 72. ERROR UI

Bad:

```text
Something went wrong

```

Better:

```text
The timetable could not be loaded.

Check your connection or try again.

[Try again]

```

Finnish:

```text
Lukujärjestystä ei voitu ladata.

Tarkista verkkoyhteys tai yritä uudelleen.

[Yritä uudelleen]

```

Keep technical stack traces out of normal UI.

---

# 73. LOADING

Do not fill the application with fake skeleton cards.

For schedule loading, a simple restrained loading state is sufficient.

If previous schedule data is available safely, prefer keeping it visible while refreshing.

---

# 74. EMPTY STATES

Write useful empty states.

Example:

```text
No timetable added yet.

Add an iCal source to get started.

[Add timetable]

```

Finnish:

```text
Lukujärjestystä ei ole vielä lisätty.

Lisää iCal-lähde aloittaaksesi.

[Lisää lukujärjestys]

```

No cute AI copy.

---

# 75. INSTALLABLE EXPERIENCE

If the existing architecture permits it without causing GitHub Pages problems, make TAHTI a lightweight PWA.

Potential features:

- manifest
- TAHTI icon
- standalone display
- theme colors
- cached static assets
- sensible last-known timetable support

Do not aggressively cache calendar API responses in a way that causes stale schedules.

PWA is secondary to reliability.

---

# 76. PERFORMANCE

Target excellent performance.

Avoid:

- giant JS dependencies
- unnecessary animation libraries
- huge icon packages
- unoptimized images
- rendering every event in the semester simultaneously
- expensive calculations every React render

Memoize expensive timetable calculations where useful.

Lazy-load secondary routes where appropriate.

---

# 77. ICONS

Use one coherent icon library such as:

```text
Lucide React

```

Do not mix:

- Material
- Font Awesome
- Heroicons
- Lucide
- random SVG packs

in the same application.

Use icons only when they improve recognition.

---

# 78. TOOLTIPS

Use tooltips for unfamiliar icon-only controls on pointer devices.

Tooltips cannot contain information unavailable elsewhere.

They must not be required for touch interaction.

---

# 79. CODE QUALITY

Use strict TypeScript.

Avoid:

```ts
any

```

unless absolutely necessary and documented.

Prefer domain types such as:

```ts
type CalendarId = string;

interface CalendarEvent {
  id: string;
  calendarId: CalendarId;
  title: string;
  start: Date;
  end: Date;
  location?: string;
}

```

Keep calendar/domain logic separate from rendering components.

---

# 80. COMPONENT STRUCTURE

Avoid giant 1500-line React components.

Possible structure:

```text
src/
  app/
  components/
  features/
    calendar/
    events/
    settings/
    calendars/
    onboarding/
  hooks/
  lib/
  locales/
  stores/
  styles/
  types/

```

Match the existing architecture when it is already better.

Do not reorganize files purely for aesthetic reasons.

---

# 81. CALENDAR ENGINE

Keep pure calculations separate where possible.

Examples:

```text
getWeekRange()
groupEventsByDay()
calculateEventPosition()
calculateOverlapColumns()
getVisibleHours()
formatCalendarEvent()

```

Pure functions are easier to test.

---

# 82. DATE HANDLING

Use the project's existing reliable date library where possible.

If date-fns is already being used, continue using it.

Do not introduce several competing date libraries.

Pay attention to:

- timezone
- DST
- week boundaries
- Monday-first weeks
- cross-midnight events
- semester boundaries

---

# 83. TESTING

Preserve working existing tests.

Add tests for redesigned logic.

At minimum test:

- date calculations
- event overlap
- week calculation
- event modification
- event hiding
- custom events
- settings persistence
- language fallback
- appearance preference
- system appearance detection

---

# 84. ACCESSIBILITY TESTING

Add automated accessibility checks where practical.

Use tools such as:

```text
axe

```

where suitable.

Automation does not replace manual testing.

Also manually reason/test:

- keyboard-only navigation
- screen-reader names
- focus flow
- modal focus
- zoom
- contrast

---

# 85. RESPONSIVE TESTS

Use Playwright if it fits the current repository.

Test critical flows at at least:

```text
mobile
tablet
desktop

```

Critical paths:

```text
load timetable
change week
open event
create event
open settings
change theme
change language
manage calendar

```

---

# 86. LIGHT/DARK TESTING

Tests should verify:

### No saved preference + OS dark

Result:

```text
dark

```

### No saved preference + OS light

Result:

```text
light

```

### Saved dark + OS light

Result:

```text
dark

```

### Saved light + OS dark

Result:

```text
light

```

### System + OS mode changes

Result:

```text
application updates dynamically

```

---

# 87. TRANSLATION TESTING

Prevent untranslated keys such as:

```text
settings.theme.system

```

from accidentally appearing in production UI.

Both translation files should remain structurally consistent.

---

# 88. README

Rewrite README.md for TAHTI.

Include:

```text
TAHTI

What it is
Features
Technology
Local development
Environment variables
Existing database connection
Testing
Building
GitHub Pages deployment
GitHub Actions
Accessibility
Localization
Project structure

```

Do not fill README with startup marketing language.

Write for developers.

---

# 89. GITHUB PAGES README SECTION

Explicitly explain how deployment works.

For example:

```text
1. Push to main
2. GitHub Actions installs dependencies
3. lint/typecheck/tests run
4. Vite builds the frontend
5. dist is uploaded as a Pages artifact
6. GitHub deploys it to GitHub Pages

```

Include instructions for enabling:

```text
Settings → Pages → Source → GitHub Actions

```

if required.

---

# 90. CUSTOM DOMAIN SUPPORT

Do not require a custom domain.

The default GitHub URL must work.

But make it easy to add a custom domain later.

If a `CNAME` file is used, document it.

Never hardcode a fictional domain.

---

# 91. 404 / SPA HANDLING

Verify all of these:

```text
Open homepage directly
Refresh homepage
Navigate to settings
Refresh settings
Return to timetable
Use browser back
Use browser forward

```

There must be no broken GitHub Pages routing.

---

# 92. SEO / METADATA

TAHTI is primarily an application, but add basic metadata.

Example:

```html
<title>TAHTI</title>

<meta
  name="description"
  content="A clear timetable for your study week."
/>

```

Finnish can be used according to selected/site default context.

Add:

- favicon
- theme-color
- manifest when PWA is used

Do not add fake SEO paragraphs to the application interface.

---

# 93. PRINTING

If practical, create a simple printable week timetable.

When:

```text
Ctrl + P

```

is used:

hide:

- navigation
- settings
- floating controls

Print:

- date/week
- timetable
- relevant event details

Do not make print styling a priority over core functionality, but implement it if straightforward.

---

# 94. SETTINGS: APPEARANCE

Appearance settings could contain:

```text
Appearance

Theme
○ System
○ Light
○ Dark

Accent
● Coral
○ Blue
○ Green
○ Violet
○ Amber

```

But design a clean custom control rather than copying generic radio-card layouts.

---

# 95. USER EVENT COLORS

Keep separate concepts:

### Application accent

Changes TAHTI's UI identity.

### Calendar/course colors

Identify timetable events.

Changing the TAHTI accent must not recolor every course.

---

# 96. HEADER DETAILS

Desktop example:

```text
[TAHTI]

‹     Today     ›

Week 35
24–30 August

Day  Week  Month  Agenda

+ Event        ⚙

```

Do not literally copy this if a better layout emerges.

Maintain the same hierarchy.

---

# 97. TODAY

Make today recognizable without painting the whole column a saturated color.

Possible treatment:

- slightly altered background
- accent date marker
- subtle header line

Example:

```text
THU
27

```

where:

```text
27

```

receives the accent.

---

# 98. CALENDAR GEOMETRY AS BRAND LANGUAGE

Use timetable geometry outside the calendar sparingly.

For example:

- loading indicator
- logo
- section separators
- active tabs

could subtly reference schedule blocks.

Do not overdo it.

This becomes TAHTI's design language instead of generic decorative blobs.

---

# 99. MICRO-INTERACTIONS

Useful interactions:

- selected view indicator moves cleanly
- event hover slightly increases boundary contrast
- current day subtly emphasized
- menu fades in quickly

Avoid:

- bouncing
- spring overshoot everywhere
- rotating icons
- cards lifting dramatically
- elaborate page transitions

The interface should feel responsive, not animated.

---

# 100. COPYWRITING

Use short, human interface language.

Examples:

Bad:

```text
Embark on your academic journey by seamlessly integrating your personalized calendar experience.

```

Good:

```text
Add your timetable.

```

Bad:

```text
Elevate your viewing experience.

```

Good:

```text
Appearance

```

---

# 101. FINNISH COPY

Finnish must sound like Finnish software, not machine-translated English.

Prefer:

```text
Tänään
Edellinen viikko
Seuraava viikko
Lisää tapahtuma
Asetukset
Ulkoasu
Kieli
Kalenterit
Ei tapahtumia
Yritä uudelleen

```

Avoid awkward literal translations.

---

# 102. ENGLISH COPY

Use clear international English.

Prefer:

```text
Today
Previous week
Next week
Add event
Settings
Appearance
Language
Calendars
No events
Try again

```

No marketing language inside functional screens.

---

# 103. ACCESSIBILITY SETTINGS

Do not create unnecessary accessibility toggles for features that should simply be accessible by default.

For example:

Do not make:

```text
Accessible mode

```

Everything must already be accessible.

Optional preferences can exist for:

- reduced visual density
- stronger contrast if useful
- larger timetable text

but only if implemented properly.

---

# 104. DENSITY

Desktop timetable applications benefit from density.

Do not make every event enormous.

Consider:

```text
Comfortable
Compact

```

only if this genuinely benefits the existing application.

Otherwise choose one carefully tuned default.

---

# 105. ERROR BOUNDARY

Add a proper application-level React error boundary.

If unexpected rendering fails, show a recovery interface.

Do not expose internal stack traces to normal users.

---

# 106. OFFLINE BEHAVIOR

GitHub Pages itself serves static assets well.

Where practical:

- allow application shell to load
- show last known locally available timetable
- clearly indicate stale/offline state

Do not falsely claim current calendar data when it could not be refreshed.

---

# 107. API CORS

Because frontend hosting is GitHub Pages, verify that the existing calendar/database/API endpoints accept requests from the production GitHub Pages origin.

Do not discover this after deployment.

Test the actual production origin.

If the existing application uses a backend proxy for CORS, preserve that architecture.

Do not expose private API credentials just to avoid CORS issues.

---

# 108. DATABASE SECURITY WITH GITHUB PAGES

Remember:

GitHub Pages serves public static frontend files.

Therefore private database credentials can never be bundled into the frontend.

If the existing database architecture exposes a browser-safe public key, continue using it according to its security model.

If privileged operations exist, keep them behind the existing secure server/API implementation.

Never place admin credentials in:

```text
VITE_*

```

variables.

---

# 109. DEPENDENCIES

Prefer existing dependencies where they are good.

Remove unused dependencies.

Do not introduce packages for trivial things.

Do not install:

- a giant animation library for simple transitions
- a massive UI framework when custom components already exist
- three separate date libraries
- multiple icon libraries

Every dependency should have a clear purpose.

---

# 110. TECHNOLOGY PREFERENCE

Stay close to technologies I know:

```text
TypeScript
React
Vite
Tailwind CSS
JavaScript
HTML
CSS
Node.js
Git
GitHub
GitHub Actions
Supabase only if it is already part of this project/database architecture

```

Do not rewrite the project in:

- Vue
- Angular
- Svelte
- Flutter
- PHP
- Ruby
- another completely different stack

without an exceptional existing technical reason.

---

# 111. COMPONENT LIBRARIES

Radix primitives may be used for difficult accessible primitives such as:

```text
Dialog
DropdownMenu
Popover
Tooltip

```

if useful.

Do not make the application look like the default Radix/shadcn theme.

Style everything according to TAHTI.

---

# 112. PRESERVE FUNCTIONALITY

Before finishing, compare TAHTI against the original application.

Create a feature checklist.

Every working original feature must be:

```text
Preserved
Improved
Intentionally removed with documented reason

```

Never silently lose a feature.

---

# 113. REMOVE LEGACY CODE CAREFULLY

After replacement:

- find unused components
- find unused styles
- find unused imports
- find old branding
- find old logo references
- find old translations
- find dead routes

Remove obsolete code only when it has genuinely been replaced.

Do not leave two competing UI implementations.

---

# 114. OLD BRAND SEARCH

Before completion search the repository for:

```text
Lukkarikone
Avoin Lukkari
old logo filename
old product title
old metadata

```

Update user-facing occurrences to:

```text
TAHTI

```

Do not alter database identifiers solely because they contain an old name if doing so risks compatibility.

---

# 115. LOGO ASSETS

Create production-ready logo assets.

At minimum:

```text
/public/brand/tahti-symbol.svg
/public/brand/tahti-wordmark.svg
/public/brand/tahti-logo.svg
/public/favicon.svg
/public/icon-192.png
/public/icon-512.png

```

The SVG must contain real vector geometry.

Do not link to external design tools.

Do not use placeholder logos.

---

# 116. FAVICON

The symbol must remain understandable at favicon size.

Simplify the timetable geometry until the silhouette works around:

```text
16 × 16

```

Do not put the entire word TAHTI into the favicon.

---

# 117. LOADING BRAND ELEMENT

If a startup indicator is necessary, derive it from TAHTI's schedule blocks.

Example:

three timetable blocks changing opacity.

Respect `prefers-reduced-motion`.

Do not use a generic rotating spinner unless necessary.

---

# 118. LANDING / ENTRY PAGE

If the existing application has a landing page, redesign it as part of TAHTI.

Keep it concise.

Do not create a giant SaaS marketing site.

Possible structure:

```text
TAHTI

Your study day at a glance.

[Open timetable]
[Add timetable]

small real application preview

Fast.
Accessible.
Works on every screen.

```

Do not include fake testimonials or fake numbers.

---

# 119. IF USERS GO DIRECTLY TO THE APP

Do not force returning users through the landing page.

If the application knows their timetable configuration, take them directly into their timetable.

Speed matters.

---

# 120. SETTINGS PERSISTENCE

Preserve current storage/database behavior.

Settings should survive reload where they currently do.

Examples:

```text
language
appearance
active calendar
visible weekdays
selected view
custom colors
event modifications

```

Do not accidentally reset preferences during rebranding.

---

# 121. FIRST LOAD FLASH

Prevent:

- theme flash
- wrong-language flash where practical
- gigantic layout shift

Load minimal theme preference before React mount.

Example approach:

```html
<script>
  // apply saved/system appearance before application CSS paints
</script>

```

Keep implementation safe and small.

---

# 122. VIEW STATE

Remember appropriate UI preferences.

For example:

```text
preferred calendar view

```

can persist.

But opening the application weeks later should still intelligently focus on the current date rather than a stale date from the previous session unless intentionally designed otherwise.

---

# 123. URL STATE

Where useful, allow links to represent meaningful state such as a date:

```text
#/week/2026-08-24

```

But do not complicate routing unnecessarily.

Remember GitHub Pages compatibility.

---

# 124. EMPTY WEEK

When there are no events in a week, keep the timetable structure understandable.

Display a restrained message such as:

```text
No events this week.

```

Do not replace the entire timetable with a huge illustration.

---

# 125. PERFORMANCE TARGETS

Aim for:

```text
Lighthouse Performance: 90+
Accessibility: 100 where realistic
Best Practices: 100
SEO: 90+

```

These are goals, not excuses for gaming Lighthouse.

Real usability matters more than the numeric score.

---

# 126. BUILD WARNINGS

Production build should have:

- no TypeScript errors
- no lint errors
- no broken imports
- no missing translation files
- no failed tests
- no major accessibility violations
- no missing assets

Do not finish with:

```text
TODO
FIXME
placeholder
Lorem ipsum

```

in visible production functionality.

---

# 127. CONSOLE

Normal production usage should not generate avoidable:

```text
console.error
console.warn
404
uncaught exceptions
React key warnings

```

Remove development logging.

---

# 128. FINAL TESTING MATRIX

Before considering the redesign complete, test:

## Browser

- Chrome
- Edge
- Firefox
- Safari where available

## Appearance

- system light
- system dark
- forced light
- forced dark

## Language

- Finnish
- English

## Input

- mouse
- keyboard
- touch

## Screen

- 320px phone
- 390px phone
- tablet
- 1366px laptop
- 1920px desktop
- ultrawide

## Zoom

- 100%
- 200%

---

# 129. CORE USER FLOWS

Manually verify these complete flows.

### New user

```text
Open TAHTI
→ correct system theme
→ correct default language
→ add timetable
→ timetable appears

```

### Returning user

```text
Open TAHTI
→ preferences load
→ existing calendar loads
→ current schedule appears

```

### Event

```text
Open event
→ read information
→ modify setting
→ close
→ calendar updates
→ refresh
→ modification persists

```

### Theme

```text
System
→ Dark
→ Light
→ System

```

### Language

```text
FI
→ EN
→ reload
→ EN remains

```

### Mobile

```text
open schedule
→ change day
→ open event
→ add event
→ settings
→ return

```

### Keyboard

```text
load
→ skip link
→ navigate timetable controls
→ open event
→ close event
→ focus returns

```

---

# 130. GITHUB PRODUCTION TEST

After configuring the GitHub Pages build, test the actual deployed version, not just localhost.

Verify:

```text
GitHub Pages URL loads
database/calendar works
CORS works
assets load
favicon loads
refresh works
language works
theme works
mobile works
no secret is exposed

```

A project that only works through:

```bash
npm run dev

```

is not finished.

---

# 131. DEFINITION OF DONE

The project is finished only when:

- TAHTI branding is complete
- new logo exists
- old user-facing branding is gone
- redesign is complete
- light mode works
- dark mode works
- system mode works
- first-time device theme detection works
- Finnish works
- English works
- first-time language detection works
- desktop works
- tablet works
- mobile works
- screen reader semantics are implemented
- keyboard navigation works
- WCAG 2.2 AA requirements are addressed
- EN 301 549 requirements relevant to the application are addressed
- existing database is still used
- existing user data is preserved
- existing calendar functionality works
- custom events work
- settings work
- responsive layouts work
- tests pass
- lint passes
- TypeScript passes
- production build passes
- GitHub Actions passes
- application successfully deploys to GitHub Pages
- actual GitHub Pages deployment has been tested

---

# 132. MOST IMPORTANT PRODUCT RULE

Never sacrifice usability in order to make the application look more impressive.

TAHTI should feel impressive because it is:

- fast
- clear
- dense where appropriate
- visually distinctive
- accessible
- responsive
- reliable

not because it contains more decoration.

---

# 133. MOST IMPORTANT DESIGN RULE

At every design decision ask:

> Does this look specifically designed for TAHTI and a timetable, or could this component have come from any generic AI-generated dashboard?

If it could belong to any generic SaaS dashboard:

redesign it.

Use:

- timetable geometry
- rhythm
- alignment
- precise typography
- purposeful color
- meaningful interaction

to give TAHTI its own identity.

---

# 134. MOST IMPORTANT TECHNICAL RULE

Do not rewrite working functionality simply because rewriting feels cleaner.

Understand it first.

Preserve what works.

Improve what needs improvement.

Use the same existing database.

Keep the architecture maintainable.

Do not expose secrets.

---

# 135. MOST IMPORTANT DEPLOYMENT RULE

The final application must actually run from GitHub Pages.

The result is not complete until:

```text
git push
      ↓
GitHub Actions
      ↓
checks
      ↓
build
      ↓
GitHub Pages
      ↓
working production TAHTI application

```

works end-to-end.

---

# FINAL INSTRUCTION

Now inspect the complete existing repository and rebuild it into **TAHTI**.

Do not respond by merely describing what you would build.

Actually modify and implement the application.

Proceed systematically:

1. inspect current code
2. inventory current features
3. identify the existing database architecture
4. preserve the database and data contracts
5. design the TAHTI brand
6. create the logo assets
7. establish design tokens
8. implement responsive application shell
9. rebuild timetable views
10. rebuild event interaction
11. rebuild mobile experience
12. rebuild settings/calendar management
13. implement FI/EN
14. implement Light/Dark/System
15. implement accessibility
16. preserve existing data behavior
17. test functionality
18. configure GitHub Pages
19. configure GitHub Actions deployment
20. test the actual production build
21. remove obsolete legacy presentation code
22. perform final accessibility, responsive and functionality checks

Do not stop at a redesign mockup.

Do not leave placeholders.

Do not create fake functionality.

Do not replace the existing database.

Do not change hosting away from GitHub Pages.

Deliver a complete, working, production-ready **TAHTI** application.