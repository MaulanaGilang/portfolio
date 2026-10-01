// Single source of truth for all site copy. Edit here, not in components.
// Copy rule: no em or en dashes anywhere visible. Ranges use " - ".

export const profile = {
  name: "Gilang Maulana",
  role: "Data Analyst",
  target: "Data Engineer",
  location: "Tuban, East Java",
  availability: "Open to remote work and relocation",
  intro: "I turn messy operational data into pipelines, warehouses and dashboards teams can trust.",
  email: "maulana.gilang305@gmail.com",
  github: "https://github.com/MaulanaGilang",
  linkedin: "https://www.linkedin.com/in/gilang-maulanatbn",
  resume: "https://drive.google.com/file/d/1ZFC5LHz7g-cqFpqVPUEH24qFVV7MBsY8/view?usp=sharing",
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
];

export const about = {
  // Display headline; the first line is indented like Lusion's "Bold Ideas, / Brought to Life".
  headline: ["Raw data in,", "trusted data out."],
  // Lead paragraph. Words wrapped in * * render in indigo.
  statement:
    "I started by fixing how a company tracked *3,000 tickets* and *1,000 assets*. Now I build the *pipelines* underneath the dashboards.",
  paragraphs: [
    "At Rata.id I grew from General Services Analyst to IT & Maintenance Analyst, replacing ad hoc operations with automated, data-driven workflows. Ticket triage went from manual review to five minutes a day, and legacy processes went from minutes to seconds.",
    "I studied Computer Engineering at ITS, trained as a Cloud Engineer at Bangkit Academy and finished RevoU's Full-Stack Data Analytics program. Since then I've studied data engineering through DataCamp's Data Engineer path, from SQL and Python pipelines to PySpark, Databricks, Docker and Kubernetes. Today I'm focused on data engineering: modelling warehouses, writing reliable ETL and making clean data easy to use.",
  ],
  facts: [
    { label: "Based in", value: "Tuban, East Java, Indonesia" },
    { label: "Open to", value: "Remote and relocation" },
    { label: "Focus", value: "SQL, Python, Cloud, Data Warehousing" },
    { label: "Degree", value: "B.Eng. Computer Engineering, ITS" },
  ],
};

export type Role = {
  title: string;
  subtitle?: string;
  period: string;
  duration: string;
  points: string[];
  tags?: string[];
};

export type Company = {
  org: string;
  logo: string;
  type: string;
  total: string;
  location: string;
  roles: Role[];
};

