/**
 * TalentForge Recruitment Platform - Data Store
 * Comprehensive dataset of job listings, departments, benefits, and metrics.
 */

const JOB_DATA = [
  {
    id: "job-01",
    title: "Lead Frontend Architect",
    department: "Engineering",
    departmentIcon: "fa-solid fa-code",
    type: "Full-time",
    workMode: "Remote",
    location: "San Francisco, CA (or Global Remote)",
    experience: "Lead & Staff",
    experienceYears: "7+ years",
    salaryMin: 185000,
    salaryMax: 235000,
    currency: "$",
    salaryFormatted: "$185,000 - $235,000",
    equity: "0.15% - 0.30%",
    postedDate: "2 days ago",
    dateTimestamp: "2026-11-11",
    deadline: "2026-12-20",
    urgent: true,
    featured: true,
    summary: "Architect next-generation enterprise frontend systems, design high-scale component libraries, and spearhead web accessibility standards across all corporate products.",
    aboutRole: "As our Lead Frontend Architect, you will govern the technical vision and frontend engineering roadmap for our mission-critical enterprise suite. You will mentor senior developers, collaborate closely with UX leadership, and champion WCAG 2.1 AA accessibility and sub-second web performance.",
    responsibilities: [
      "Define and enforce frontend architectural guidelines, core web vitals standards, and micro-frontend integrations.",
      "Design and maintain our multi-brand enterprise design system used by over 60 product engineers.",
      "Partner with cybersecurity teams to audit front-of-the-glass security, CSP, and XSS defense mechanisms.",
      "Conduct rigorous code reviews, technical spike investigations, and host architecture review board sessions.",
      "Optimize build pipelines, bundler configurations, and bundle size budgets targeting 60fps animations."
    ],
    requirements: [
      "7+ years of professional frontend engineering experience, with at least 2 years in a technical leadership capacity.",
      "Mastery of modern JavaScript (ESNext), TypeScript, React, and modular state management architectures.",
      "Deep understanding of browser rendering pipelines, Web Vitals optimization, and service workers.",
      "Comprehensive knowledge of WCAG 2.1 AA accessibility specifications, ARIA authoring practices, and semantic HTML.",
      "Demonstrated experience architecting large-scale SPAs or SSR applications serving millions of users."
    ],
    niceToHave: [
      "Experience migrating monolithic frontends to modern modular micro-frontend ecosystems.",
      "Contributions to recognized open-source frontend frameworks or design systems.",
      "Familiarity with WebAssembly (Wasm) or Rust for client-side processing."
    ],
    techStack: ["TypeScript", "React 19", "Next.js", "Tailwind CSS", "GraphQL", "Web Vitals", "Jest / Vitest", "Cypress"],
    benefits: [
      "100% remote flexibility with home office setup stipend ($3,500)",
      "Comprehensive Health, Dental, and Vision coverage (100% employer paid for employee & family)",
      "401(k) retirement plan with 6% immediate matching",
      "Unlimited flexible PTO with mandatory 3-week minimum annual recharge",
      "$3,000 annual continuous education and conference travel stipend"
    ],
    hiringManager: {
      name: "Marcus Vance",
      title: "VP of Engineering",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-02",
    title: "Senior Full Stack Cloud Engineer",
    department: "Engineering",
    departmentIcon: "fa-solid fa-server",
    type: "Full-time",
    workMode: "Hybrid",
    location: "New York, NY (Hybrid: 2 days in office)",
    experience: "Senior",
    experienceYears: "5+ years",
    salaryMin: 160000,
    salaryMax: 195000,
    currency: "$",
    salaryFormatted: "$160,000 - $195,000",
    equity: "0.10% - 0.20%",
    postedDate: "1 day ago",
    dateTimestamp: "2026-11-12",
    deadline: "2026-12-15",
    urgent: true,
    featured: true,
    summary: "Deliver scalable cloud APIs and responsive enterprise web interfaces for our high-throughput transactional analytics engine.",
    aboutRole: "Join our Core Platform squad to engineer resilient backend microservices on AWS alongside slick, responsive web applications. You'll work with high-velocity data pipelines and modern developer tooling.",
    responsibilities: [
      "Design, build, and deploy low-latency RESTful and gRPC APIs powering real-time financial data feeds.",
      "Implement performant client-side data visualization dashboards using React and D3/Chart.js.",
      "Maintain 99.99% service availability with robust observability (Datadog, OpenTelemetry, Prometheus).",
      "Automate CI/CD pipelines, container orchestration, and cloud infrastructure as code via Terraform."
    ],
    requirements: [
      "5+ years of software development experience across Node.js/Go and modern frontend frameworks (React/Vue).",
      "Hands-on production expertise with PostgreSQL, Redis, and event streaming systems (Kafka or RabbitMQ).",
      "Solid cloud foundations in AWS (ECS, Lambda, RDS, S3, IAM, CloudFront).",
      "Strong background in test-driven development (TDD), unit, integration, and end-to-end testing."
    ],
    niceToHave: [
      "AWS Certified Solutions Architect certification.",
      "Experience with GraphQL federation and Apollo Router.",
      "Background in FinTech or algorithmic trading platforms."
    ],
    techStack: ["Node.js", "Go", "React", "TypeScript", "PostgreSQL", "Kafka", "AWS", "Docker", "Terraform"],
    benefits: [
      "Hybrid workspace perks including catered gourmet lunches and downtown commuter benefits",
      "Full premium healthcare coverage + wellness HSA contribution",
      "Annual performance bonus up to 15% of base compensation",
      "Generous parental leave (18 weeks fully paid)"
    ],
    hiringManager: {
      name: "Sophia Zhang",
      title: "Director of Platform Engineering",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-03",
    title: "Principal Product Designer (Design Systems)",
    department: "Design",
    departmentIcon: "fa-solid fa-pen-nib",
    type: "Full-time",
    workMode: "Remote",
    location: "London, UK (or Remote Europe/US East)",
    experience: "Lead & Staff",
    experienceYears: "8+ years",
    salaryMin: 155000,
    salaryMax: 190000,
    currency: "$",
    salaryFormatted: "$155,000 - $190,000",
    equity: "0.12% - 0.25%",
    postedDate: "3 days ago",
    dateTimestamp: "2026-11-10",
    deadline: "2026-12-28",
    urgent: false,
    featured: true,
    summary: "Elevate our enterprise design system 'ForgeDS' to world-class standards, bridging the bridge between visionary product design and production code.",
    aboutRole: "We are seeking a seasoned Principal Product Designer with a passionate focus on design token architecture, cross-platform accessibility, and design operations. You will be the design authority across six cross-functional product verticals.",
    responsibilities: [
      "Establish and govern our multi-platform design token architecture (Figma Tokens, Style Dictionary).",
      "Design complex accessible UI components, interactive prototypes, and micro-interaction specifications.",
      "Advocate for inclusive design and conduct regular user testing sessions with assistive technology users.",
      "Lead cross-team workshops, design critiques, and mentor 8+ product designers."
    ],
    requirements: [
      "8+ years of experience designing complex B2B enterprise software or consumer platforms.",
      "Proven track record creating, publishing, and scaling world-class design systems in Figma.",
      "Proficient understanding of CSS3 layout specifications (Grid, Flexbox, Container Queries) and HTML5 semantics.",
      "Comprehensive portfolio showcasing design craft, user journey mapping, and measurable business outcomes."
    ],
    niceToHave: [
      "Ability to write clean HTML/CSS/React prototypes for proof-of-concept testing.",
      "Experience with motion design tools (Framer, Principle, Lottie).",
      "Public speaking or articles on UX accessibility and design systems."
    ],
    techStack: ["Figma", "Design Tokens", "DesignOps", "Storybook", "Zeroheight", "HTML5/CSS3", "UserTesting"],
    benefits: [
      "Full international remote work flexibility + coworking space allowance",
      "Top-tier Apple hardware of your choice (M3 Max MacBook Pro + 5K Display)",
      "Annual wellness stipend ($1,200 for gym, yoga, mindfulness)",
      "Generous equity package with early exercise options"
    ],
    hiringManager: {
      name: "Julian Rivera",
      title: "Head of Product Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-04",
    title: "Senior AI & Machine Learning Engineer",
    department: "Data & AI",
    departmentIcon: "fa-solid fa-brain",
    type: "Full-time",
    workMode: "Hybrid",
    location: "San Francisco, CA (Hybrid: 3 days on-site)",
    experience: "Senior",
    experienceYears: "4+ years",
    salaryMin: 190000,
    salaryMax: 240000,
    currency: "$",
    salaryFormatted: "$190,000 - $240,000",
    equity: "0.20% - 0.35%",
    postedDate: "Just now",
    dateTimestamp: "2026-11-13",
    deadline: "2026-12-18",
    urgent: true,
    featured: true,
    summary: "Build, fine-tune, and deploy production LLM pipelines and predictive matching algorithms for autonomous talent discovery.",
    aboutRole: "You will push the boundaries of enterprise recruitment intelligence by integrating cutting-edge foundation models, retrieval-augmented generation (RAG), and vector embeddings into real-time search workflows.",
    responsibilities: [
      "Fine-tune open-weight and proprietary LLMs for domain-specific candidate ranking and resume parsing.",
      "Build high-throughput vector search pipelines using Milvus, Pinecone, and hybrid BM25 search.",
      "Implement model evaluation benchmarks, hallucination guardrails, and compliance audits for bias mitigation.",
      "Collaborate with backend engineers to deploy low-latency inference services with vLLM and TensorRT."
    ],
    requirements: [
      "4+ years of machine learning engineering experience with Python, PyTorch, and modern NLP frameworks.",
      "Proven experience serving LLMs in production, vector databases, and enterprise RAG architecture.",
      "Strong grounding in distributed training, model quantization (AWQ, GGUF), and GPU cluster optimization.",
      "Degree in Computer Science, Artificial Intelligence, or equivalent practical experience."
    ],
    niceToHave: [
      "Published research in NeurIPS, ICML, ACL, or EMNLP.",
      "Experience deploying inference workloads on Triton Inference Server or Ray.",
      "Experience with AI ethics, fairness auditing, and GDPR-compliant model training."
    ],
    techStack: ["Python", "PyTorch", "Hugging Face", "LangChain / LlamaIndex", "Pinecone", "Docker", "vLLM", "AWS SageMaker"],
    benefits: [
      "Generous base salary + significant high-growth AI equity grant",
      "Relocation package up to $10,000 for candidates moving to the Bay Area",
      "Dedicated compute budget and access to multi-node H100 GPU clusters",
      "Comprehensive medical, dental, vision, life, and disability coverage"
    ],
    hiringManager: {
      name: "Dr. Elena Rostova",
      title: "Chief AI Scientist",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-05",
    title: "Senior Product Manager - Enterprise SaaS",
    department: "Product",
    departmentIcon: "fa-solid fa-briefcase",
    type: "Full-time",
    workMode: "Remote",
    location: "Austin, TX (or US Remote)",
    experience: "Senior",
    experienceYears: "5+ years",
    salaryMin: 150000,
    salaryMax: 185000,
    currency: "$",
    salaryFormatted: "$150,000 - $185,000",
    equity: "0.10% - 0.20%",
    postedDate: "4 days ago",
    dateTimestamp: "2026-11-09",
    deadline: "2026-12-22",
    urgent: false,
    featured: false,
    summary: "Own the end-to-end product strategy for our flagship enterprise candidate workflow and compliance analytics platform.",
    aboutRole: "In this role, you will synthesize customer discovery, commercial insights, and technical possibilities to define the multi-quarter product roadmap for enterprise talent acquisition leaders.",
    responsibilities: [
      "Lead discovery interviews with Fortune 500 Chief People Officers and Talent Ops leads to validate pain points.",
      "Draft comprehensive PRDs, user stories, acceptance criteria, and KPI measurement plans.",
      "Partner with engineering, UX design, and go-to-market teams to drive iterative, high-impact releases.",
      "Analyze platform funnel metrics, feature adoption, and retention cohorts to steer prioritization."
    ],
    requirements: [
      "5+ years of software product management experience, preferably in B2B SaaS or HR Tech.",
      "Exceptional analytical rigor: proficiency in SQL, Amplitude, Mixpanel, and data storytelling.",
      "Proven ability to articulate clear product narratives to cross-functional executives and customers.",
      "Experience operating in fast-paced Agile/Scrum environments."
    ],
    niceToHave: [
      "Prior experience building recruitment, ATS, or human capital management products.",
      "Experience with international localization and SOC2/GDPR compliance workflows."
    ],
    techStack: ["Jira", "Productboard", "Figma", "SQL", "Amplitude", "Notion", "Mixpanel"],
    benefits: [
      "Remote-first team culture with twice-annual international retreats",
      "Full family healthcare coverage + $2,000 annual FSA support",
      "Executive coaching and professional leadership mentorship programs"
    ],
    hiringManager: {
      name: "David Kim",
      title: "VP of Product",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-06",
    title: "DevSecOps & Cloud Security Engineer",
    department: "Security",
    departmentIcon: "fa-solid fa-shield-halved",
    type: "Full-time",
    workMode: "Remote",
    location: "Seattle, WA (or North America Remote)",
    experience: "Senior",
    experienceYears: "5+ years",
    salaryMin: 165000,
    salaryMax: 205000,
    currency: "$",
    salaryFormatted: "$165,000 - $205,000",
    equity: "0.10% - 0.22%",
    postedDate: "5 days ago",
    dateTimestamp: "2026-11-08",
    deadline: "2026-12-30",
    urgent: false,
    featured: false,
    summary: "Protect critical enterprise data, automate zero-trust cloud infrastructure, and pioneer vulnerability defense pipelines across multi-cloud environments.",
    aboutRole: "Security is non-negotiable for enterprise customers. You will architect proactive threat detection, secure CI/CD shift-left tooling, and maintain SOC 2 Type II, ISO 27001, and HIPAA compliance readiness.",
    responsibilities: [
      "Embed automated SAST, DAST, and container security vulnerability scanning into GitHub Actions pipelines.",
      "Implement Zero Trust Network Access (ZTNA) policies, IAM least-privilege automation, and KMS key rotation.",
      "Perform regular architectural threat modeling and coordinate third-party penetration tests.",
      "Lead security incident response drills and automate remediation with AWS Security Hub and GuardDuty."
    ],
    requirements: [
      "5+ years in DevOps, SRE, or Cloud Infrastructure with at least 3 years dedicated to Cloud Security.",
      "Deep expertise in Kubernetes (EKS), Terraform, AWS IAM, Linux kernel security, and secrets management (Vault).",
      "Solid scripting proficiency in Python, Bash, or Go for security tool automation.",
      "Familiarity with compliance frameworks: SOC2, ISO 27001, FedRAMP, or GDPR."
    ],
    niceToHave: [
      "Industry certifications such as CISSP, CISM, AWS Security Specialty, or CKS.",
      "Experience with eBPF-based security monitoring (Tetragon, Falco)."
    ],
    techStack: ["Kubernetes", "AWS", "Terraform", "HashiCorp Vault", "GitHub Actions", "Snyk", "Datadog Security", "Python"],
    benefits: [
      "100% remote working model with flexible asynchronous working hours",
      "Unlimited paid time off + paid volunteer and open source days",
      "Comprehensive medical, dental, vision, life, and mental wellness coverage"
    ],
    hiringManager: {
      name: "Tariq Al-Mansoor",
      title: "Chief Information Security Officer (CISO)",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-07",
    title: "Growth Marketing Director",
    department: "Marketing",
    departmentIcon: "fa-solid fa-bullhorn",
    type: "Full-time",
    workMode: "Hybrid",
    location: "Chicago, IL (Hybrid: 2 days in office)",
    experience: "Lead & Staff",
    experienceYears: "7+ years",
    salaryMin: 145000,
    salaryMax: 175000,
    currency: "$",
    salaryFormatted: "$145,000 - $175,000",
    equity: "0.08% - 0.18%",
    postedDate: "3 days ago",
    dateTimestamp: "2026-11-10",
    deadline: "2026-12-25",
    urgent: false,
    featured: false,
    summary: "Scale demand generation, performance paid channels, and account-based marketing (ABM) pipelines to acquire high-value enterprise accounts.",
    aboutRole: "We are looking for a data-obsessed growth leader to spearhead customer acquisition, optimize multi-touch attribution, and scale pipeline velocity for our enterprise solutions.",
    responsibilities: [
      "Manage an annual marketing budget of $3M+ across paid search, LinkedIn, content syndication, and events.",
      "Partner with product marketing to launch high-converting targeted landing pages and case studies.",
      "Optimize enterprise conversion rates from website visitor through to Sales Qualified Lead (SQL).",
      "Lead and inspire a high-performing team of 5 growth marketers and external agency partners."
    ],
    requirements: [
      "7+ years of B2B SaaS growth marketing or demand generation experience.",
      "Proven track record scaling annual recurring revenue (ARR) from $20M to $60M+.",
      "Expertise with marketing automation (HubSpot, Marketo) and CRM integration (Salesforce).",
      "Advanced quantitative analysis skills, CAC/LTV modeling, and pipeline forecasting."
    ],
    niceToHave: [
      "Experience with product-led growth (PLG) transition models.",
      "Strong copywriting and organic SEO growth experimentation experience."
    ],
    techStack: ["HubSpot", "Salesforce", "Google Ads", "LinkedIn Campaign Manager", "Google Analytics 4", "Semrush"],
    benefits: [
      "Competitive base + quarterly performance bonus incentive structure",
      "Downtown Chicago luxury office with gym access and commuter transit passes",
      "401(k) with 5% employer contribution"
    ],
    hiringManager: {
      name: "Claire Bennett",
      title: "Chief Marketing Officer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-08",
    title: "Junior QA & Automation Engineer",
    department: "Engineering",
    departmentIcon: "fa-solid fa-vial-circle-check",
    type: "Full-time",
    workMode: "Remote",
    location: "Toronto, Canada (or Remote North America)",
    experience: "Entry-level",
    experienceYears: "1-2 years",
    salaryMin: 75000,
    salaryMax: 95000,
    currency: "$",
    salaryFormatted: "$75,000 - $95,000",
    equity: "0.05% - 0.10%",
    postedDate: "Just now",
    dateTimestamp: "2026-11-13",
    deadline: "2026-12-10",
    urgent: true,
    featured: false,
    summary: "Kickstart your career writing automated test suites, expanding test coverage, and validating accessible user journeys across mobile and desktop platforms.",
    aboutRole: "An exceptional opportunity for an enthusiastic early-career engineer passionate about software quality, automated regression testing, and accessibility verification. You will be closely mentored by senior QA leads.",
    responsibilities: [
      "Write and maintain end-to-end automated tests using Playwright and TypeScript.",
      "Execute manual exploratory testing and accessibility audits (screen reader testing with NVDA/VoiceOver).",
      "Document clear, reproducible bug tickets in Jira with network logs and reproduction steps.",
      "Participate in daily standups and sprint planning to advocate for testability early in the lifecycle."
    ],
    requirements: [
      "1-2 years of software testing experience or degree in Computer Science/Software Engineering.",
      "Basic programming proficiency in JavaScript or TypeScript.",
      "Familiarity with web testing tools like Playwright, Cypress, or Selenium.",
      "Strong attention to detail, curious problem-solving mindset, and clear communication skills."
    ],
    niceToHave: [
      "Experience running accessibility tests using axe-core or Lighthouse.",
      "Knowledge of Git, GitHub Actions, and continuous integration workflows."
    ],
    techStack: ["Playwright", "TypeScript", "Jest", "Axe-core", "Jira", "GitHub Actions", "Postman"],
    benefits: [
      "Mentorship program paired with a dedicated Principal Quality Architect",
      "$2,000 annual learning and certification allowance (ISTQB, etc.)",
      "Full health & dental plan + home office allowance"
    ],
    hiringManager: {
      name: "Nathan Drake",
      title: "Quality Engineering Lead",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-09",
    title: "Senior Talent Acquisition Partner (Tech)",
    department: "People & HR",
    departmentIcon: "fa-solid fa-users",
    type: "Full-time",
    workMode: "Remote",
    location: "Global Remote",
    experience: "Mid-level",
    experienceYears: "3-5 years",
    salaryMin: 95000,
    salaryMax: 125000,
    currency: "$",
    salaryFormatted: "$95,000 - $125,000",
    equity: "0.05% - 0.12%",
    postedDate: "6 days ago",
    dateTimestamp: "2026-11-07",
    deadline: "2026-12-15",
    urgent: false,
    featured: false,
    summary: "Drive high-impact technical recruiting, architect equitable hiring rubrics, and deliver extraordinary candidate experiences.",
    aboutRole: "Our company is entering an exciting hypergrowth phase. You will partner directly with Engineering and Design executives to source, interview, and close world-class talent across global timezones.",
    responsibilities: [
      "Manage full lifecycle recruitment for technical and leadership positions from sourcing to offer closing.",
      "Design structured interview scorecards to reduce unconscious bias and increase hiring signal.",
      "Deliver transparent, respectful, and empathetic communication to all candidates at every stage.",
      "Track and report on pipeline health metrics, offer acceptance rates, and diversity hiring goals."
    ],
    requirements: [
      "3-5 years of full-cycle technical recruiting experience in high-growth technology environments.",
      "Demonstrated ability to source and attract passive software engineering and design talent.",
      "Deep understanding of technical terminology, engineering levels, and competitive equity packages.",
      "Superb interpersonal skills and commitment to diversity, equity, and inclusion."
    ],
    niceToHave: [
      "Experience with modern ATS platforms (Greenhouse, Lever, Ashby).",
      "Experience managing global remote employment logistics and contractor transitions."
    ],
    techStack: ["Ashby ATS", "LinkedIn Recruiter", "Gem", "Slack", "Google Workspace", "Notion"],
    benefits: [
      "Flexible remote schedule across your preferred timezone",
      "Generous quarterly placement bonuses",
      "Full health, dental, and retirement plan"
    ],
    hiringManager: {
      name: "Rachel Morris",
      title: "Head of People & Culture",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-10",
    title: "Staff Data Platform Engineer",
    department: "Data & AI",
    departmentIcon: "fa-solid fa-database",
    type: "Full-time",
    workMode: "On-site",
    location: "Zurich, Switzerland",
    experience: "Lead & Staff",
    experienceYears: "8+ years",
    salaryMin: 195000,
    salaryMax: 245000,
    currency: "$",
    salaryFormatted: "$195,000 - $245,000",
    equity: "0.15% - 0.28%",
    postedDate: "1 week ago",
    dateTimestamp: "2026-11-06",
    deadline: "2026-12-31",
    urgent: false,
    featured: false,
    summary: "Lead the design of petabyte-scale data lakes, streaming architectures, and real-time data governance for international compliance.",
    aboutRole: "Based in our European headquarters in Zurich, you will govern the backbone of our enterprise telemetry and analytical infrastructure supporting millions of concurrent operations.",
    responsibilities: [
      "Architect and scale distributed data pipelines using Apache Spark, Flink, and Snowflake.",
      "Implement real-time change data capture (CDC) pipelines and data mesh domain architectures.",
      "Guarantee strict compliance with Swiss Federal Data Protection Act (FADP) and GDPR regulations.",
      "Mentor senior data engineers and collaborate with ML research teams on feature store engineering."
    ],
    requirements: [
      "8+ years architecting enterprise distributed data processing platforms.",
      "Extensive experience with Apache Kafka, Spark, Snowflake, dbt, and Delta Lake.",
      "Strong proficiency in Scala, Python, or Rust, along with advanced SQL optimization.",
      "Fluency in English; German or French is a plus."
    ],
    niceToHave: [
      "Experience with Iceberg table formats and Trino query engines.",
      "Experience building automated data quality and observability monitors (Great Expectations, Monte Carlo)."
    ],
    techStack: ["Snowflake", "Apache Spark", "Kafka", "dbt", "Airflow", "Python", "Scala", "Kubernetes"],
    benefits: [
      "Prestigious central Zurich office overlooking Lake Zurich",
      "Full Swiss pension scheme contribution (BVG) + top private health insurance supplement",
      "Annual Swiss SBB First-Class Generalabonnement (GA) travel card",
      "6 weeks annual paid holiday"
    ],
    hiringManager: {
      name: "Lukas Weber",
      title: "VP of Data & Infrastructure",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-11",
    title: "Frontend Engineering Intern (Summer 2027)",
    department: "Engineering",
    departmentIcon: "fa-solid fa-graduation-cap",
    type: "Internship",
    workMode: "Remote",
    location: "Global Remote (North America / EMEA)",
    experience: "Entry-level",
    experienceYears: "Student / Early Career",
    salaryMin: 45000,
    salaryMax: 60000,
    currency: "$",
    salaryFormatted: "$45,000 - $60,000 (Annualized)",
    equity: "N/A",
    postedDate: "2 days ago",
    dateTimestamp: "2026-11-11",
    deadline: "2026-12-15",
    urgent: true,
    featured: false,
    summary: "A high-impact 12-week paid internship working directly with our UI Engineering team on accessible web components and interactive data tools.",
    aboutRole: "Our internship program is designed to provide real-world, production-level engineering experience with dedicated 1-on-1 mentorship. You will write code that ships to production within your first two weeks.",
    responsibilities: [
      "Develop reusable, accessible UI components adhering to WCAG 2.1 AA criteria.",
      "Collaborate with UI designers to transform interactive Figma designs into responsive HTML/CSS/JavaScript.",
      "Write unit tests and documentation for open-source component libraries.",
      "Present a capstone project to the company engineering all-hands."
    ],
    requirements: [
      "Currently enrolled in or recent graduate of a Computer Science, Web Development, or related bootcamp/degree.",
      "Solid understanding of HTML5, CSS3, modern JavaScript (ES6+), and basic React fundamentals.",
      "Passion for building accessible, visually appealing, and user-centric web applications.",
      "Available for a 12-week full-time internship starting May/June 2027."
    ],
    niceToHave: [
      "Personal GitHub projects or live portfolio demonstrating responsive design.",
      "Familiarity with Git branching, pull requests, and CSS Tailwind or Sass."
    ],
    techStack: ["HTML5", "CSS3", "JavaScript", "React", "Git", "Figma", "Tailwind CSS"],
    benefits: [
      "Competitive hourly compensation ($35/hr) + $1,000 remote setup stipend",
      "Dedicated senior engineer mentor for weekly guidance and career coaching",
      "Direct pathway to full-time junior engineering return offers upon graduation",
      "Executive AMA sessions, tech talks, and intern cohort social events"
    ],
    hiringManager: {
      name: "Marcus Vance",
      title: "VP of Engineering",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    }
  },
  {
    id: "job-12",
    title: "Senior UI/UX Design Contractor",
    department: "Design",
    departmentIcon: "fa-solid fa-compass-drafting",
    type: "Contract",
    workMode: "Remote",
    location: "Remote Worldwide",
    experience: "Senior",
    experienceYears: "5+ years",
    salaryMin: 120000,
    salaryMax: 150000,
    currency: "$",
    salaryFormatted: "$75 - $95 / hour ($120k - $150k eq.)",
    equity: "N/A",
    postedDate: "4 days ago",
    dateTimestamp: "2026-11-09",
    deadline: "2026-12-05",
    urgent: false,
    featured: false,
    summary: "6-month contract with possibility of extension to craft high-conversion recruitment landing pages, career dashboards, and mobile responsive flows.",
    aboutRole: "Work flexibly with our core product squad to redesign key public-facing candidate touchpoints, onboarding wizards, and interactive assessment modules.",
    responsibilities: [
      "Deliver rapid high-fidelity wireframes, interactive user flows, and prototypes in Figma.",
      "Conduct rapid usability testing on form accessibility, microcopy, and CTA conversion.",
      "Deliver spec sheets and asset packages to frontend engineering teams.",
      "Refine design system components to ensure compliance with responsive breakpoints."
    ],
    requirements: [
      "5+ years of UI/UX design experience focusing on conversion-focused web applications.",
      "Extensive Figma expertise including autolayout, variables, component properties, and interactive prototyping.",
      "Strong portfolio demonstrating user-centric layout architecture and typography craftsmanship."
    ],
    niceToHave: [
      "Experience with Webflow or Framer implementation.",
      "Knowledge of A/B testing methodologies and heatmaps (Hotjar / FullStory)."
    ],
    techStack: ["Figma", "FigJam", "Miro", "Hotjar", "Lottie", "HTML/CSS basics"],
    benefits: [
      "Flexible asynchronous hourly engagement (30-40 hours per week)",
      "Direct contract billing with weekly or bi-weekly disbursement",
      "Opportunity for long-term contract extension or full-time conversion"
    ],
    hiringManager: {
      name: "Julian Rivera",
      title: "Head of Product Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  }
];

const PLATFORM_METRICS = {
  activeJobs: 12,
  departmentsCount: 5,
  globalHubs: 8,
  applicantsPlaced: "4,850+",
  avgResponseTime: "48 hours",
  satisfactionRate: "98.6%"
};

const COMPANY_BENEFITS = [
  {
    icon: "fa-solid fa-laptop-code",
    title: "Remote-First Flexibility",
    description: "Work from anywhere with asynchronous hours, home office stipends, and global coworking passes."
  },
  {
    icon: "fa-solid fa-heart-pulse",
    title: "Comprehensive Wellness",
    description: "100% employer-covered top-tier medical, dental, and vision insurance for you and your dependents."
  },
  {
    icon: "fa-solid fa-piggy-bank",
    title: "401(k) & Wealth Building",
    description: "Up to 6% immediate 401(k) matching alongside competitive equity ownership grants with early exercise."
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Continuous Learning",
    description: "$3,000 annual personal growth budget for conferences, courses, books, and professional coaching."
  },
  {
    icon: "fa-solid fa-umbrella-beach",
    title: "Recharge & Family Leave",
    description: "Generous flexible PTO with a mandatory 3-week minimum recharge policy plus 18 weeks paid parental leave."
  },
  {
    icon: "fa-solid fa-sparkles",
    title: "Modern Tech Ecosystem",
    description: "Top-tier M3 Max MacBooks or Dell XPS machines, premium mechanical peripherals, and cloud tooling."
  }
];

const CULTURE_TESTIMONIALS = [
  {
    quote: "TalentForge has built the most transparent and empowering engineering culture I've ever experienced. Architecture decisions are collaborative, and accessibility is treated as a first-class citizen.",
    author: "Elena Rostova",
    role: "Chief AI Scientist",
    company: "TalentForge",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "From day one, the onboarding experience was seamless. The multi-stage application process was respectful of my time, with clear feedback at every step.",
    author: "Marcus Vance",
    role: "VP of Engineering",
    company: "TalentForge",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  }
];

// Export to window
window.JOB_DATA = JOB_DATA;
window.PLATFORM_METRICS = PLATFORM_METRICS;
window.COMPANY_BENEFITS = COMPANY_BENEFITS;
window.CULTURE_TESTIMONIALS = CULTURE_TESTIMONIALS;

