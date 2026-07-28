export const profile = {
    name: "Shanmukh Yenikapati",
    role: "Senior Software Engineer",
    location: "Charlotte, NC",
    email: "shanmukhaditya9@gmail.com",
    phone: "+1 551 6896998",
    linkedin: "https://linkedin.com/in/shanmukh-y",
    github: "https://github.com/shanmukhaditya",
    leetcode: "https://leetcode.com/u/shanmukhaditya9/",
    resumeUrl: "/Shanmukh-Yenikapati.pdf",
    summary: "Senior Software Engineer specializing in agentic AI, production LLM systems, and AI infrastructure. Architected and built an enterprise-scale multi-agent platform from scratch (0-to-1) serving 400K+ weekly visits. Deep experience in RAG, context engineering, and integrating AI workflows into production platforms."
};

// Featured Projects
export const featuredProjects = [
    {
        title: "JustNutrition",
        tagline: "Log any meal in under 5 seconds",
        description: "An Apple-first nutrition tracking application built with a native iOS aesthetic matching Apple Health. Engineered with a feature-first modular architecture, local-first database persistence via SwiftData, offline sync with a Supabase cloud backend, and real-time CoreLocation menu recommendations.",
        tech: ["Swift 6", "SwiftUI", "SwiftData", "Swift Charts", "Supabase", "XcodeGen"],
        testflightUrl: "https://testflight.apple.com/join/wH2sehwk",
        logo: "/justnutrition.png",
        colors: {
            primary: '#10B981',
            secondary: '#34D399',
            accent: '#059669',
            gradient: 'linear-gradient(135deg, #10B981, #34D399, #059669)',
            rgbaPrimary: 'rgba(16, 185, 129, 0.4)',
            rgbaPrimaryLight: 'rgba(16, 185, 129, 0.08)',
            rgbaPrimaryBorder: 'rgba(16, 185, 129, 0.2)'
        },
        metrics: [
            { label: "Logging Time", value: "< 5s", icon: "zap" },
            { label: "Platform", value: "iOS Native", icon: "smartphone" },
            { label: "Offline Cache", value: "SwiftData", icon: "database" },
            { label: "Cloud Sync", value: "Supabase", icon: "server" }
        ],
        highlights: [
            "Modern Swift 6 & SwiftUI architecture using the Observation framework for reactive state binding",
            "Feature-First structural layout enforcing modular isolation of features (Today, FoodSearch, Nearby, Barcode, and Kitchen)",
            "Dynamic 'Nearby' Recommendations: Uses CoreLocation and MapKit to scan local chain restaurants (5km radius) and suggest macro-aligned meals with shame-free targets (e.g. 'Fits with buffer', 'Protein boost')",
            "Intelligent Menu Customization: Pulls menu and nutritional details dynamically from a synced database including Chipotle, sweetgreen, Panera Bread, CAVA, and others",
            "Built-in offline persistence via SwiftData cached with remote Supabase cloud databases",
            "High-performance native Swift Charts visualization for user progress and daily macro tracking",
            "Photo-logging flow integrated with Supabase Edge Functions for automated meal analysis"
        ]
    },
    {
        title: "Squadfire",
        tagline: "Join the squad, Rise together",
        description: "Collaborative task management platform with gamification, automated scheduling, and real-time leaderboards. Features async Python backend, HTMX-powered UI, and multi-strategy task distribution.",
        tech: ["Python", "FastAPI", "PostgreSQL", "HTMX", "Tailwind CSS", "Docker"],
        liveUrl: "https://squadfire.shanmukh.dev",
        githubUrl: "https://github.com/shanmukhaditya/squadfire",
        logo: "/squadfire.png",
        colors: {
            primary: '#D97B4A',
            secondary: '#E8A46C',
            accent: '#C26B42',
            gradient: 'linear-gradient(135deg, #D97B4A, #E8A46C, #C26B42)',
            rgbaPrimary: 'rgba(217, 123, 74, 0.4)',
            rgbaPrimaryLight: 'rgba(217, 123, 74, 0.08)',
            rgbaPrimaryBorder: 'rgba(217, 123, 74, 0.2)'
        },
        metrics: [
            { label: "Async Coverage", value: "100%", icon: "zap" },
            { label: "Bulk Import", value: "Tab/CSV", icon: "server" },
            { label: "Threaded Comments", value: "∞ Depth", icon: "code" },
            { label: "Database Schemas", value: "20+", icon: "database" }
        ],
        highlights: [
            "Fully async Python backend with PostgreSQL AsyncSession",
            "Task scheduling engine supporting 4 cycle types (daily, interval, weekly, rotating) via cron jobs",
            "Task Pools with 4 distribution strategies for automated backlog allocation",
            "Analytics middleware with GeoIP enrichment and GDPR-compliant IP anonymization",
            "Email notification service with async SMTP and dynamic leaderboard image generation (Pillow)"
        ]
    }
];