// Grouped like LinkedIn: one entry per organisation, newest first.
export const experience: Company[] = [
  {
    org: "Rata.id",
    logo: "/logos/rata.png",
    type: "Contract",
    total: "1 yr 1 mo",
    location: "South Jakarta, Indonesia · On-site",
    roles: [
      {
        title: "IT & Maintenance Analyst",
        period: "May 2026 - Jul 2026",
        duration: "3 mos",
        points: [
          "Introduced data-driven purchase requisition planning and budget tracking for the IT & Maintenance department, replacing ad hoc buying with an evidence-based purchasing process.",
          "Rebuilt legacy ticketing and asset management systems into automated workflows, cutting processing time from minutes to seconds, and expanded ticketing to capture field-found issues before formal submission.",
          "Managed IT and furniture/electrical asset databases end to end (about 1,000 assets), introducing consistent asset tagging for the first time.",
          "Maintained weekly leadership reporting and tracked vendor performance across facility operations.",
        ],
        tags: ["JavaScript", "Power BI", "Excel"],
      },
      {
        title: "General Services Analyst",
        period: "Jul 2025 - Apr 2026",
        duration: "10 mos",
        points: [
          "Built and optimized a company-wide ticketing dashboard covering 3,000 tickets across all departments, cutting daily issue tracking from manual review to 5 minutes.",
          "Designed automated JavaScript systems for room booking, furniture/electrical assets and IT stock opname, cutting stock opname time to 15 minutes.",
          "Analyzed maintenance travel budgets and site-level incident data (leakage, pest, power failure), building dashboards that helped reduce incident recurrence by an estimated 10%.",
          "Delivered weekly report presentations and streamlined office logistics scheduling.",
        ],
        tags: ["JavaScript", "Power BI", "Excel"],
      },
    ],
  },
  {
    org: "RevoU",
    logo: "/logos/revou.png",
    type: "Freelance",
    total: "3 mos",
    location: "Jakarta, Indonesia · Remote",
    roles: [
      {
        title: "Data Analyst Associate",
        subtitle: "Virtual Internship RevoU x Hasna Medika",
        period: "Apr 2025 - May 2025",
        duration: "2 mos",
        points: [
          "Developed HR, employee and medical services dashboards in Power BI to help monitor performance and spending.",
          "Analyzed 700K+ hospital records using Excel and Python to identify workforce and pharmacy issues.",
          "Delivered insights and recommendations to improve HR efficiency and chronic drug cost control.",
          "Worked closely with RevoU mentors and the Hasna Medika team, earning a Certificate of Excellence.",
        ],
        tags: ["Power BI", "Python", "Excel"],
      },
      {
        title: "Data Analyst Associate",
        subtitle: "RevoU Data Insight Project",
        period: "Mar 2025 - Apr 2025",
        duration: "2 mos",
        points: [
          "Analyzed user behavior on an e-commerce platform using SQL and Tableau, leading to a 15% boost in checkout completion.",
          "Improved data processing with BigQuery and window functions to extract key patterns from loan and user activity data.",
          "Segmented users by behavior and profile (traffic source, income) to improve marketing and credit strategies.",
          "Presented 8+ recommendations to improve UX, conversion rates and loan repayment performance (TKB30).",
        ],
        tags: ["SQL", "BigQuery", "Tableau"],
      },
    ],
  },
  {
    org: "LAB MIOT (Multimedia and Internet of Things)",
    logo: "/logos/miot.png",
    type: "Freelance",
    total: "1 yr",
    location: "Surabaya, Indonesia · On-site",
    roles: [
      {
        title: "Laboratory Assistant",
        period: "Jun 2023 - May 2024",
        duration: "1 yr",
        points: [
          "Assisted in telematics projects and programming practicals across three majors.",
          "Designed and managed digital assets using Figma, keeping delivery and workflows efficient.",
        ],
        tags: ["Big Data", "Figma", "UI Design"],
      },
    ],
  },
  {
    org: "Bangkit Academy",
    logo: "/logos/bangkit.png",
    type: "Apprenticeship",
    total: "6 mos",
    location: "Surabaya, Indonesia · Remote",
    roles: [
      {
        title: "Cloud Engineer",
        subtitle: "Led by Google, Tokopedia, Gojek & Traveloka",
        period: "Jan 2023 - Jun 2023",
        duration: "6 mos",
        points: [
          "Drove mobile app development for tourism information, achieving 90% of target features while tracking progress with Trello.",
          "Built a secure backend for user data management by integrating TypeScript, Google Cloud Platform and a Firebase database.",
        ],
        tags: ["GCP", "Firebase", "TypeScript", "Docker"],
      },
    ],
  },
];

export type Education = {
  school: string;
  logo: string;
  program: string;
  period: string;
  points: string[];
};

// Newest first.
export const education: Education[] = [
  {
    school: "RevoU",
    logo: "/logos/revou.png",
    program: "Full-Stack Data Analytics",
    period: "Sep 2024 - Jan 2025",
    points: [
      "Hands-on program applying Python, SQL and Tableau to real business problems.",
      "Case study: analyzed credit card applicant data and delivered recommendations projected to reduce fraud risk by 33%.",
    ],
  },
  {
    school: "Bangkit Academy",
    logo: "/logos/bangkit.png",
    program: "Cloud Computing Learning Path",
    period: "Jan 2023 - Jun 2023",
    points: [
      "Career-readiness program led by Google, Tokopedia, Gojek and Traveloka.",
      "Covered Google Cloud architecture, backend APIs, containers and deployment, finishing with the FIT tourism app capstone.",
    ],
  },
  {
    school: "Sepuluh Nopember Institute of Technology (ITS)",
    logo: "/logos/its.png",
    program: "Bachelor of Computer Engineering",
    period: "Aug 2020 - Sep 2024",
    points: [
      "GPA 3.4.",
      "Final-year project: a 2D convolutional neural network that detects air gaps in concrete from GPRMax simulation data, with a web platform to visualize detections.",
    ],
  },
];

