# Job-Application-Website

## TalentForge - Corporate Recruitment & Career Application Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![FontAwesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=flat&logo=font-awesome&logoColor=white)](https://fontawesome.com/)
[![WCAG 2.1 AA](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA-success)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **TalentForge** is an enterprise-grade recruitment and career platform built with strict adherence to **Accessible Form Design Patterns**, modern multi-stage form architectures, interactive filterable job catalogs, expandable job specifications, and real-time candidate application status tracking.

---

## 🌟 Key Features & Requirements Matrix

### 1. Corporate Recruitment Platform & Filterable Job Listings
- **Multi-Vector Search Engine**: Instant full-text filtering across job titles, tech stacks (React, TypeScript, AWS, Python, Kafka, etc.), department, and locations.
- **Dimensional Dropdown Filters**:
  - **Department**: Engineering, Product & Design, Data & AI, Security & DevSecOps, Growth & Marketing, People & Culture.
  - **Work Mode**: 100% Remote, Hybrid (2-3 days office), On-site global hubs (San Francisco, New York, London, Zurich, etc.).
  - **Experience Level**: Early Career (0-2 yrs), Mid-level (3-5 yrs), Senior (5+ yrs), Lead & Staff (7+ yrs).
  - **Employment Type**: Full-time, Contract, Internship.
- **Dynamic Salary Range Slider**: Real-time compensation threshold filtering ($0k+ to $220k+).
- **Quick-Filter Pills**: One-click toggles for *Remote Only*, *Urgent Hire*, *Lead & Staff*, *Early Career*, and *Engineering*.
- **Multi-Mode Layouts**: Switch seamlessly between **Grid Card View** and **List View**.
- **Interactive Sorting**: Featured first, Salary (high to low / low to high), Most recent postings, or Alphabetical.

### 2. Expandable Job Details View
- **Slide-Over Modal Architecture**: Detailed position dossiers without losing user search state or scroll position.
- **Deep Role Specifications**:
  - Corporate overview, strategic mission, and team objectives.
  - Granular key responsibilities with visual checklist indicators.
  - Essential qualifications and preferred / nice-to-have bonus skill sets.
  - Full technology stack tags and total rewards/benefits packages.
  - **Hiring Manager Spotlight Card**: Direct visibility into the engineering/product lead championing the position.
- **Deep Linking & Sharing**: Generates shareable URL anchors (e.g. `#job=job-01`) with automatic clipboard copy and toast notifications.

### 3. Comprehensive Multi-Stage Job Application Form (Form Architecture)
- **4-Stage Progressive Wizard**:
  - **Stage 1 (Identity & Contact)**: First & last name, email regex validation, international phone validation, current city/country, and legal work authorization status.
  - **Stage 2 (Professional Profile)**: Current job title, years of experience brackets, verified LinkedIn profile URL, portfolio/GitHub link, notice period / availability date, and desired annual compensation.
  - **Stage 3 (Resume Attachment & Pitch)**:
    - **Drag-and-Drop Dropzone**: Dedicated drop target and file picker button supporting `.pdf`, `.doc`, and `.docx` files up to 5 MB.
    - **Attached File Preview Badge**: Dynamic document type icon, file size calculation (e.g. `1.42 MB`), and file removal trigger.
    - **Cover Letter Area**: Live real-time character counter (`0 / 1500 chars`) with visual warnings on limit proximity.
    - Referral source attribution.
  - **Stage 4 (Compliance & Submit)**:
    - Dynamic review summary card synthesizing all previous inputs for candidate verification before final submission.
    - Voluntary Equal Opportunity declaration.
    - Data processing consent checkbox with required field enforcement.
- **Accessible Form Design Patterns**:
  - Semantic `<fieldset>` and `<legend>` grouping.
  - Clear label associations (`for` attributes matching `id`).
  - Screen-reader friendly error announcements (`aria-invalid`, `aria-describedby`, and `role="alert"`).
  - High-visibility focus indicators meeting WCAG 2.1 AA contrast thresholds.

### 4. Application Status Feedback & Candidate Tracker
- **Real-Time Submission State**: Animated submission spinner followed by an immediate application success confirmation.
- **Unique Reference ID**: Automatically generated tracking identifier (e.g. `TF-2026-8912`).
- **Interactive "My Applications" Portal**:
  - Persisted in browser `localStorage`.
  - Visual 4-step progress pipeline (*Submitted* &rarr; *In Review* &rarr; *Interview* &rarr; *Offer*).
  - Status badges with distinct visual treatments.
  - Application withdrawal workflow with interactive confirmation dialog.

### 5. Saved Jobs (Bookmarks)
- Bookmark any role with instant local storage persistence.
- Slide-out **Saved Jobs Drawer** with fast application triggers and bookmark removal actions.
- Dynamic count badge indicator in top navigation bar.

### 6. Dual-Theme Architecture (Dark & Light Mode)
- **Executive Light Theme**: Clean, high-legibility corporate aesthetic designed for enterprise recruiting.
- **Obsidian Dark Theme**: High-contrast, reduced-eye-strain developer mode with glowing accents and deep slate backgrounds.
- Persistent user theme choice in `localStorage`.

---

## 🛠️ Project Structure

```text
Job Application Website/
├── index.html              # Main semantic HTML5 application entry point
├── assets/
│   ├── css/
│   │   └── style.css       # Complete design system, responsive styles, & animations
│   └── js/
│       ├── data.js         # Comprehensive dataset: 12 open roles, metrics, & perks
│       ├── form.js         # Multi-step wizard, drag-and-drop resume upload, validation, & tracker
│       └── app.js          # Filtering engine, search, drawer modals, & theme toggle
└── README.md               # Detailed architectural and implementation documentation
```

---

## 🚀 Getting Started

No build tools or bundlers required. Run the application in any modern web browser:

1. Clone or navigate to the project directory:
   ```bash
   cd "D:\Internship\fronted\week4\Job Application Website"
   ```
2. Open `index.html` in your browser:
   - Double click `index.html`, or
   - Use VS Code Live Server extension, or
   - Run a lightweight HTTP server:
     ```bash
     python -m http.server 3000
     ```
3. Open `http://localhost:3000` in your web browser.

---

## 🧪 Accessibility (A11y) & WCAG Compliance Highlights
- **Skip Navigation Link**: Allows keyboard-only users to bypass navigation headers directly to main job listings (`#main-content`).
- **WAI-ARIA Dialog Modals**: Modals configured with `role="dialog"`, `aria-modal="true"`, and accessible label bindings (`aria-labelledby`).
- **Keyboard Navigation**:
  - Escape (`Esc`) key dismisses any open modal or drawer.
  - Tab navigation maintains logical focus sequence through all interactive elements.
- **Assistive Technology Announcements**: Dynamic changes such as search results count and toast notifications use `aria-live="polite"` and `role="status"`.

---

## 📄 License
This project is developed for educational and recruitment demonstration purposes. All corporate entities and mock profiles depicted are illustrative.