export const experience = [
    {
        company: "Lowe's Companies Inc",
        role: "Senior Software Engineer",
        location: "Charlotte, NC",
        period: "05/2024 - Present",
        description: [
            "One of two core contributors who architected and built a highly-optimized agentic AI platform from scratch, orchestrating LLMs and multi-agent workflows for production systems serving 373K+ unique visitors and 400K+ weekly visits.",
            "Designed multi-agent orchestration architectures using Google ADK (production) and LangChain/LangGraph that coordinate specialized agents for automated interactions, tool execution, and complex workflows.",
            "Engineered AI infrastructure and productionized generative AI capabilities, ensuring robust data pipelines, low-latency execution, and seamless integration with existing core APIs.",
            "Built RAG systems and semantic similarity search using FAISS, vector indexing, and embedding strategies for enterprise-scale context engineering and fast document retrieval.",
            "Owned full service lifecycle from design to deployment; platform drove $8.1M+ weekly revenue participation across 20,000+ orders while maintaining strict system reliability and accountability."
        ]
    },
    {
        company: "Lowe's Companies Inc",
        role: "Software Engineer",
        location: "Charlotte, NC",
        period: "03/2023 - 05/2024",
        description: [
            "Engineered data pipelines with Apache Airflow, PySpark, and GCP Dataproc to process and transform daily chatbot data from MongoDB into actionable insights, facilitating advanced data analysis and decision-making.",
            "Created and maintained comprehensive data analytics dashboards in Apache Superset, producing over 200 visualizations to monitor user behavior, optimize bot flows, and support strategic adjustments.",
            "Built an NLU service with fine-tuned BERT on FastAPI to automate operational workflows, improving intent prediction accuracy by 20%.",
            "Developed an AI-powered Transcript Analyzer using BERTopic and OpenAI, extracting actionable insights from large datasets and reducing duplicate topic generation by 40%.",
            "Implemented production ETL pipelines using PySpark and Apache Airflow to process large-scale conversation datasets and support AI-driven operational workflows."
        ]
    },
    {
        company: "Walmart Global Tech",
        role: "Software Engineer III Intern",
        location: "Bentonville, AR",
        period: "06/2022 - 08/2022",
        description: [
            "Detected anomalies in DB insert patterns using SQL-driven statistical models, reducing incident tickets by 25%.",
            "Automated validation scripts for misconfigured DB properties, cutting manual resolution efforts by 30%.",
            "Optimized ingestion pipelines, achieving 18% latency reduction in batch jobs."
        ]
    },
    {
        company: "Tata Consultancy Services",
        role: "Software Engineer",
        location: "Hyderabad, India",
        period: "05/2019 - 07/2021",
        description: [
            "Built and scaled backend APIs in Java Spring Boot processing millions of healthcare claims daily with transaction integrity.",
            "Developed Spark pipelines in Databricks powering real-time dashboards for 300+ agents.",
            "Migrated PL/SQL → T-SQL on Azure SQL for mission-critical workloads, reducing query latency by 40%."
        ]
    }
];