export type ProjectCategory = "Data Engineering" | "Data Analytics" | "Cloud Computing";

export const projectCategories: ProjectCategory[] = ["Data Engineering", "Data Analytics", "Cloud Computing"];

export type Project = {
  slug: string;
  category: ProjectCategory;
  title: string;
  context: string;
  year: string;
  cover: string;
  /** One line on the card. */
  short: string;
  overview: string;
  problem: string;
  approach: string[];
  result: string;
  tools: string[];
  links: { label: string; href: string }[];
  /** Optional real artefacts (diagrams, screenshots) shown on the case-study page. */
  figures?: { src: string; alt: string; caption: string; width: number; height: number }[];
  /** Renders the Bronze → Silver → Gold lineage component on the case-study page. */
  lineage?: boolean;
};

export const projects: Project[] = [
  {
    slug: "sql-data-warehouse",
    category: "Data Engineering",
    title: "SQL Data Warehouse",
    context: "Personal project",
    year: "2026",
    cover: "/projects/sql-data-warehouse-photo.webp",
    short: "A Medallion-architecture warehouse in SQL Server that merges ERP and CRM sales data into a star schema.",
    overview:
      "A modern data warehouse that consolidates sales data from two source systems (ERP and CRM) into one analytics-ready model, built end to end in SQL Server with T-SQL.",
    problem:
      "Sales data lived in two systems exported as CSV files, with inconsistent keys, formats and quality issues. Analysts needed one trusted model to answer questions about customers, products and sales trends.",
    approach: [
      "Designed a Medallion architecture: Bronze for raw ingestion, Silver for cleansed and standardized data, Gold for business-ready views.",
      "Wrote stored procedures that batch-load six CSV source tables into Bronze with truncate and BULK INSERT, logging each load duration.",
      "Cleaned and standardized data in Silver: deduplicated customers with ROW_NUMBER, derived product end dates with LEAD, nulled invalid dates and recalculated inconsistent sales amounts.",
      "Modelled the Gold layer as a star schema (fact_sales, dim_customers, dim_products) and added quality-check scripts for Silver and Gold.",
    ],
    result:
      "A documented warehouse with repeatable ETL, data-quality tests and SQL analytics (magnitude and ranking analysis) on customers, products and sales.",
    tools: ["SQL Server", "T-SQL", "ETL", "Data Modeling", "Star Schema", "Draw.io"],
    links: [{ label: "View on GitHub", href: "https://github.com/MaulanaGilang/sql_data_warehouse_project" }],
    figures: [
      {
        src: "/projects/sql-warehouse/architecture.jpg",
        alt: "Data architecture diagram: CRM and ERP CSV sources flow into Bronze, Silver and Gold layers, then to BI, ad-hoc SQL and machine learning consumers.",
        caption: "Data architecture, from the repository docs.",
        width: 1222,
        height: 421,
      },
    ],
    lineage: true,
  },
  {
    slug: "fraud-applicant-analysis",
    category: "Data Analytics",
    title: "Fraud Applicant Analysis",
    context: "RevoU case study · Reserve Bank of India data",
    year: "2025",
    cover: "/projects/fraud-applicant-analysis-photo.webp",
    short: "Clustering and an ML model on 300K credit card applicants to reduce fraud risk.",
    overview:
      "Credit card fraud cases in India are rising every year. The goal was to help cut fraud cases for the next fiscal year by 40%.",
    problem:
      "300K applicant records with mixed quality, no segmentation and no early signal for which applicants were likely to be fraudulent.",
    approach: [
      "Cleaned and explored the applicant datasets in Python on Google Colab.",
      "Clustered applicants into risk segments based on income and credit history.",
      "Trained a machine learning model to predict fraud-prone applicants.",
      "Built a Tableau dashboard to communicate the segments and risk drivers.",
    ],
    result:
      "77% of the 300K applicants were at higher fraud risk due to low income and poor credit card history. Recommendations were projected to reduce fraud risk by 33%.",
    tools: ["Python", "Pandas", "Google Colab", "Machine Learning", "Tableau"],
    links: [
      { label: "View presentation", href: "https://drive.google.com/file/d/1ImCNWW0CVJex7Th5pOS2XGzHiEhEyZGU/view?usp=sharing" },
    ],
  },
  {
    slug: "hr-specialist-monitoring",
    category: "Data Analytics",
    title: "Employee & Specialist Monitoring",
    context: "Virtual internship · Hasna Medika Group",
    year: "2025",
    cover: "/projects/hr-specialist-monitoring-photo.webp",
    short: "Power BI dashboards that show HR productivity across a cardiac hospital group.",
    overview:
      "Hasna Medika Group, a network of heart hospitals, struggled to monitor HR productivity and wanted to make faster, better decisions about its workforce.",
    problem:
      "No single view of employee and specialist performance across branches, and 700K+ hospital records spread across sources.",
    approach: [
      "Queried and prepared employee, specialist and patient data with SQL and spreadsheets.",
      "Defined performance and workload metrics per branch, including specialist-to-patient ratio and turnover.",
      "Built HR, employee and medical services dashboards in Power BI.",
      "Presented findings and recommendations to the Hasna Medika team with RevoU mentors.",
    ],
    result:
      "Found high turnover in some branches and a high specialist-to-patient ratio overall. Recommended recruiting more specialists and replicating practices from the top-performing branch. Awarded a Certificate of Excellence.",
    tools: ["SQL", "Spreadsheet", "Power BI", "Python"],
    links: [
      { label: "View presentation", href: "https://drive.google.com/file/d/1neBPG9Yr5_2YKrXKNZ-MmXanV3XQAySD/view?usp=sharing" },
    ],
  },
  {
    slug: "cohort-analysis-revofin",
    category: "Data Analytics",
    title: "Cohort Analysis",
    context: "RevoU case study · RevoFin lending app",
    year: "2025",
    cover: "/projects/cohort-analysis-revofin-photo.webp",
    short: "Borrower cohorts in SQL and Tableau to lift the TKB30 repayment rate toward 100%.",
    overview:
      "RevoFin wanted to grow its lending business by understanding the financial health of its borrowers, raising TKB30 (loans repaid within 30 days of due date) from 99% to 100%.",
    problem:
      "Loan and user activity data had no cohort view, so it was unclear which borrower profiles and loan purposes drove healthy repayment.",
    approach: [
      "Built borrower cohorts in BigQuery using window functions over loan and user activity data.",
      "Compared repayment behaviour across employment length, interest rate and loan purpose.",
      "Visualized cohort patterns and trends in Tableau.",
    ],
    result:
      "Healthy borrowers skew toward long employment and higher interest rates, borrowing mainly for debt consolidation and credit cards. Recommended focusing lending on stable jobs and promoting debt-related loans.",
    tools: ["SQL", "BigQuery", "Window Functions", "Tableau"],
    links: [
      { label: "View presentation", href: "https://drive.google.com/file/d/1oHS0AYKjSjY2bO_-hhBgqvSyqSSpkoVa/view?usp=sharing" },
    ],
  },
  {
    slug: "fit-tourism-backend",
    category: "Cloud Computing",
    title: "FIT Tourism Backend",
    context: "Bangkit Academy capstone · Cloud Engineer",
    year: "2023",
    cover: "/projects/fit-tourism-backend-photo.webp",
    short: "Firestore database, REST API endpoints and a Docker image for a tourism discovery app.",
    overview:
      "FIT (Find Indonesian Tourism) helps travellers discover destinations across Indonesia's islands. As the team's Cloud Engineer I owned the database and the backend.",
    problem:
      "The mobile app needed user accounts, searchable destination data and island-level listings, backed by a database that could be seeded from raw JSON.",
    approach: [
      "Modelled users, search history, islands and a labelled review dataset in Firestore, and wrote a Python loader that seeded 2,867 review texts from raw JSON.",
      "Built an Express + TypeScript API with endpoints for register, login, profile update, search history, destination search, island listings and popular attractions, backed by the Google Places API.",
      "Secured user flows with JWT and connected the service to Firebase through the Admin SDK.",
      "Containerized the API with Docker for deployment on Google Cloud.",
    ],
    result:
      "A working backend with 10 endpoints serving the FIT mobile app, delivering 90% of the target features.",
    tools: ["Firestore", "Firebase Admin", "Express", "TypeScript", "JWT", "Google Places API", "Python", "Docker", "GCP"],
    links: [
      { label: "View on GitHub", href: "https://github.com/BangkitCapstoneFIT/AllBackend" },
      { label: "Capstone organization", href: "https://github.com/BangkitCapstoneFIT" },
    ],
  },
];

