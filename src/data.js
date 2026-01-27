export const profile = {
    name: "Shanmukh Yenikapati",
    role: "Software Engineer",
    location: "Charlotte, NC",
    email: "shanmukhaditya9@gmail.com",
    phone: "+1 551 6896998",
    linkedin: "https://linkedin.com/in/shanmukh-y",
    github: "https://github.com/shanmukhaditya",
    leetcode: "https://leetcode.com/u/shanmukhaditya9/",
    resumeUrl: "/Shanmukh-Yenikapati.pdf",
    summary: "Software Engineer with 5 years of experience building production-scale APIs, agentic AI systems, and full-stack applications. Expert in Python/FastAPI backends, LLM integration (RAG, multi-agent systems, fine-tuning), and rapid prototyping from 0→1. Built production systems handling 200k+ requests/day."
};

// Featured Project - Squadfire
export const featuredProject = {
    title: "Squadfire",
    tagline: "Join the squad, Rise together",
    description: "Collaborative task management platform with gamification, automated scheduling, and real-time leaderboards. Features async Python backend, HTMX-powered UI, and multi-strategy task distribution.",
    tech: ["Python", "FastAPI", "PostgreSQL", "HTMX", "Tailwind CSS", "Docker"],
    liveUrl: "https://squadfire.shanmukh.dev",
    githubUrl: "https://github.com/shanmukhaditya/squadfire",
    metrics: [
        { label: "Async Coverage", value: "100%" },
        { label: "Bulk import task modes", value: "tab/csv" },
        { label: "Threaded Comment Depth", value: "∞" },
        { label: "Schemas", value: "20+" }
    ],
    highlights: [
        "Fully async Python backend with PostgreSQL AsyncSession",
        "Task scheduling engine (daily/interval/weekly/rotating cycles)",
        "Task Pools with 4 distribution strategies for backlog management",
        "Analytics middleware with GeoIP enrichment & GDPR compliance",
        "Email notifications with dynamic leaderboard image generation"
    ]
};

export const experience = [
    {
        company: "Lowe's Companies Inc",
        role: "Software Engineer",
        location: "Charlotte, NC",
        period: "05/2024 - Present",
        description: [
            "Architected and deployed multi-agent, multi-modal chatbot system using OpenAI GPT, A2A + MCP protocols, and RAG—boosting containment rate from 50% → 70%.",
            "Designed distributed backend services across 10+ microservices handling 200k+ requests/day, achieving 30% latency reduction through Redis caching.",
            "Built NLU service with fine-tuned BERT on FastAPI, improving intent prediction accuracy by 20%.",
            "Engineered Transcript Analyzer using BERTopic, OpenAI, and Faiss vector indexing—reducing duplicate topic generation by 40%.",
            "Owned full service lifecycle: design → deployment → observability (Prometheus + Grafana)."
        ]
    },
    {
        company: "Lowe's Companies Inc",
        role: "Associate Software Engineer",
        location: "Charlotte, NC",
        period: "03/2023 - 05/2024",
        description: [
            "Engineered data pipelines with Apache Airflow, PySpark, and GCP Dataproc to process daily chatbot data from MongoDB.",
            "Created 200+ visualizations in Apache Superset dashboards for user behavior analytics.",
            "Increased test coverage for AI, NLU, Transcript Analyzer APIs from 65% to 90%."
        ]
    },
    {
        company: "Walmart Global Tech",
        role: "Software Engineer III Intern",
        location: "Bentonville, AR",
        period: "06/2022 - 08/2022",
        description: [
            "Detected anomalies in DB insert patterns using SQL-driven statistical models, reducing incident tickets by 25%.",
            "Automated validation scripts for misconfigured DB properties, cutting manual resolution by 30%.",
            "Optimized ingestion pipelines, achieving 18% latency reduction in batch jobs."
        ]
    },
    {
        company: "Tata Consultancy Services",
        role: "Software Engineer",
        location: "Hyderabad, India",
        period: "05/2019 - 07/2021",
        description: [
            "Built and scaled backend APIs in Java Spring Boot processing millions of healthcare claims daily.",
            "Developed Spark pipelines in Databricks powering dashboards for 300+ agents.",
            "Migrated PL/SQL → T-SQL on Azure SQL, reducing query latency by 40%."
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
    languages: ["Python", "C/C++", "Java", "SQL", "Go (basic)"],
    backend: ["FastAPI", "Flask", "Spring Boot", "SQLAlchemy (async)", "REST APIs", "Microservices", "Redis", "Kafka"],
    aiml: ["OpenAI", "LangChain", "LlamaIndex", "RAG", "Vector DBs (Faiss)", "Fine-tuning (BERT)", "BERTopic", "PyTorch", "TensorFlow"],
    data: ["PySpark", "Apache Airflow", "MongoDB", "PostgreSQL", "GCP (Dataproc, Vertex AI)", "Databricks"],
    devops: ["Docker", "Kubernetes", "Prometheus", "Grafana", "CI/CD", "Nginx", "Google Cloud", "Oracle Cloud"],
    frontend: ["HTMX", "React", "Tailwind CSS", "Jinja2 Templates"]
};