// Projects ordered: Strong → Weak
export const projects = [
    {
        title: "IWREN - Improved Wild Relation Network",
        tech: ["Python", "PyTorch", "Deep Learning"],
        date: "03/2022",
        link: "https://github.com/shanmukhaditya/IWREN",
        description: "Enhanced abstract visual reasoning model with architecture updates and dataset augmentation, achieving 43% accuracy improvement over baseline."
    },
    {
        title: "TCP Load Balancer & Web Server",
        tech: ["C++", "C", "Linux", "Networking", "Bash"],
        date: "05/2023",
        link: "https://github.com/shanmukhaditya/load-balancer",
        description: "Built TCP load balancer in C++ that proxies client requests to multiple C-based web servers, with bash utilities for cluster orchestration."
    },
    {
        title: "Reinforcement Learning - Car Racing",
        tech: ["Python", "Reinforcement Learning", "OpenAI Gym"],
        date: "05/2021",
        link: "https://github.com/shanmukhaditya/Car-Racing-with-RL",
        description: "Trained RL agents for cart-pole balancing and 2D car racing environments with checkpoint evaluation and policy iteration."
    },
    {
        title: "Intelligent Chatbot",
        tech: ["Python", "TensorFlow", "NMT", "Discord"],
        date: "12/2020",
        link: "https://github.com/shanmukhaditya/intelligent-chatbot",
        description: "Neural Machine Translation model trained on Reddit chat data with toxicity-filtering score system."
    },
    {
        title: "Stock Reports Backend",
        tech: ["Python", "Django", "SQLite"],
        date: "05/2023",
        link: "https://github.com/shanmukhaditya/stockreports-backend",
        description: "Django backend for stock transaction tracking with models, views, and SQLite persistence."
    },
    {
        title: "Dog Breed Image Explorer",
        tech: ["Node.js", "Koa", "JavaScript", "EJS"],
        date: "12/2022",
        link: "https://github.com/shanmukhaditya/dogs",
        description: "Web app using dog.ceo API for random dog images and breed-specific galleries with Koa backend."
    },
    {
        title: "Bank-ATM Simulator",
        tech: ["C#", "ASP.NET MVC", "HTML", "CSS"],
        date: "02/2022",
        link: "https://github.com/shanmukhaditya/Bank-ATM",
        description: "Web-based ATM simulation with MVC architecture for balance viewing and account operations."
    },
    {
        title: "MNIST Handwritten Digit Classifiers",
        tech: ["Python", "NumPy", "Deep Learning"],
        date: "01/2022",
        link: "https://github.com/shanmukhaditya/MNIST",
        description: "Implemented three neural networks including a from-scratch implementation without frameworks to compare training pipelines and performance."
    }
];

export const education = [
    {
        school: "Rutgers University - New Brunswick",
        degree: "Master of Science in Computer Science",
        gpa: "3.88/4.0",
        period: "09/2021 - 05/2023"
    },
    {
        school: "VNR Vignana Jyothi Institute of Engineering and Technology",
        degree: "Bachelor of Technology, Mechanical Engineering",
        gpa: "8.32/10",
        period: "08/2015 - 05/2019"
    }
];

export const skills = {
    languages: ["Python", "Java", "Swift", "SQL", "C/C++", "Go (basic)"],
    backend: ["FastAPI", "Flask", "Spring Boot", "SQLAlchemy (async)", "REST APIs", "Microservices", "Redis", "Kafka"],
    aiml: ["LLMs", "Agentic AI", "Multi-Agent Systems", "RAG", "Context Engineering", "Google ADK", "LangChain", "LangGraph", "OpenAI", "Gemini", "FAISS", "Semantic Search", "BERT"],
    data: ["PySpark", "Apache Airflow", "MongoDB", "PostgreSQL", "GCP (Dataproc, Vertex AI)", "Databricks", "Trino"],
    devops: ["Docker", "Kubernetes", "Prometheus", "Grafana", "CI/CD", "Nginx", "Google Cloud", "Oracle Cloud"],
    frontend: ["SwiftUI", "HTMX", "React", "Tailwind CSS", "Jinja2 Templates"]
};