export type Skill = { name: string; icon?: string };

// icon = file in /public/skills (simple-icons, monochrome). No icon = generic database glyph.
export const skills: { group: string; items: Skill[] }[] = [
  {
    group: "Data Engineering",
    items: [
      { name: "SQL Server", icon: "sqlserver" },
      { name: "BigQuery", icon: "bigquery" },
      { name: "PySpark", icon: "spark" },
      { name: "Databricks", icon: "databricks" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
    ],
  },
  {
    group: "Analytics & BI",
    items: [
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Jupyter", icon: "jupyter" },
      { name: "Tableau", icon: "tableau" },
      { name: "Power BI", icon: "powerbi" },
      { name: "Excel", icon: "excel" },
      { name: "Google Sheets", icon: "sheets" },
    ],
  },
  {
    group: "Cloud & Backend",
    items: [
      { name: "Google Cloud", icon: "gcp" },
      { name: "Firebase", icon: "firebase" },
      { name: "Azure", icon: "azure" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
    ],
  },
  {
    group: "Languages & Tools",
    items: [
      { name: "SQL" },
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Git", icon: "git" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

export type Certification = {
  name: string;
  date: string;
  credentialId?: string;
  href?: string;
  skills?: string[];
};

const datacamp = (id: string) => `https://www.datacamp.com/statement-of-accomplishment/track/${id}`;

// Grouped by issuer, newest first.
export const certifications: { issuer: string; logo: string; items: Certification[] }[] = [
  {
    issuer: "DataCamp",
    logo: "/logos/datacamp.png",
    items: [
      {
        name: "Professional Data Engineer in Python",
        date: "Sep 2026",
        credentialId: "34906b7574ad34eb2e20ebd6022f71c47f69c740",
        href: datacamp("34906b7574ad34eb2e20ebd6022f71c47f69c740"),
        skills: ["Python", "Kubernetes", "Docker", "Cloud Computing"],
      },
      {
        name: "Associate Data Engineer in Databricks",
        date: "Sep 2026",
        credentialId: "f787898a6d52fefd0c2b1a812423a379bbc1c8b0",
        href: datacamp("f787898a6d52fefd0c2b1a812423a379bbc1c8b0"),
        skills: ["PySpark", "Azure Databricks"],
      },
      {
        name: "Data Engineer in Python",
        date: "Sep 2026",
        credentialId: "78590e82b197bfbf00b39185c04e7e2bb44e6491",
        href: datacamp("78590e82b197bfbf00b39185c04e7e2bb44e6491"),
        skills: ["Python"],
      },
      {
        name: "Associate Data Engineer in SQL",
        date: "Sep 2026",
        credentialId: "95be977ae7fe0f2a0210fc9630367e7513a42f27",
        href: datacamp("95be977ae7fe0f2a0210fc9630367e7513a42f27"),
        skills: ["SQL"],
      },
    ],
  },
  {
    issuer: "RevoU",
    logo: "/logos/revou.png",
    items: [
      {
        name: "Full-Stack Data Analyst",
        date: "Jan 2025",
        credentialId: "FSDA-2025-01-22574524541",
        skills: ["Spreadsheets", "SQL", "Python", "Data Visualization", "Statistics", "Business Understanding"],
      },
      {
        name: "Data Analytics Mini Course",
        date: "Sep 2024",
        credentialId: "DAMC-160924-01-1-00756",
      },
    ],
  },
  {
    issuer: "ETS",
    logo: "/logos/ets.png",
    items: [
      {
        name: "TOEFL ITP",
        date: "May 2024",
        href: "https://drive.google.com/file/d/1gtyPbVl-RYzuDLxRrT25si-5Jq5jvQJt/view?usp=sharing",
        skills: ["English"],
      },
    ],
  },
  {
    issuer: "Bangkit Academy",
    logo: "/logos/bangkit.png",
    items: [
      {
        name: "Cloud Engineer Program",
        date: "Jul 2023",
        skills: ["Google Cloud", "TypeScript", "Firebase", "Docker"],
      },
    ],
  },
];
